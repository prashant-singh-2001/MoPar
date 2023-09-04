import React from "react";

const ServiceBanners = (props) => {
  return (
    <div className={"col-md-5 m-3 grow-up text-start " + props.image}>
      <div className={"row m-4 fs-5  " + props.location}>
        <div className="col blur rounded-1 py-3 px-1 fs-5 bdr-feature ">
          {props.text + "!"}
        </div>
      </div>
    </div>
  );
};

export default ServiceBanners;
