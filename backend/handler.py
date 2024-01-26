try:
    import unzip_requirements
except ImportError:
    pass

import torch
from io import BytesIO
import boto3
import json
from PIL import Image
import base64
import pickle


from app.model import get_model
from app.args import get_parser
from torchvision import transforms
from app.utils.output_utils import prepare_output


def load_model(s3, bucket):
    regions = ["usa", "india"]
    models = {}
    
    for region in regions:

        pretrainedModel = s3.get_object(Bucket=bucket, Key=f"model{region}.ckpt")
        ingrs_response = s3.get_object(Bucket=bucket, Key=f"ingr_vocab_{region}.pkl")
        vocab_response = s3.get_object(Bucket=bucket, Key=f"instr_vocab_{region}.pkl")

        ingrs_vocab_str = ingrs_response["Body"].read()
        vocab_obj_str = vocab_response["Body"].read()

        ingrs_vocab = pickle.loads(ingrs_vocab_str)
        vocab = pickle.loads(vocab_obj_str)

        ingr_vocab_size = len(ingrs_vocab)
        instrs_vocab_size = len(vocab)

        args = get_parser()
        args.maxseqlen = 15
        args.ingrs_only = False

        model = get_model(args, ingr_vocab_size, instrs_vocab_size)
        models[region] = {
            "model": model,
            "ingrs_vocab": ingrs_vocab,
            "vocab": vocab
        }
        state = torch.load(
            BytesIO(pretrainedModel["Body"].read()), map_location=torch.device('cpu'))
        model.load_state_dict(state)
        model.eval()
       
    print('loaded models')

    return models


s3 = boto3.client("s3")
bucket = "recipemodels"
models = load_model(s3, bucket)


def lambda_handler(event, context):

    if event.get("source") in ["aws.events", "serverless-plugin-warmup"]:
        print("Lambda is warm!")
        return {}

    if "body" in event and event["body"] != None and event["body"] != '':

      
        data = json.loads(str(event["body"]))
        image = data["image"]
        region = data["region"]

        model = models[region]['model']
        ingrs_vocab = models[region]['ingrs_vocab']
        vocab = models[region]['vocab']
        
        image = image[image.find(",") + 1:]
        dec = base64.b64decode(image)
        image = Image.open(BytesIO(dec))
        image = image.convert("RGB")


        transf_list_batch = []
        transf_list_batch.append(transforms.ToTensor())
        transf_list_batch.append(transforms.Normalize((0.485, 0.456, 0.406), 
                                                (0.229, 0.224, 0.225)))
        to_input_transf = transforms.Compose(transf_list_batch)

        transf_list = []
        transf_list.append(transforms.Resize(256))
        transf_list.append(transforms.CenterCrop(224))
        transform = transforms.Compose(transf_list)
        
        image_transf = transform(image)
        image_tensor = to_input_transf(image_transf).unsqueeze(0)
        
        greedy = [True, False, False, False]
        beam = [-1, -1, -1, -1]
        temperature = 1.0
        numgens = len(greedy)



        for i in range(numgens):
            with torch.no_grad():
                outputs = model.sample(image_tensor, greedy=greedy[i], 
                                    temperature=temperature, beam=beam[i], true_ingrs=None)
                
            ingr_ids = outputs['ingr_ids'].cpu().numpy()
            recipe_ids = outputs['recipe_ids'].cpu().numpy()
                
            outs, valid = prepare_output(recipe_ids[0], ingr_ids[0], ingrs_vocab, vocab)
            
            if valid['is_valid']:
                result = {"output": {
                    "title": outs['title'],
                    "ingredients": outs['ingrs'],
                    "recipe":outs['recipe']
                } } 
                
        
            else:

                result = {"output": {
                    "msg":"Not a valid recipe!",
                    "reason": valid['reason']

                }}
    else:
        result = {"output": {
                    "msg":"Not a valid recipe!",
                    "reason": "no image, just test"

        }}
          
              
    return {
            "statusCode": 200,
            "body": json.dumps(result),
            "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
            }
    }
