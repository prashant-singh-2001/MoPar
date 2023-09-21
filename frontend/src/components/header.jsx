import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import Image from "./Image";

const Header = (props) => {
  const [navClass, setNavClass] = useState("trans");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (props.active !== "home" ? 1 : 750)) {
        setNavClass("blur-dark");
      } else {
        setNavClass("trans");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props]);

  return (
    <nav
      className={
        "container-fluid navbar trans text-light navbar-expand-lg  fixed-top " +
        navClass
      }
    >
      <div className="container">
        <Link
          to="/"
          className={
            "navbar-brand p-0 ico " + props.active === "home" ? "shadow-xl" : ""
          }
        >
          <Image
            imageUrl={
              props.isAdmin
                ? "../../assets/img/MoPar-white.png"
                : "../assets/img/MoPar-white.png"
            }
            alertnate={"MoPar"}
            Wid={"80"}
            Hei={"40"}
            classes={"ico"}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar
          oncheckout={props.oncheckout ? true : false}
          active={props.active}
        />
      </div>
    </nav>
  );
};

export default Header;
