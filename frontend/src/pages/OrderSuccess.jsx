import React from "react";
import MetaData from "../js/MetaData";
import Header from "../components/header";
import FootFet from "../components/footFet";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ModalTop from "../components/ModalTop";

const OrderSuccess = () => {
  return (
    <>
      <ModalTop />
      <MetaData title={"Order Success"} />
      <div className="bg-dark container-fluid pt-5">
        <Header />
        <div
          className=" mt-3 container py-5 blur-dark rounded"
          style={{ minHeight: "80vh" }}
        >
          <div className="orderSuccess mt-5">
            <CheckCircleIcon />

            <Typography className="text-light fw-bold fs-1">
              Your Order has been Placed successfully
            </Typography>
            <Link className="btn btn-outline-danger " to="/account">
              View Orders
            </Link>
          </div>
        </div>
        <FootFet white={true} />
      </div>
    </>
  );
};

export default OrderSuccess;
