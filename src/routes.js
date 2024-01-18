// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import GitHubIcon from "@mui/icons-material/Twitter";
import SignIn from "pages/LandingPages/login";
import { Profile } from "layouts/pages/landing-pages/profile";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "Profile",
            route: "/profile",
            component: <Profile />,
          },
          {
            name: "Jobs Search",
            route: "/pages/landing-pages/author",
            // component: <Author />,
          },
        ],
      },
      {
        name: "account",
        collapse: [
          {
            name: "logout",
            route: "/login",
            component: <SignIn />,
          },
        ],
      },
    ],
  },
];

export default routes;
