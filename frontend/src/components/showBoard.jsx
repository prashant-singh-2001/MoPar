import React from "react";
import Image from "./Image";

const ShowBoard = () => {
  return (
    <div className="text-center fs-1">
      <div className="container text-center">
        <div className="row">
          <div className="col"></div>
          <div className="col text-light bg-img">
            <Image
              imageUrl="../assets/img/MoPar-logos_white_small.png"
              alternate=""
              classes={"img-fluid "}
            />
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default ShowBoard;
