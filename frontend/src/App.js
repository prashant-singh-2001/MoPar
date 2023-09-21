import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/myStyle.css";
import "bootstrap/dist/js/bootstrap.bundle";
import MainContainer from "./pages/Home";
import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ViewCatalogue from "./pages/ViewCatalogue";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import UserAuth from "./pages/UserAuth";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmOrder from "./pages/ConfirmOrder";
import ElementedPayment from "./pages/ElementedPayment";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProductList from "./pages/admin/ProductList";
import NewProduct from "./pages/admin/NewProduct";
import OrderList from "./pages/admin/OrderList";
import ProcessOrder from "./pages/admin/ProcessOrder";
import UsersList from "./pages/admin/UsersList";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route
            path="/process/payment"
            element={isAuthenticated ? <ElementedPayment /> : <UserAuth />}
          />
          <Route path="/" element={<MainContainer />} />
          <Route path="/ViewCatalogue" element={<ViewCatalogue />} />
          <Route path="/Product/:id" element={<Product />} />
          <Route path="/checkout/" element={<Checkout />} />
          <Route path="/ViewCatalogue/:keyword" element={<ViewCatalogue />} />
          <Route path="/login" element={<UserAuth />} />
          <Route
            path="/account"
            element={isAuthenticated === true ? <Profile /> : <UserAuth />}
          />
          <Route
            path="/password/update"
            element={
              isAuthenticated === true ? <UpdatePassword /> : <UserAuth />
            }
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route
            path="/orders/confirm"
            element={isAuthenticated === true ? <ConfirmOrder /> : <UserAuth />}
          />
          <Route
            path="/success"
            element={isAuthenticated === true ? <OrderSuccess /> : <UserAuth />}
          />
          <Route
            path="/order/:id"
            element={isAuthenticated === true ? <OrderDetails /> : <UserAuth />}
          />
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated === true && user.role === "admin" ? (
                <Dashboard />
              ) : (
                <UserAuth />
              )
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              isAuthenticated === true && user.role === "admin" ? (
                <ProcessOrder />
              ) : (
                <UserAuth />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              isAuthenticated === true && user.role === "admin" ? (
                <UsersList />
              ) : (
                <UserAuth />
              )
            }
          />
          <Route
            path="/admin/products"
            element={
              isAuthenticated === true && user.role === "admin" ? (
                <ProductList />
              ) : (
                <UserAuth />
              )
            }
          />
          <Route
            path="/admin/product"
            element={
              isAuthenticated === true && user.role === "admin" ? (
                <NewProduct />
              ) : (
                <UserAuth />
              )
            }
          />
          <Route
            path="/admin/orders"
            element={
              isAuthenticated === true && user.role === "admin" ? (
                <OrderList />
              ) : (
                <UserAuth />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
