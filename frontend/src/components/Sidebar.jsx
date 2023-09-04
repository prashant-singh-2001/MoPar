import React from "react";
import Image from "./Image";
// import { RemoveProd } from "../js/RemoveProd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromCart } from "../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <div
      className="modal fade"
      id="cartSidebar"
      tabIndex={-1}
      aria-labelledby="cartSidebarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog model-lg">
        <div className="modal-content blur">
          <div className="modal-header border border-0 p-1 pb-0">
            <h5 className="modal-title ps-3" id="cartSidebarLabel">
              Cart
            </h5>
            <Link
              className="btn-close pe-4"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {cartItems && cartItems.length !== 0 ? (
              <>
                <ul className="list-group list-group-flush">
                  {cartItems &&
                    cartItems.map((e, i) => {
                      return (
                        <li
                          className="list-group-item mx-4 my-2 rounded-1 bg-light-subtle"
                          key={e.product}
                        >
                          <div className="row justify-content-center text-center align-items-center">
                            <div className="col-1 ">{i}</div>
                            <div className="col-3 rounded-2">
                              <Image
                                classes={"img-fluid rounded-2"}
                                imageUrl={e.image}
                              />
                            </div>
                            <div className="col-4 ">
                              <Link
                                className="btn btn-outline-dark-no btn-light"
                                to={`/product/${e.product}`}
                              >
                                {e.manufacturer + " " + e.model}
                              </Link>
                            </div>
                            <div className="col-2 ">{e.price}</div>
                            <div className="col-2 ">
                              <button
                                type="button"
                                className=" btn btn-close btn-danger"
                                onClick={() => deleteCartItem(e.product)}
                              />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
                <div className="modal-footer border border-0 p-1">
                  <p className=" fs-5">
                    Total :{" "}
                    {`£${cartItems.reduce(
                      (acc, items) => acc + items.price,
                      0
                    )}`}
                  </p>
                  <Link to="/checkout" className="btn btn-outline-dark">
                    Checkout
                  </Link>
                </div>
              </>
            ) : (
              <div className="m-auto mb-5">
                <RemoveShoppingCartIcon />

                <Typography>No Product in Your Cart</Typography>
                <Link
                  to="/ViewCatalogue"
                  className="btn btn-outline-warning btn-dark"
                >
                  View Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
