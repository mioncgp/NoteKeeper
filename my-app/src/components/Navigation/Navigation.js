import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  console.log(isSignedIn);
  if (isSignedIn) {
    return (
      <nav
        style={{ display: "flex", justifyContent: "flex-end", margin: "5rem" }}
      >
        <p onClick={() => onRouteChange("signin")}>Sight Out</p>
      </nav>
    );
  } else {
    return (
      <nav
        style={{ display: "flex", justifyContent: "flex-end", margin: "5rem" }}
      >
        <p onClick={() => onRouteChange("signin")}>Sign In</p>
        <p onClick={() => onRouteChange("register")}>Register</p>
      </nav>
    );
  }
};

export default Navigation;
