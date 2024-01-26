/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useState } from "react";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import LogoutIcon from "@mui/icons-material/Logout";
import HouseIcon from "@mui/icons-material/House";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Home page sections
import DesignBlocks from "pages/SavedRecipes/components/DesignBlocks";

// Routes
// import routes from "routes";
// Images
import bgImage from "assets/images/food-bg6.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const date = new Date().getFullYear();

function SavedRecipes() {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { logOut } = useAuth();
  // const { recipes, setRecipes } = useState(null);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      setError("");
      setOpen(true);
      await logOut();
      navigate("/signin");
    } catch (err) {
      setError("Some error occured");
    }
    setOpen(false);
  }

  return (
    <>
      <Collapse in={alertOpen} sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 11 }}>
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      </Collapse>
      <Container sx={{ position: "sticky", top: 0, zIndex: 10 }}>
        <MKBox
          py={1}
          px={{ xs: 4, sm: 3, lg: 2 }}
          my={2}
          mx={3}
          width={"calc(100% - 48px)"}
          borderRadius="xl"
          shadow={"md"}
          color={"dark"}
          position={"absolute"}
          left={0}
          zIndex={3}
          sx={({ palette: { white }, functions: { rgba } }) => ({
            backgroundColor: rgba(white.main, 0.8),
            backdropFilter: `saturate(200%) blur(30px)`,
          })}
        >
          <MKBox display="flex" justifyContent="end" alignItems="center">
            <MKBox display="flex">
              <MKButton variant="text" color="info">
                <MKTypography
                  component={Link}
                  to="/home"
                  variant="overline"
                  color="info"
                  fontWeight="medium"
                >
                  <HouseIcon sx={{ verticalAlign: "text-bottom" }} /> &nbsp;HOME
                </MKTypography>
              </MKButton>
            </MKBox>
            <MKBox display="flex">
              <MKButton variant="text" color="info" onClick={handleLogout}>
                <MKTypography
                  component={Link}
                  to="/signup"
                  variant="overline"
                  color="info"
                  fontWeight="medium"
                >
                  <LogoutIcon /> &nbsp;LOGOUT
                </MKTypography>
              </MKButton>
            </MKBox>
          </MKBox>
        </MKBox>
      </Container>
      <MKBox
        minHeight="45vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          display: "grid",
          placeItems: "center",
          transform: "rotate(180deg)",
        }}
      ></MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <DesignBlocks data={null} />
      </Card>
      <MKBox component="footer">
        <Container>
          <Grid item xs={12} sx={{ textAlign: "center", my: 3 }}>
            <MKTypography variant="button" fontWeight="regular">
              All rights reserved. Copyright &copy; {date} Recipe Genie.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default SavedRecipes;
