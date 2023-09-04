import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

const ImageCollage = (props) => {
  return (
    <div className="row container blur">
      <div className="col-10 big-font-m">Most bought cars :</div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 overflow-hidden">
          <Link to="/">
            <Image
              classes={"card-img-top-1 img-fluid"}
              imageUrl={props.top}
              alternate={"Most sought after Car"}
            />
          </Link>
        </div>

        <div className="col-md-7">
          <div className="row ">
            {props.images.map((ele, index) => {
              return (
                <div className="col-5 p-0 m-1 overflow-hidden">
                  <Link to="/">
                    <Image
                      classes={"card-img-top-1 img-fluid"}
                      imageUrl={ele}
                      alternate={"Most sought after Car"}
                      key={index}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCollage;
