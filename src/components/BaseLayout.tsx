import React, { PropsWithChildren } from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

const footerData = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppNavbar links={[{ label: "Home", link: "/" }]} />
      <main>{children}</main>
      <Footer data={footerData} />
    </>
  );
};

export default BaseLayout;
