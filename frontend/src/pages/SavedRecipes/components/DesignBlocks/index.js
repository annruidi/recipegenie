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

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Home page components
import RecipeCard from "pages/Home/components/RecipeCard";
import image from "assets/images/food-bg1.jpg";

function DesignBlocks() {
  // replace with props
  const isData = false;
  return (
    <MKBox component="section" my={6} py={6}>
      {isData ? (
        <Container sx={{ mt: 0 }}>
          <Grid container spacing={3} sx={{ mb: 10 }}>
            <Grid item xs={12} md={4} lg={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={9} sx={{ mb: 2 }}>
                  <RecipeCard image={image} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
                <MKTypography variant="h3" fontWeight="bold" mb={1}>
                  Recipe Title
                </MKTypography>
                <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
                  Recipe Description
                </MKTypography>
              </MKBox>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={6}
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
          >
            <MKTypography variant="h3" fontWeight="bold">
              Welcome to Recipe Genie
            </MKTypography>
            <MKTypography variant="body1" color="text">
              Recipes you save will appear here.
            </MKTypography>
          </Grid>
        </Container>
      )}
    </MKBox>
  );
}

export default DesignBlocks;
