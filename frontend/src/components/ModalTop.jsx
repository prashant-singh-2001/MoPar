import React from "react";
import Sidebar from "./Sidebar";

const ModalTop = (props) => {
  return <div className="">{!props.oncheckout ? <Sidebar /> : ""}</div>;
};

export default ModalTop;
