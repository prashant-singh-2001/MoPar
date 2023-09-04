import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch } from "react-redux";
import { login } from "../actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginSubmit = (e) => {
    console.log("form submitted");
    dispatch(login(email, password));
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content blur">
            {false ? (
              <Loader />
            ) : (
              <form className="modal-body" onSubmit={loginSubmit}>
                <img
                  className="mb-4 form-imag"
                  src="../assets/img/MoPar-logos_transparent_small.png"
                  alt=""
                />

                <h1 className="f2-normal mb-3 fs-1 form-labe">Sign in</h1>

                <MailOutlineIcon className="fs-3" />
                <div className={"form-floating m-3"}>
                  <input
                    type={"email"}
                    className={"form-control "}
                    id={"loginEmail"}
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label htmlFor={"loginEmail"}>Email Address</label>
                </div>

                <LockOpenIcon className="fs-3" />
                <div className={"form-floating m-3"}>
                  <input
                    type={"password"}
                    className={"form-control "}
                    id={"loginPassword"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <label htmlFor={"loginPassword"}>Password</label>
                </div>
                <div className="form-check text-start my-3 mx-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="remember-me"
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
                <input
                  type="submit"
                  className="btn btn-outline-primary w-100 p-1"
                  name="Sign in"
                />
                <div className="text-dark fs-6 m-3 fogot">
                  <Link className="fogot" to="/password/forgot">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            )}
            <div className="modal-footer">
              <i className="fs-6">New to the site ?.. </i>
              <Link
                className="btn btn-outline-success"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
