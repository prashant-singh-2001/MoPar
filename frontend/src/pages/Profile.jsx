import React, { useEffect, useState } from "react";
import MetaData from "../js/MetaData";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../actions/userAction";
import { useAlert } from "react-alert";
import Header from "../components/header";
import { UPDATE_PROFILE_RESET } from "../constants/userConstant";
import ModalTop from "../components/ModalTop";
import MyOrders from "../components/MyOrders";
import FootFet from "../components/footFet";

const Profile = () => {
  const alert = useAlert();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [wantUpdate, setWantUpdate] = useState(true);
  const [editText, setEditText] = useState("Edit Profile");
  const handleEdit = () => {
    setWantUpdate(!wantUpdate);
    !wantUpdate ? setEditText("Edit Profile") : setEditText("Cancel Edit");
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (isUpdated) {
      alert.success("Profile Updated!");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [isAuthenticated, navigate, isUpdated, user, alert, dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ModalTop />
          <MetaData title={user.name} />
          <div className="bg-dark">
            <div className="container p-3">
              <Header />
              <div className="row text-light " style={{ paddingTop: "10vh" }}>
                <div className="col-4 ms-3">
                  <h1 className="fw-bold fs-3">{user.name}'s Profile</h1>
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="ms-2 row img-fluid rounded-4"
                  />
                  <Link
                    to="#"
                    className="ms-3 mt-2 row btn btn-outline-light"
                    onClick={handleEdit}
                  >
                    {editText}
                  </Link>
                  <div className="row">
                    <form
                      className="modal-body container mt-2 me-5 blur-dark rounded-3 p-2 "
                      encType="multipart/form-data"
                      onSubmit={registerSubmit}
                    >
                      <h1 className="text-center my-2 fs-2">UPDATE PROFILE</h1>
                      <div className="row  mt-1 me-2">
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
                              onChange={(e) => setName(e.target.value)}
                              className="form-control "
                              disabled={wantUpdate}
                              id="signupName"
                            />
                            <label htmlFor={"signupName"}>Name</label>
                          </div>
                        </div>
                      </div>
                      <div className="row me-2">
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
                              onChange={(e) => setEmail(e.target.value)}
                              id="signupEmail"
                              className="form-control "
                              disabled={wantUpdate}
                            />
                            <label htmlFor={"signupEmail"}>Email</label>
                          </div>
                        </div>
                      </div>

                      <input
                        disabled={wantUpdate}
                        type="submit"
                        value="UPDATE"
                        style={{ height: "5vh" }}
                        className="fs-4 btn btn-outline-danger btn-light w-75 mx-5 mt-3 mb-2"
                      />
                    </form>
                  </div>
                </div>
                <div className="col-7 mx-3">
                  <div className="row">
                    <div className="col-3">
                      <h4>Full Name</h4>
                      <p>{user.name}</p>
                    </div>
                    <div className="col-3">
                      <h4>Mail</h4>
                      <p>{user.email}</p>
                    </div>
                    <div className="col-3">
                      <h4>Hoped on date</h4>
                      <p>{String(user.createdAt).substring(0, 10)}</p>
                    </div>
                    <div className="col-3">
                      <Link
                        to="/password/update"
                        className="ms-3 mt-2 row btn btn-outline-light "
                      >
                        Change Password
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <MyOrders />
                  </div>
                </div>
              </div>
              <FootFet white={true} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
