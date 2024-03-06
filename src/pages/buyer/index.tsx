import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import BuyerDashboardLayout from "../../layout/BuyerDashboardLayout";
import Register from "./auth/Register";
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
import AuthLayout from "../../layout/AuthLayout";
import TransactionStatus from "./dashboard/TransactionStatus";

const Index = () => {
  const client = new QueryClient();
  return (
    <Routes>
      <Route path="/" element={<BuyerDashboardLayout />}>
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
      <Route path="payment-callback" element={<TransactionStatus />} />
      <Route path="" element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Index;
