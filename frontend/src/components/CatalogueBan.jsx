import React from "react";
import Image from "./Image";
import Search from "../pages/Search";

const CatalogueBan = () => {
  return (
    <>
      <div className="container view-catalogue pt-5">
        <Image
          imageUrl={"../assets/img/mustang15.png"}
          Hei={"90"}
          classes={"show-im"}
        />
        <strong className="fs-1 text-light mt-5">Big Deals Right Here!</strong>
        <Image imageUrl="../assets/img/logo192.png" classes="show-im ms-auto" />
      </div>
      <div className="container view-catalogue mb-4">
        <Search />
      </div>
    </>
  );
};

export default CatalogueBan;
