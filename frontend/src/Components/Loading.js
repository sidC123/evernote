import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      style={{ marginLeft: "-30px", marginRight: "10px" }}
    />
  );
};

export default Loading;
