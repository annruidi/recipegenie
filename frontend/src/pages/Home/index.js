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
// import Button from "@mui/material/Button";
import { useState } from "react";
import Icon from "@mui/material/Icon";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MKButton from "components/MKButton";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutIcon from "@mui/icons-material/Logout";
import RamenDiningIcon from "@mui/icons-material/RamenDining";

// Home page sections
import DesignBlocks from "pages/Home/components/DesignBlocks";

// Routes
// import routes from "routes";
// Images
import bgImage from "assets/images/food-bg9.jpg";

// import { toDataUrl } from "../../utils.js";
import { transform } from "api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const date = new Date().getFullYear();

function Home() {
  // const title =" "
  const handleClick = (event) => {
    const { country } = event.currentTarget.dataset;
    setRegion(country);
    setDropdown(null);
  };

  const closeDropdown = () => setDropdown(null);
  const [dropdown, setDropdown] = useState(null);
  const [region, setRegion] = useState("Select Region");
  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState("");
  const { logOut } = useAuth();
  const [recipData, setRecipeData] = useState(null);
  const navigate = useNavigate();

  const handleCapture = (event) => {
    setOpen(true);
    var file = event.target.files[0];
    let reader = new FileReader();
    const finalRegion = region === "Select Region" ? "usa" : region;
    reader.onloadend = function () {
      const data = {
        image: reader.result,
        region: finalRegion,
      };
      transform(data)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setRecipeData(data);
          console.log(data);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function handleLogout(e) {
    e.preventDefault();
    try {
      setError("");
      setOpen(true);
      await logOut();
      navigate("/signin");
    } catch (err) {
      setError("Failed to sign in.");
    }
    setOpen(false);
  }

  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
  };

  const dropdownIconStyles = {
    transform: dropdown ? "rotate(180deg)" : "rotate(0)",
    ...iconStyles,
  };

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
          <MKBox display="flex" justifyContent="space-between" alignItems="center">
            <MKBox lineHeight={1} py={0.75} pl={{ xs: 0, lg: 1 }}>
              <Grid item xs={12} lg={6} textAlign="center">
                <MKButton variant="gradient" color="info" onClick={openDropdown}>
                  <MKTypography
                    variant="body2"
                    lineHeight={1}
                    px={0.25}
                    color="white"
                    sx={{ alignSelf: "center", "& *": { verticalAlign: "baseline" } }}
                  >
                    <LocationOnIcon />
                  </MKTypography>
                  {region} <Icon sx={dropdownIconStyles}>expand_more</Icon>
                </MKButton>
                <Menu anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}>
                  <MenuItem data-country={"usa"} onClick={handleClick}>
                    USA
                  </MenuItem>
                  <MenuItem data-country={"india"} onClick={handleClick}>
                    India
                  </MenuItem>
                </Menu>
              </Grid>
            </MKBox>
            <MKBox display="flex">
              <label htmlFor="icon-button-photo">
                <MKButton variant="outlined" color="info" component="span">
                  <FileUploadOutlinedIcon /> &nbsp;Upload Image
                  <input
                    accept="image/*"
                    id="icon-button-photo"
                    onChange={handleCapture}
                    type="file"
                    hidden
                  />
                </MKButton>
              </label>
            </MKBox>
            <MKBox display="flex">
              <MKButton variant="text" color="info">
                <MKTypography
                  component={Link}
                  to="/saved-recipes"
                  variant="overline"
                  color="info"
                  fontWeight="medium"
                >
                  <RamenDiningIcon /> &nbsp;SAVED RECIPES
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
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container sx={{ display: "flex", justifyContent: "end" }}>
          <Grid
            container
            item
            xs={12}
            lg={7}
            justifyContent="end"
            flexDirection="column"
            textAlign="right"
          >
            <MKTypography
              variant="h1"
              color="white"
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              RECIPE GENIE{" "}
            </MKTypography>
            <MKTypography variant="body1" color="white" textAlign="right" mt={1}>
              Learn to cook your favorite food from just pictures.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
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
        <DesignBlocks data={recipData} />
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

export default Home;
