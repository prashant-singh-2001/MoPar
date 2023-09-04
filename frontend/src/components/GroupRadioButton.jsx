import React from "react";

const GroupRadioButton = (props) => {
  return (
    <div className="col-md-12 my-2">
      <h3>{props.heading}</h3>
      {props.items
        ? props.items.map((element) => {
            return (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioGroup3"
                  id="radio5"
                />
                <label className="form-check-label" htmlFor="radio5">
                  {element}
                </label>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default GroupRadioButton;
