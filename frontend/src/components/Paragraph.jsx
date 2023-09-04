import React from "react";

const Paragraph = (props) => {
  return (
    <p className={props.mainCss}>
      <span className={props.titleCss}>{props.title}</span>{" "}
      <span className={props.descCss}>{props.desc}</span>
    </p>
  );
};

export default Paragraph;
