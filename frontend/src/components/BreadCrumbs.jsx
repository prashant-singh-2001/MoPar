import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb pt-4 pb-0 rounded-3">
        <li className="breadcrumb-item">
          <Link
            className="link-body-emphasis fw-semibold text-decoration-none"
            href="/"
          >
            Library
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Data
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
