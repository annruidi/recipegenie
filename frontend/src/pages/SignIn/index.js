/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Images
import bgImage from "assets/images/food-bg4.jpg";

function SignInBasic() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [passwError, setPasswError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      setError("");
      setOpen(true);
      await signIn(email, passw);
      navigate("/home");
    } catch (err) {
      setError("Failed to sign in.");
    }
    setOpen(false);
  }

  function validateEmail(evt) {
    setEmailError(false);
    setError("");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmail(evt.target.value);
    setEmailError(!emailRegex.test(evt.target.value));
    if (emailError) {
      setError("Invalid email format.");
    }
  }

  function validatePassword(evt) {
    setError("");
    setPassw(evt.target.value);
    setPasswError(passw.trim() === "");
    if (passwError) {
      setError("Please enter password");
    }
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
                  Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      error={emailError}
                      value={email}
                      onChange={validateEmail}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      error={passwError}
                      value={passw}
                      onChange={validatePassword}
                      fullWidth
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
                      disabled={open}
                      onClick={handleSignIn}
                      fullWidth
                    >
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/signup"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign Up
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

export default SignInBasic;
