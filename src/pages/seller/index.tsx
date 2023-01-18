import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerDashboardLayout from "../../layout/SellerDashboardLayout";
import Login from "./auth/Login";
import DisputeResolution from "./dashboard/DisputeResolution";
import Profile from "./dashboard/Profile";
import Settings from "./dashboard/Settings";

const Index = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<SellerDashboardLayout />}>
        <Route path="settings" element={<Settings />} />
        <Route path="dispute-resolution" element={<DisputeResolution />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Index;
