import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const RecommendedCard = (props) => {
  const prod = props.products.map((e, i) => {
    return (
      <div className="card col-2 p-1  border border-5 rounded-2 m-2" key={i}>
        <h5 className="card-title text-dark">{e.name}</h5>
        <div className="card-body p-0 overflow-hidden">
          <Image
            imageUrl={e.img}
            classes="card-img-top card-img-top-1"
            alternate={e}
          />
          <p className="card-text py-2">{e.desc}</p>
          <Link
            to={"/product/" + e.id}
            className="btn btn-outline-success mb-2 rounded-1 "
          >
            Buy
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div className={"row justify-content-center " + props.classes}>
      <div className="col-12 p-2 fw-bold big-font-m">{props.getCategory}</div>
      {prod}
    </div>
  );
};

export default RecommendedCard;
