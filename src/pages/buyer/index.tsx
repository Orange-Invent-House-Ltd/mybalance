import React from "react";
import {  Route, Routes } from "react-router-dom";
import BuyerDashboardLayout from "../../layout/BuyerDashboardLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import RegVerification from "./auth/RegVerification";
import AddNewDispute from "./dashboard/AddNewDispute";
import CustomerSupport from "./dashboard/CustomerSupport";
import Dashboard from "./dashboard/Dashboard";
import DisputeResolution from "./dashboard/DisputeResolution";
import Home from "./dashboard/Home";
import LockNewAmount from "./dashboard/LockNewAmount";
import Notifications from "./dashboard/Notifications";
import Profile from "./dashboard/Profile";
import QuickAction from "./dashboard/QuickAction";
import Settings from "./dashboard/Settings";
import TransactionHistory from "./dashboard/TransactionHistory";
import PageNotFound from "../home/PageNotFound";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<BuyerDashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="quick-action" element={<QuickAction />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="dispute-resolution" element={<DisputeResolution />} />
        <Route path="dispute-resolution/add" element={<AddNewDispute />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="customer-support" element={<CustomerSupport />} />
        <Route path="quick-action/lock" element={<LockNewAmount />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/verification" element={<RegVerification />}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
};

export default Index;
