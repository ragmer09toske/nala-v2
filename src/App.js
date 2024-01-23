import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";

import routes from "routes";
import { Presentation } from "layouts/pages/presentation";
import { ViewPost } from "components/post/ViewPost";
import { Profile } from "layouts/pages/landing-pages/profile";
import RegistrationForm from "components/registration/Registration";
import { Landing } from "pages/LandingPages/landing";
import { User } from "components/registration/user";
import SendEmail from "pages/LandingPages/login/sendEmail";
import MyDropzone from "components/upload/update";
import useIsDesktop from "hooks/Device";
import { HelloWorld } from "components/Desktop";
import { Sebabatso } from "pages/LandingPages/sebabatso";
import { DMs } from "tabs/Activity/DMs";

export default function App() {
  const isDesktop = useIsDesktop()
  const { pathname } = useLocation();
  // Setting page scroll to 0 when changing the route


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

    // Define your routes for desktop and mobile
    const desktopRoutes = [
      // Define your desktop routes here
      { route: "/", component: <HelloWorld /> }

    ];
  
    const mobileRoutes = [
      // Define your mobile routes here
      { route: "/", component: <Presentation /> },
      { route: "/welcome", component: <Landing /> },
      { route: "/smtp", component: <SendEmail /> },
      { route: "*", component: <Presentation /> },
      { route: "/post", component: <ViewPost /> },
      { route: "/register", component: <RegistrationForm /> },
      { route: "/user", component: <User /> },
      { route: "/profile", component: <Profile /> },
      { route: "/dms", component: <DMs /> },
      { route: "/dropZone", component: <MyDropzone /> },
      { route: "/dropZone", component: <MyDropzone /> },
    ];

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        {isDesktop ? getRoutes(desktopRoutes) : getRoutes(mobileRoutes)}
      </Routes>
    </ThemeProvider>
  );
}
