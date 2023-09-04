import React from "react";
import Image from "./Image";
const LiItm = (props) => {
  return (
    <li className={props.classes}>
      <a className="text-body-secondary" href={props.linkUrl}>
        {props.imageUrl ? (
          <Image
            imageUrl={props.imageUrl}
            alternate={props.alternate}
            Hei={props.Hei}
          />
        ) : (
          ""
        )}
        {props.listText}
      </a>
    </li>
  );
};

export default LiItm;
