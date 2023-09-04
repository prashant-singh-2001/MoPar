import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../js/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../actions/orderAction";
import Loader from "../components/Loader";
import { useAlert } from "react-alert";
import Header from "../components/header";
import FootFet from "../components/footFet";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="bg-dark container-fluid pt-5">
            <Header />
            <div className="container mt-3">
              <div className="row justify-content-center">
                <div className="col-10 mx-4">
                  <Typography className="fs-1 text-primary fw-bold">
                    Order #{order && order._id}
                  </Typography>
                  <div className="container row bg-light-subtle rounded shadow text-dark justify-content-center">
                    <Typography className="col-12 fs-2 text-center fw-bold">
                      Shipping Info
                    </Typography>
                    <div className="col-3 mb-4">
                      <p className="fs-4">Name:</p>
                      <span className="fs-5">
                        {order.user && order.user.name}
                      </span>
                    </div>
                    <div className="col-3 mb-4">
                      <p className="fs-4">Phone:</p>
                      <span className="fs-5">
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="col-6 mb-4">
                      <p className="fs-4">Address:</p>
                      <span className="fs-5">
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <div className="container row bg-warning-subtle rounded shadow text-dark justify-content-center mt-2 mb-3">
                    <div className="col-6 border-2 border-end border-danger">
                      <Typography className="col-12 fs-2 text-center fw-bold">
                        Payment
                      </Typography>
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "text-success fs-3 fw-bold text-center"
                              : "text-danger fs-3 fw-bold text-center"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="fs-4">Amount:</p>
                        <span className="fs-4">
                          {order.totalPrice && order.totalPrice}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <Typography className="col-12 fs-2 text-center fw-bold">
                        Order Status
                      </Typography>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "text-success fs-3 fw-bold text-center"
                            : "text-danger fs-3 fw-bold text-center"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card w-50 blur">
                  <Typography className="card-header fw-bold fs-2">
                    Order Items:
                  </Typography>
                  <div className="card-body">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product} className="my-2">
                          <img
                            src={item.image}
                            alt="Product"
                            className="card-img-top"
                          />
                          <div className="row">
                            <div className="col-7">
                              <Link
                                to={`/product/${item.product}`}
                                className="nav-link text-dark fs-3"
                              >
                                {item.year +
                                  " " +
                                  item.manufacturer +
                                  " " +
                                  item.model}
                              </Link>
                            </div>
                            <div className="col-4 mb-2">
                              <span className="text-danger fs-3">
                                <b>₹{item.price * item.quantity}</b>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <FootFet white={true} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
