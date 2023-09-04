import React, { useEffect } from "react";
import MetaData from "../../js/MetaData";
import Header from "../../components/header";
import FootFet from "../../components/footFet";
import Sidebar from "./Sidebar";
import ModalTop from "../../components/ModalTop";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import "../../css/dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading: PL, products } = useSelector((state) => state.products);

  const { loading: OL, orders } = useSelector((state) => state.allOrders);

  const { loading: UL, users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products ? products.length - outOfStock : 0],
      },
    ],
  };
  return (
    <>
      <ModalTop />
      <MetaData title="Admin Dashboard" />
      <div className="bg-dark container-fluid pt-5 ">
        <Header />
        {UL || PL || OL ? (
          <Loader />
        ) : (
          <div className="container   mt-5" style={{ overflowX: "none" }}>
            <div className="row">
              <div className="col-4">
                <Sidebar />
              </div>

              <div className="col-8">
                <div className="card">
                  <Typography className="fs-1 card-header text-center">
                    Dashboard
                  </Typography>

                  <div className="dashboardSummary">
                    <div>
                      <p>
                        Total Amount <br /> ₹{totalAmount}
                      </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                      <Link to="/admin/products">
                        <p>Product</p>
                        <p>{products && products.length}</p>
                      </Link>
                      <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{orders && orders.length}</p>
                      </Link>
                      <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users && users.length}</p>
                      </Link>
                    </div>
                  </div>

                  <div className="lineChart">
                    <Line data={lineState} />
                  </div>

                  <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <FootFet white={true} />
      </div>
    </>
  );
};

export default Dashboard;
