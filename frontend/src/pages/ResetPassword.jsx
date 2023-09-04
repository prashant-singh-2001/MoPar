import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstant";
import MetaData from "../js/MetaData";
import Header from "../components/header";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate, useParams } from "react-router";
import FootFet from "../components/footFet";
import ModalTop from "../components/ModalTop";

const ResetPassword = () => {
  const alert = useAlert();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (success) {
      alert.success("Password Updated!");
      navigate("/login");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [navigate, success, alert, dispatch, error]);
  return (
    <>
      <ModalTop />
      <MetaData title="Password Update" />
      {loading ? (
        <Loader />
      ) : (
        <div className="banner-body">
          <div className="container-fluid" style={{ minHeight: "90vh" }}>
            <Header />
            <div className="row pt-5">
              <div className="col-4"></div>
              <div className="col-4">
                <form
                  className="modal-body container mt-5 px-5"
                  onSubmit={updatePasswordSubmit}
                >
                  <h1 className="text-center text-light fw-bold my-2 fs-2">
                    UPDATE PASSWORD
                  </h1>

                  <LockOpenIcon className="text-light mx-4 mt-3 fs-1" />
                  <div className="form-floating mx-3 mb-2">
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      id={"newPass"}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                    <label htmlFor={"newPass"}>New Password</label>
                  </div>
                  <LockIcon className="text-light mx-4 mt-3 fs-1" />
                  <div className="form-floating mx-3 mb-2">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      id={"confirmPass"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control"
                    />
                    <label htmlFor={"confirmPass"}>Confirm Password</label>
                  </div>
                  <input
                    type="submit"
                    value="Change Password"
                    style={{ height: "6vh" }}
                    className="btn btn-outline-danger btn-light w-75 mx-5 mt-4 mb-5"
                  />
                </form>
              </div>
              <div className="col-4"></div>
            </div>
            <FootFet white={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
