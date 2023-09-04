import React from "react";
import Links from "./Links";
import { Link } from "react-router-dom";
import Image from "./Image";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";

const Navbar = (props) => {
  var link = ["View Catalogue"];
  return (
    <div className="navbar-nav ms-auto align-items-center">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        {link.map((item) => (
          <Links
            Classes={
              "nav-link p-0 mx-2 " +
              (item === props.active ? "fs-5 acitve" : "fs-6 ")
            }
            Link={"/" + item.replace(" ", "")}
            Name={item}
            key={item}
          />
        ))}
        {!props.oncheckout ? (
          <div className="nav-item">
            <Link
              className="nav-link btn btn-outline-dark btn-outline-dark-no"
              data-bs-toggle="modal"
              data-bs-target="#cartSidebar"
            >
              <ShoppingCartIcon />
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="nav-link">
          <Link
            to="/ViewCatalogue/#search"
            className="nav-link btn btn-outline-dark btn-outline-dark-no"
          >
            <Image
              classses={"img-fluid"}
              imageUrl={"../assets/img/feather-light/search.svg"}
              Hei={"25px"}
            />
          </Link>
        </div>
      </div>
      {/* <ButtonC
        ButtonClasses="btn btn-outline-dark btn-outline-dark-no"
        IsLogin={true}
      /> */}
      <Link className="btn btn-outline-dark btn-outline-dark-no" to="/login">
        <Image
          alternate={"Login"}
          imageUrl={"../assets/Feather-light/user.svg"}
          Hei={"25px"}
        />
      </Link>
    </div>
  );
};

export default Navbar;
