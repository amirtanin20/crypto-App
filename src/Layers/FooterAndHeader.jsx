import React from "react";
import Banner from "../Component/Banner.jsx";
import Footer from "../Component/Footer.jsx";
function FooterAndHeader({ children }) {
  return (
    <>
      <header>
        <Banner />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default FooterAndHeader;
