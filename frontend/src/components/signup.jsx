import React, { useState } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefualt();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
  };

  return (
    <div
      className="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabIndex="-1"
    >
      <div className="modal-dialog ">
        <div className="modal-content blur">
          <form encType="multipart/form-data" onSubmit={registerSubmit}>
            <img
              className="mb-4 form-imag"
              src="../assets/img/MoPar-logos_transparent_small.png"
              alt=""
            />
            <h1 className="f2-normal mb-3 fs-1 form-labe">Sign Up</h1>
            <div className="row justify-content-even">
              <div className="col-11 mx-3 px-4">
                <FaceIcon className="fs-3" />
                <div className={"form-floating m-3"}>
                  <input
                    type={"text"}
                    className={"form-control "}
                    id={"name"}
                    placeholder="Name"
                    name="name"
                    onChange={registerDataChange}
                    value={name}
                    required
                  />
                  <label htmlFor={"name"}>Name</label>
                </div>
              </div>

              <div className="col-11 mx-3 px-4">
                <MailOutlineIcon className="fs-3" />
                <div className={"form-floating m-3"}>
                  <input
                    type={"email"}
                    className={"form-control "}
                    id={"loginEmail"}
                    placeholder="Email Address"
                    onChange={registerDataChange}
                    value={email}
                    name="email"
                    required
                  />
                  <label htmlFor={"loginEmail"}>Email Address</label>
                </div>
              </div>
              <div className="col-11 mx-3 px-4">
                <LockOpenIcon className="fs-3" />
                <div className={"form-floating m-3"}>
                  <input
                    type={"password"}
                    className={"form-control "}
                    id={"password"}
                    placeholder="Password"
                    onChange={registerDataChange}
                    value={password}
                    name="password"
                    required
                  />
                  <label htmlFor={"password"}>Password</label>
                </div>
              </div>
              <div className="col-11 mb-3 mx-3 px-4">
                <img
                  src={avatarPreview}
                  className="img-fluid "
                  alt="Avatar Preview"
                  style={{ width: "10rem" }}
                />
                <input
                  type="file"
                  name="Avatar"
                  accept="image/*"
                  className={"form-control "}
                  onChange={registerDataChange}
                  required
                />
              </div>
            </div>
            <input
              className="btn btn-outline-primary w-25 p-1 my-3 form-labe"
              type="submit"
              value={"Sign Up"}
              name="Sign Up"
            />
          </form>
          <div className="modal-footer">
            <i className="fs-6">Have an account already ?.. </i>
            <Link
              className="btn btn-outline-warning"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
