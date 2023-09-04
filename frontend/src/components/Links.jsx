import React from "react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
  return (
    <>
      <Link className={props.Classes} to={props.Link}>
        {props.Name}
      </Link>
    </>
  );
};

export default NavLink;
