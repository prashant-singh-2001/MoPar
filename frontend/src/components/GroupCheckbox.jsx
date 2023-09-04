import React from "react";

const GroupCheckbox = (props) => {
  console.log(props.items);
  return (
    <div className="col-md-12 my-2">
      <h3>{props.groupName}</h3>
      {props.items
        ? props.items.map((element) => {
            return (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="checkbox1"
                />
                <label className="form-check-label" htmlFor="checkbox1">
                  {element}
                </label>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default GroupCheckbox;
