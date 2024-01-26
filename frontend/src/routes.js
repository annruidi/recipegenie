// @mui material components
import Icon from "@mui/material/Icon";

// Pages

import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "pages/SignUp";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [],
      },
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/signin",
            component: <SignIn />,
          },
          {
            name: "sign up",
            route: "/signup",
            component: <SignUp />,
          },
        ],
      },
    ],
  },
];

export default routes;
