// import axios from "axios";

const baseUrl = process.env.REACT_APP_API

function transform(data) {
  // return axios.post(baseUrl, data);
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export { transform };
