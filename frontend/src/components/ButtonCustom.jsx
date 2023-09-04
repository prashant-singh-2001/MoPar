import React from "react";
import Image from "./Image";

const Button = (props) => {
  if (props.IsLogin)
    return (
      <button
        className={props.ButtonClasses}
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        <Image
          alternate={"Login"}
          imageUrl={"../assets/Feather-light/log-in.svg"}
          Hei={"25px"}
        />
      </button>
    );
  else return <button className={props.ButtonClasses}>{props.Name}</button>;
};

export default Button;
