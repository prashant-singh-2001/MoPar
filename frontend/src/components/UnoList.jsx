import React from "react";
import LiItm from "./LiItm";

const UnoList = (props) => {
  return (
    <ul className={props.classes}>
      <LiItm
        classes={"ms-3"}
        imageUrl={
          props.white
            ? "../assets/Feather-light/instagram.svg"
            : "../assets/Feather/instagram.svg"
        }
        linkUrl={"https://instagram.com/__._.mephisto._.__"}
      />
      <LiItm
        classes={"ms-3"}
        imageUrl={
          props.white
            ? "../assets/Feather-light/facebook.svg"
            : "../assets/Feather/facebook.svg"
        }
        linkUrl={"www.google.com"}
      />
      <LiItm
        classes={"ms-3"}
        imageUrl={
          props.white
            ? "../assets/Feather-light/linkedin.svg"
            : "../assets/Feather/linkedin.svg"
        }
        linkUrl={"https://www.linkedin.com/in/prashant-singh-531b57198/"}
      />
    </ul>
  );
};

export default UnoList;
