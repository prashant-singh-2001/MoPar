import React from "react";
import { Link } from "react-router-dom";

const HomeCardProduct = ({ product }, props) => {
  return (
    <div className="card w-40rem">
      <img
        src={product.images ? product.images[0].url : ""}
        className="card-img-top"
        alt={product.manufacturer + " " + product.model}
        height={props.height ? props.height : ""}
      />
      <div className="card-body">
        <h5 className="card-title">
          {product.manufacturer + " " + product.model}
        </h5>
        <p className="card-text">{product.description}</p>
        <Link to={`/product/${product._id}`} className="btn btn-outline-dark">
          Go to Product
        </Link>
      </div>
    </div>
  );
};

export default HomeCardProduct;
