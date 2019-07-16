import React, { Fragment } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import Alert from "./alert";

function Content(props) {
  return (
    <Fragment>
      <NavBar />
      <Alert />
      

      
      {props.children}


      <Footer />
    </Fragment>
  );
}

export default Content;
