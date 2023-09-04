import React from "react";

const BannerFont = (props) => {
  return (
    <div className="col flex justify-content-even">
      <strong className="big-font">
        {props.BanValue > 10 ? props.BanValue + "+" : props.BanValue}
      </strong>
      <p className="fs-2 text-center">{props.Whoa + "!"}</p>
    </div>
  );
};

export default BannerFont;
