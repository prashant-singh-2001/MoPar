import React, { useEffect, useState } from "react";
import ModalTop from "../components/ModalTop";
import Header from "../components/header";
import FootFet from "../components/footFet";
import MetaData from "../js/MetaData";
import Image from "../components/Image";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromCart } from "../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { saveShippingInfo } from "../actions/cartAction";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
const Checkout = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/login?redirect=checkout");
    // }
  }, [isAuthenticated, navigate]);
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/orders/confirm");
  };
  return (
    <>
      <MetaData title={"Checkout"} />

      <ModalTop />
      <div className="container-fluid bg-dark pt-5">
        <div className="row mb-5">
          <Header oncheckout />
        </div>
        <div
          className="container  rounded-2 blur"
          style={{ minHeight: "90vh" }}
        >
          <div className="modal-body ">
            <div className="modal-header">
              <p className="fw-bold fs-3 ms-3 mt-3">Items in Cart</p>
            </div>
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
                <hr className="border border-dark border-3 mx-2" />
                <div className="modal-footer border border-0 p-1">
                  <p className=" fs-4 me-3 ">Total :</p>
                  <p className=" fs-4 me-4 text-danger fw-bold">
                    {`£${cartItems.reduce(
                      (acc, items) => acc + items.price,
                      0
                    )}`}
                  </p>
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
            <hr className="border border-dark border-3 mx-2" />
          </div>
          <div className="container" style={{ marginLeft: "25%" }}>
            <div className="modal-body ">
              <h2 className="fs-3 fw-bold m-3">Shipping Details</h2>

              <form
                className="col-12 "
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <HomeIcon className="fs-1 mx-auto mt-3" />
                <div className="form-floating w-50">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="address"
                  />
                  <label htmlFor="adress">Adress</label>
                </div>
                <LocationCityIcon className="fs-1 mt-3" />
                <div className="form-floating w-50">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                    id="city"
                  />{" "}
                  <label htmlFor="city">City</label>
                </div>
                <PinDropIcon className="fs-1 mt-3" />
                <div className="form-floating w-50">
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="form-control"
                    id="pin"
                  />
                  <label htmlFor="pin">PinCode</label>
                </div>
                <PhoneIcon className="fs-1 mt-3" />
                <div className="form-floating w-50">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    size="10"
                    className="form-control"
                    id="phone"
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>
                <PublicIcon className="fs-1 mt-3" />
                <div className=" w-50">
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-select "
                    id="country"
                    style={{ height: "6vh" }}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                {country && (
                  <>
                    <TransferWithinAStationIcon className="fs-1 mt-3" />
                    <div className="w-50">
                      <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="form-select "
                      >
                        <option value="">State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
                <input
                  type="submit"
                  value="Continue"
                  className="btn btn-outline-success btn-light my-3 w-25"
                  style={{ marginLeft: "14%" }}
                  disabled={state ? false : true}
                />
              </form>
            </div>
          </div>
        </div>
        <FootFet white={true} />
      </div>
    </>
  );
};

export default Checkout;
