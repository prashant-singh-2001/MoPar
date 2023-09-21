import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../js/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import "../../css/processOrder.css";
import Header from "../../components/header";
import FootFet from "../../components/footFet";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <>
      <MetaData title="Process Order" />
      <>
        <div className="container-fluid bg-dark pt-5">
          <Header isAdmin={true} />
          <div className="pt-4 container-fluid row ">
            <div className="col-2">
              <SideBar />
            </div>
            <div className="col-10">
              {loading ? (
                <Loader />
              ) : (
                <div
                  className="row bg-light p-3 rounded-2"
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "block" : "grid",
                  }}
                >
                  <div>
                    <div className="mb-3">
                      <div className="row rounded bg-primary-subtle">
                        <div className="col-12 text-center">
                          <p className="fs-1 "> Shipping Info</p>
                        </div>
                        <div className="col-auto mx-auto">
                          <p className="fs-3">Name:</p>
                          <span className="fs-4">
                            {order.user && order.user.name}
                          </span>
                        </div>
                        <div className="col-auto mx-auto">
                          <p className="fs-3">Phone:</p>
                          <span className="fs-4">
                            {order.shippingInfo && order.shippingInfo.phoneNo}
                          </span>
                        </div>
                        <div className="col-auto mx-auto">
                          <p className="fs-3">Address:</p>
                          <span className="fs-4">
                            {order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                          </span>
                        </div>
                      </div>
                      <hr className="border border-4 "></hr>
                      <div className="row mb-3 bg-success-subtle rounded ">
                        <div className="col-auto mx-auto">
                          <Typography className="fs-1">Payment</Typography>
                          <p
                            className={
                              "fs-3 mt-3 " +
                              (order.paymentInfo &&
                              order.paymentInfo.status === "succeeded"
                                ? "text-success"
                                : "text-danger")
                            }
                          >
                            {order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "PAID"
                              : "NOT PAID"}
                          </p>
                        </div>

                        <div className="col-auto mx-auto">
                          <p className="fs-1">Amount:</p>
                          <span className="fs-3 text-danger">
                            {order.totalPrice && order.totalPrice}
                          </span>
                        </div>
                        <div className="col-auto mx-auto">
                          <Typography className="fs-1">Order Status</Typography>
                          <p
                            className={
                              "fs-3 mt-3 " +
                              (order.orderStatus &&
                              order.orderStatus === "Delivered"
                                ? "text-success"
                                : "text-danger")
                            }
                          >
                            {order.orderStatus && order.orderStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="confirmCartItems">
                      <Typography>Your Cart Items:</Typography>
                      <div className="confirmCartItemsContainer">
                        {console.log(order.orderItems)}
                        {order.orderItems &&
                          order.orderItems.map((item) => (
                            <div key={item.product} className="m-2">
                              <img
                                src={"../" + item.image}
                                className="img-fluid w-25 rounded"
                                alt="Product"
                              />
                              <Link
                                className="alert"
                                to={`/product/${item.product}`}
                              >
                                {item.manufacturer + " " + item.model}
                              </Link>{" "}
                              <span>
                                <b>₹{item.price * item.quantity}</b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div
                    style={{
                      display:
                        order.orderStatus === "Delivered" ? "none" : "block",
                    }}
                  >
                    <form
                      className="updateOrderForm"
                      onSubmit={updateOrderSubmitHandler}
                    >
                      <h1>Process Order</h1>

                      <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Choose Category</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>

                      <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                      >
                        Process
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
          <FootFet />
        </div>
      </>
    </>
  );
};

export default ProcessOrder;
