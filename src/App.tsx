import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ManageItems from "./pages/ManageItem";
import BurgerOnboarding from "./pages/Onboarding";
import Orders from "./pages/Orders";
import Order from "./pages/SuccessPage";
import Stock from "./pages/Manager";
import OrdersDetails from "./pages/OrderDetails";
export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/manager" element={<Stock />} />
        <Route path="order" element={<Orders />} />
        <Route path="dashboard" element={<ManageItems />} />
        <Route path="menu" element={<BurgerOnboarding />} />
        <Route path="stock" element={<BurgerOnboarding />} />
        <Route path="success" element={<Order />} />
        <Route path="order-details/:id" element={<OrdersDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
