import React from "react";

const Slider = (props) => {
  return (
    <div className="col-md-12 my-2">
      <h3>{props.heading}</h3>
      <div className="form-group">
        <label htmlFor="priceRange">{props.labelSlide}</label>
        <input
          type="range"
          className="form-control-range"
          id="priceRange"
          value={props.price}
          onChange={props.priceHandler}
          min={props.rangeS}
          max={props.rangeE}
        />
        <label htmlFor="priceRange"></label>
      </div>
    </div>
  );
};

export default Slider;
