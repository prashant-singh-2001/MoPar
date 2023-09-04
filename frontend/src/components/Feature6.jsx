import React from "react";
import Image from "./Image";

const Feature6 = (props) => {
  return (
    <div className="col-md-3 m-3 text-start mb-5 feature6">
      <div className="row">
        <div className="col-2 mid-service">
          <Image
            imageUrl={props.imageUrl}
            Hei={"80px"}
            Alternate={props.text}
          />
        </div>
        <div className="col-10 mid-service">
          <strong className="ms-3 fs-5">{props.text}</strong>
        </div>
      </div>
    </div>
  );
};

export default Feature6;
