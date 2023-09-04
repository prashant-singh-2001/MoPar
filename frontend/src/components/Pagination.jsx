import React from "react";
import { Link } from "react-router-dom";
import NavLink from "./Links";

const Pagination = (props) => {
  //   var total = [];
  //   for (var i = 1; i < 4; i++) {
  //     total[i] = i;
  //   }
  var total = [1, 2, 3, 4, 5];
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <Link className="page-link">Previous</Link>
        </li>
        {total.map((item) => {
          return (
            <li className="page-item" key={item}>
              <NavLink
                Name={item}
                Classes={"page-link"}
                Link={"/ViewCatalogue/" + { item }}
              />
            </li>
          );
        })}
        <li className="page-item">
          <Link className="page-link" to={"/ViewCatalogue/2"}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
