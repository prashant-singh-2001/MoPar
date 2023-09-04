import React from "react";
import UnoList from "./UnoList";
import Image from "./Image";
const FootFet = (props) => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <Image
              imageUrl={
                props.white
                  ? "../assets/img/MoPar-logos_white_small.png"
                  : "../assets/img/MoPar-logos_transparent_small.png"
              }
              alternate="MOPAR"
              Hei="130px"
            />
          </a>
        </div>

        <UnoList
          white={props.white}
          classes="nav col-md-4 justify-content-end d-flex"
        />
      </footer>
    </div>
  );
};

export default FootFet;
