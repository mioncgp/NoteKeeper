import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <p>this will detect faces</p>
      <input type="text" onChange={onInputChange} />
      <button onClick={onButtonChange}>Detect</button>
    </div>
  );
};

export default ImageLinkForm;
