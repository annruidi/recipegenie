import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import bgImage from "assets/images/food-bg11.jpg";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwError, setPasswError] = useState(false);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [passwConfirm, setPasswConfirm] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    if (passw !== passwConfirm) {
      setPasswError(true);
      return setError("Passwords do not match.");
    }
    try {
      setError("");
      setOpen(true);
      await signUp(email, passw);
    } catch (err) {
      console.log(err);
      setError("Failed to create an account.");
    }
    setOpen(false);
    navigate("/signin");
  }

  function handleEmailChange(evt) {
    setError("");
    setEmailError(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmail(evt.target.value);
    setEmailError(!emailRegex.test(evt.target.value));
  }

  function handlePasswChange(evt) {
    setError("");
    setPasswError(false);
    setPassw(evt.target.value);
  }

  function handlePasswConfirmChange(evt) {
    setPasswConfirm(evt.target.value);
  }

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.1),
              rgba(gradients.dark.state, 0.2)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign Up
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      value={email}
                      fullWidth
                      required
                      error={emailError}
                      onChange={handleEmailChange}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      value={passw}
                      fullWidth
                      required
                      onChange={handlePasswChange}
                      error={passwError}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Confirm Password"
                      value={passwConfirm}
                      error={passwError}
                      onChange={handlePasswConfirmChange}
                      fullWidth
                      required
                    />
                  </MKBox>
                  <MKTypography
                    variant="body2"
                    color="error"
                    sx={{ display: error !== "" ? "flex" : "none" }}
                  >
                    {error}
                  </MKTypography>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      disabled={open}
                      onClick={handleSignUp}
                    >
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/signin"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign In
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default SignUp;
