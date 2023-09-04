import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../js/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "react-router";
import { clearErrors, createOrder } from "../actions/orderAction";
import FootFet from "./footFet";
import ModalTop from "./ModalTop";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
  return (
    <>
      <ModalTop />
      <MetaData title={"Payment"} />
      <div className="bg-dark">
        <div className="container py-5">
          <Header oncheckout />
          <div style={{ minHeight: "80vh" }}>
            <div className="card my-3">
              <Typography className="fw-vold card-header fs-2 text-center">
                Card Info
              </Typography>
              <form
                className="card-body"
                style={{ marginLeft: "20%", marginRight: "20%" }}
                onSubmit={(e) => submitHandler(e)}
              >
                <CreditCardIcon className="fs-1" />
                <label className="fw-bold">Card Number</label>
                <div className="form-control ">
                  <CardNumberElement />
                </div>
                <EventIcon className="fs-1" />
                <label className="fw-bold">Card Expiry Date</label>

                <div>
                  <CardExpiryElement className="form-control " />
                </div>
                <VpnKeyIcon className="fs-1" />
                <label className="fw-bold">Card CVV</label>
                <div>
                  <CardCvcElement className="form-control " />
                </div>

                <input
                  type="submit"
                  value={`Pay - £ ${orderInfo && orderInfo.totalPrice}`}
                  ref={payBtn}
                  className="btn btn-outline-success mt-3 ms-3"
                />
              </form>
            </div>
          </div>
          <FootFet white={true} />
        </div>
      </div>
    </>
  );
};

export default Payment;
