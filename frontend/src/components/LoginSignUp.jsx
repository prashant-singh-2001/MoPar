import React, { Fragment, useRef, useState, useEffect } from "react";
import "../css/LoginSignUp.css";
import Loader from "./Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer ">
            <div className="LoginSignUpBox blur rounded-3 shadow">
              <div className="bg-light">
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className="modal-body container"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <MailOutlineIcon className="mx-4 mt-3 fs-1" />
                <div className="form-floating mx-3 mb-2">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    id={"loginEmail"}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="form-control"
                  />
                  <label htmlFor={"loginEmail"}>Email Address</label>
                </div>
                <LockOpenIcon className="mx-4 mt-3 fs-1" />
                <div className="form-floating mx-3 mb-2">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    id={"loginPassword"}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="form-control"
                  />
                  <label htmlFor={"loginPassword"}>Password</label>
                </div>
                <Link
                  to="/password/forgot"
                  className="btn btn-outline-warning btn-light mt-3"
                  style={{ marginLeft: "58%" }}
                >
                  Forget Password ?
                </Link>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-outline-danger btn-light w-75 mx-5 mt-4 mb-5"
                />
              </form>
              <form
                className="modal-body container"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="row mx-1 mt-1">
                  <div className="col-2">
                    <FaceIcon className=" my-3 fs-1" />
                  </div>
                  <div className="col-10">
                    <div className="form-floating ">
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                        className="form-control"
                        id="signupName"
                      />
                      <label htmlFor={"signupName"}>Name</label>
                    </div>
                  </div>
                </div>
                <div className="row mx-1">
                  <div className="col-2">
                    <MailOutlineIcon className="my-3 fs-1" />
                  </div>
                  <div className="col-10">
                    <div className="form-floating ">
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={registerDataChange}
                        id="signupEmail"
                        className="form-control"
                      />
                      <label htmlFor={"signupEmail"}>Email</label>
                    </div>
                  </div>
                </div>
                <div className="row mx-1">
                  <div className="col-2">
                    <LockOpenIcon className="my-3 fs-1" />
                  </div>
                  <div className="col-10">
                    <div className="form-floating">
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                        id="signUpPassword"
                        className="form-control"
                      />
                      <label htmlFor={"signUpPassword"}>Password</label>
                    </div>
                  </div>
                </div>

                <div className="row mx-1">
                  <div className="col-2">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="img-fluid   "
                    />
                  </div>
                  <div className="col-10">
                    <div id="registerImage">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                        className="form-control "
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-outline-danger btn-light w-75 mx-5 mt-4 mb-5"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
