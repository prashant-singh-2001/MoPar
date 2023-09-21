import React from "react";
import Image from "./Image";

const ShowBoard = () => {
  return (
    <div className="text-center fs-1">
      <div
        className="container text-center"
        style={{ minHeight: "90vh", paddingTop: "15vh" }}
      >
        <Image
          imageUrl="../assets/img/MoPar-logos_white_small.png"
          alternate=""
          classes={"img-fluid m-4"}
        />
      </div>
    </div>
  );
};

export default ShowBoard;
