import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MetaData from "../js/MetaData";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Header from "../components/header";
import Loader from "../components/Loader";
import FootFet from "../components/footFet";
import ModalTop from "../components/ModalTop";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000000 ? 0 : 20000;

  const tax = Math.ceil(subtotal * 0.18);

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <ModalTop />
      <MetaData title="Confirm Order" />
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-dark">
          <div className="container pt-5">
            <Header />
            <div className="row mt-4">
              <div className="card">
                <Typography className="card-header fs-3 fw-bold">
                  Shipping Info
                </Typography>
                <div className="container row">
                  <div className="col-3 mt-2 border-end border-warning border-3 mb-4 ">
                    <p className="fs-4">Name:</p>
                    <span className="fs-6 ">{user.name}</span>
                  </div>
                  <div className="col-3 mt-2 border-end border-warning border-3 mb-4">
                    <p className="fs-4">Phone:</p>
                    <span className="fs-6">{shippingInfo.phoneNo}</span>
                  </div>
                  <div className="col-6 mt-2 mb-4">
                    <p className="fs-4">Address:</p>
                    <span className="fs-6  ">{address}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 ">
              <div className="card mb-5">
                <Typography className="card-header fs-3 fw-bold">
                  Order Summery
                </Typography>
                <div className="row">
                  <div className="col-4">
                    <p className="fs-4">Subtotal:</p>
                    <span className="fs-6 text-danger">£ {subtotal}</span>
                  </div>
                  <div className="col-4">
                    <p className="fs-4">Shipping Charges:</p>
                    <span className="fs-6 text-danger">
                      £ {shippingCharges}
                    </span>
                  </div>
                  <div className="col-4">
                    <p className="fs-4">GST:</p>
                    <span className="fs-6 text-danger">£ {tax}</span>
                  </div>
                </div>

                <div className="mt-3 text-center mx-auto my-3 bg-dark-subtle rounded p-3">
                  <p className="fs-3 fw-bold ">Total:</p>
                  <span className="fs-4 text-danger fw-bold ">
                    £ {totalPrice}
                  </span>
                </div>

                <button
                  onClick={proceedToPayment}
                  className="btn btn-outline-warning btn-dark w-25 mx-auto mb-2 fs-5"
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
            <FootFet white={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmOrder;
