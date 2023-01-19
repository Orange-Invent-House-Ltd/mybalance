import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerDashboardLayout from "../../layout/SellerDashboardLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CreateEscrowLink from "./dashboard/CreateEscrowLink";
import Dashboard from "./dashboard/Dashboard";
import DisputeResolution from "./dashboard/DisputeResolution";
import Notifications from "./dashboard/Notifications";
import Profile from "./dashboard/Profile";
import Settings from "./dashboard/Settings";
import TransactionHistory from "./dashboard/TransactionHistory";


const Index = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<SellerDashboardLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
        <Route path="Notifications" element={<Notifications/>} />
        <Route path="settings" element={<Settings />} />
        <Route path="dispute-resolution" element={<DisputeResolution />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard/escrow-link" element={<CreateEscrowLink />} />
      </Route>
    </Routes>
  );
};

export default Index;
