import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../js/MetaData";
import Header from "../components/header";
import FootFet from "../components/footFet";
import ModalTop from "../components/ModalTop";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [error, dispatch, alert, message]);
  return (
    <>
      <ModalTop />
      <MetaData title="Forgot Password" />
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
                  className="modal-body container mt-2 me-5 blur-dark rounded-3 p-2 "
                  onSubmit={updatePasswordSubmit}
                >
                  <h1 className="text-center text-light my-2 fs-2">
                    FORGOT PASSWORD
                  </h1>
                  <div className="row me-2">
                    <div className="col-2 ps-5">
                      <MailOutlineIcon
                        style={{ fontSize: "1.5cm" }}
                        className=" text-light"
                      />
                    </div>
                    <div className="ms-3 col-9">
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
                        />
                        <label htmlFor={"signupEmail"}>Email</label>
                      </div>
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="Send Mail"
                    style={{ height: "5vh" }}
                    className="fs-4 btn btn-outline-danger btn-light w-75 mx-5 mt-3 mb-2"
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

export default ForgotPassword;
