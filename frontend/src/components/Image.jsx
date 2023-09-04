import React from "react";

const Image = (props) => {
  return (
    <img
      src={props.imageUrl}
      className={props.classes}
      alt={props.alternate}
      height={props.Hei}
      width={props.Wid}
    />
  );
};

export default Image;
