import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "5rem" }}>
      <div>{`${name}, your current rank us # ${entries}`}</div>;
    </div>
  );
};

export default Rank;
