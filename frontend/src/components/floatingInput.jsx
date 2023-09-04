import React from "react";

const FloatingInput = (props) => {
  return (
    <div className={"form-floating " + props.cl}>
      <input
        type={props.InputType}
        className={"form-control " + props.moreclass}
        id={props.useId}
        placeholder="{props.PlaceHold}"
      />
      <label htmlFor={props.useId}>{props.PlaceHold}</label>
    </div>
  );
};

export default FloatingInput;
