import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import ReactStars from "react-stars";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <div className="bg-light my-3 rounded-3">
      <div className="row ">
        <div className="col-4 py-3 px-4">
          <Image
            imageUrl={product.images[0].url}
            classes="card-img-top card-img-top-1"
            alternate={
              product.manufacturer + " " + product.model + " " + product.year
            }
          />
        </div>
        <div className="col-8 p-1">
          <div className="card-body">
            <h5 className="card-title fs-3">
              {product.manufacturer + " " + product.model + " " + product.year}
            </h5>
            <div>
              <ReactStars {...options} /> <span>{product.numOfReviews}</span>
            </div>
            <p className="card-text">{product.description}</p>
            <p className="card-text fw-bold text-danger">{`From ₤ ${product.engines[0].price}`}</p>
            <Link to={"/product/" + product._id} className="btn btn-primary">
              Buy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
