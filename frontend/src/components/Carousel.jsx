import React, { useEffect } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productAction";

const Carousel = ({ images }) => {
  var images_1 = images
    ? images.map((e, i) => {
        return e.url;
      })
    : [
        "../assets/img/Cars/CamaroConvertible/1-72-1024x683.jpg",
        "../assets/img/Cars/CamaroConvertible/2-73-1024x683.jpg",
        "../assets/img/Cars/CamaroConvertible/3-73-1024x683.jpg",
        "../assets/img/Cars/CamaroConvertible/4-73-1024x683.jpg",
        "../assets/img/Cars/CamaroConvertible/5-73-1024x683.jpg",
      ];
  return (
    <div
      id="imageCarousel"
      className="carousel slide bg-dark-subtle"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner ">
        {images_1.map((e, i) => {
          return (
            <div
              className={"carousel-item " + (i === 0 ? "active" : "")}
              key={i}
            >
              <Image
                classes={"d-block w-100 "}
                imageUrl={e}
                alternate={e}
                key={i}
              />
            </div>
          );
        })}
      </div>

      <Link
        className="carousel-control-prev"
        to="#imageCarousel"
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </Link>
      <Link
        className="carousel-control-next"
        to="#imageCarousel"
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </Link>

      <div className="carousel-gallery my-3 ">
        {images_1.map((e, i) => {
          return (
            <button
              className="gallery-item btn p-0 mb-2"
              data-bs-target="#imageCarousel"
              data-bs-slide-to={i + ""}
              // class="active"
              aria-current="true"
              aria-label="Slide 1"
              key={i}
            >
              <Image classes={"w-100"} imageUrl={e} key={i} alternate={e} />
            </button>
          );
        })}
      </div>

      {/* <Link
        className="gallery-control-prev"
        to="#imageCarousel"
        role="button"
        data-bs-slide="prev"
      >
        <span className="bi bi-chevron-left"></span>
      </Link>
      <Link
        className="gallery-control-next"
        to="#imageCarousel"
        role="button"
        data-bs-slide="next"
      >
        <span className="bi bi-chevron-right"></span>
      </Link> */}
    </div>
  );
};

export default Carousel;
