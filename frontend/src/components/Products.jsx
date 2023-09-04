import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Slider from "@material-ui/core/Slider";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../actions/productAction";
import { Typography } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";

const categories = [
  "Hyper",
  "Luxury",
  "Sports",
  "Super",
  "Track",
  "SUV",
  "Muscle",
];

const Products = () => {
  const { keyword } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([30000, 200000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const { loading, error, product, totalPages } = useSelector(
    (state) => state.products
  );
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);
  return (
    <>
      <div className="row">
        <div className="col-12 mt-3 fs-3">
          Browse through some our latest procurments:
        </div>

        <div className="col-8 p-1">
          {loading ? (
            <Loader />
          ) : product && product.length !== 0 ? (
            product &&
            product.map((product, key) => (
              <div key={key}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div
              className="text-center fs-1 fw-bold text-secondary"
              style={{ minHeight: "80vh" }}
            >
              No Cars Found
            </div>
          )}
        </div>
        <div className="col-1" />
        <div className="col-3 my-3 bg-light-subtle border border-start container">
          <div className=" fs-4">Filters</div>
          <div className="row m-2">
            <Typography className="fs-3">Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={50000}
              max={200000}
            />
            <hr className="m-2 border border-2" />
            <Typography className="fs-3">Categories</Typography>
            <ul className="category-box">
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
            <hr className="m-2 border border-2" />
            <fieldset>
              <Typography className="fs-3">Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRatings) => {
                  setRatings(newRatings);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
        </div>
        <div className="col-12 ">
          <div className="Page navigation">
            <Pagination
              className="m-3"
              onChange={(e, p) => {
                setcurrentPage(p);
              }}
              count={totalPages}
              color="primary"
            ></Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
