import React, { useEffect, useState } from "react";
import Paragraph from "./Paragraph";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../actions/cartAction";
import { useParams } from "react-router";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../constants/productConstant";
import { clearErrors, newReview } from "../actions/productAction";

const ProductDescription = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const handleSelect = (e) => {
    setSelectedIndex(e.target.value);
  };
  var product_1 = [
    {
      title: "Description",
      desc: product.description,
    },
    {
      title: "Brand",
      desc: product.manufacturer,
    },
    {
      title: "Model",
      desc: product.model,
    },
    {
      title: "Year",
      desc: product.year,
    },
    {
      title: "From ",
      desc: product.category,
    },
  ];
  var engineItems = product.engines
    ? product.engines.map((e, i) => {
        return e.size + "L " + e.typeOfEngine;
      })
    : "";
  const addToCartHandle = () => {
    dispatch(addItemsToCart(id, 1, selectedIndex));
    alert.success("Items Added to Cart");
  };
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };
  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
      if (success) {
        alert.success("Submitted!");
        dispatch({ type: NEW_REVIEW_RESET });
      }
    }
  }, [alert,success,reviewError,dispatch]);
  return (
    <div className="card blur p-4" style={{ minheight: "80vh" }}>
      {product_1.map((e, i) => {
        return (
          <Paragraph
            key={i}
            mainCss={"card-text mb-2"}
            titleCss={"fw-bold text-success fs-4"}
            descCss={"text-secondary fs-5"}
            title={e.title + ":"}
            desc={e.desc}
          />
        );
      })}
      <div className="col-md-12 my-2">
        <h3>Engines</h3>
        {engineItems
          ? engineItems.map((element, i) => {
              return (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioGroup3"
                    id="radio5"
                    value={i}
                    onChange={handleSelect}
                  />
                  <label className="form-check-label" htmlFor="radio5">
                    {element}
                  </label>
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <ReactStars {...options} />{" "}
        <span>
          Rated {product.ratings}/5 from {product.numOfReviews} reviews
        </span>
      </div>
      <div className="mt-3">
        <h5>
          Status :{" "}
          {product.Stock !== 0 ? (
            <span className="text-success fw-bold">In Stock</span>
          ) : (
            <span className="text-secondary text-decoration-line-through">
              Out of Stock
            </span>
          )}{" "}
        </h5>
      </div>
      <h4 className="card-title mt-4">
        Price:{" "}
        <span className="text-danger fw-bold">
          $ {product.engines ? product.engines[selectedIndex].price : ""}
        </span>
      </h4>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button
            className={"btn btn-outline-warning mt-3"}
            value={"Add to cart"}
            onClick={addToCartHandle}
            disabled={product.Stock === 0 ? true : false}
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-auto mx-auto">
          <button
            className={"btn btn-outline-light btn-secondary  mt-3"}
            value={"Add to cart"}
            onClick={(e) => {
              setOpen(!open);
            }}
          >
            Add Rating
          </button>
          <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Submit Rating</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => {
                  setOpen(!open);
                }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
