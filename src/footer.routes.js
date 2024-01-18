// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/typo.png";

const date = new Date().getFullYear();

export default {
  brand: {
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/nucleus creative studio/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/nucleusdevs",
    },
    {
      icon: <GitHubIcon />,
      link: "https://github.com/nucleus creative studio",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/channel/nucleusdevs",
    },
  ],
  menus: [
    {
      name: "Services",
      items: [{ name: "Code Guard" }, { name: "Web design" }, { name: "PPC" }, { name: "SEO" }],
    },
    {
      name: "Domains",
      items: [{ name: "Register a domain" }, { name: "Manage Domains" }],
    },
    {
      name: "Hosting",
      items: [{ name: "Web hosting" }, { name: "Cloud hosting" }],
    },
    {
      name: "Support",
      items: [{ name: "(+266) 59749725" }, { name: "nucleusdevs@gmail.com" }],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Nucleusdevs{" "}
    </MKTypography>
  ),
};
