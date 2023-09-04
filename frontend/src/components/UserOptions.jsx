import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router";
import { useAlert } from "react-alert";
import { logout } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { light } from "@material-ui/core/styles/createPalette";

const UserOptions = ({ user }) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: account },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "greenyellow" : "crimson" }}
        />
      ),
      name: `Cart ${cartItems.length}`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }

  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/checkout");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial Tooltip Example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{ zIndex: "11" }}
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((e) => (
          <SpeedDialAction
            key={e.name}
            icon={e.icon}
            tooltipTitle={e.name}
            onClick={e.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
