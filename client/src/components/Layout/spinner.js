import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="loaderDiv">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube" />
        <div className="sk-cube2 sk-cube" />
        <div className="sk-cube4 sk-cube" />
        <div className="sk-cube3 sk-cube" />
      </div>
      <h1 className="text-center">Loading</h1>
    </div>
  );
};

export default Spinner;
