import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="dot-spinner">
        <div className="dot-spinner__dot before:bg-primary"></div>
        <div className="dot-spinner__dot before:bg-primary"></div>
        <div className="dot-spinner__dot before:bg-primary"></div>
        <div className="dot-spinner__dot before:bg-primary"></div>
        <div className="dot-spinner__dot before:bg-primary"></div>
        <div className="dot-spinner__dot before:bg-primary"></div>
        <div className="dot-spinner__dot before:bg-primary"></div>
        <div className="dot-spinner__dot before:bg-primary"></div>
      </div>
    </div>
  );
};

export default loading;
