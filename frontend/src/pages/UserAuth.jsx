import React, { useEffect } from "react";
import MetaData from "../js/MetaData";
import LoginSignUp from "../components/LoginSignUp";
import Header from "../components/header";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import ModalTop from "../components/ModalTop";
import FootFet from "../components/footFet";

const UserAuth = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, redirect, navigate]);
  return (
    <>
      <ModalTop />
      <MetaData title="Autherization" />
      <div className="banner-body">
        <div className="container-fluid">
          <Header />
          <LoginSignUp />
          <FootFet white={true} />
        </div>
      </div>
    </>
  );
};

export default UserAuth;
