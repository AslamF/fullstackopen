import React from "react";

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

export default SuccessMessage;
