import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerDashboardLayout from "../../layout/SellerDashboardLayout";
import Register from "./auth/Register";
import RegisterIdentity from "./auth/RegisterIdentity";
import CustomerSupport from "./dashboard/CustomerSupport";
import Dashboard from "./dashboard/Dashboard";
import DisputeResolution from "./dashboard/DisputeResolution";
import Notifications from "./dashboard/Notifications";
import Profile from "./dashboard/Profile";
import RegVerification from "./auth/RegVerification";
import Settings from "./dashboard/Settings";
import TransactionHistory from "./dashboard/TransactionHistory";
import RegisterContinue from "./auth/RegisterContinue";
import PageNotFound from "../home/PageNotFound";
import AuthLayout from "../../layout/AuthLayout";
import AddNewDispute from "./dashboard/AddNewDispute";

const Index = () => {
  const queryClient = new QueryClient();

  return (
    <Routes>
      <Route path="/" element={<SellerDashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="customer-support" element={<CustomerSupport />} />
        <Route path="settings" element={<Settings />} />
        <Route path="dispute-resolution" element={<DisputeResolution />} />
        <Route path="dispute-resolution/add" element={<AddNewDispute />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/register/continue" element={<RegisterContinue />} />
        <Route
          path="/register/continue/identity"
          element={<RegisterIdentity />}
        />
        <Route
          path="/register/continue/identity/verification"
          element={<RegVerification />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Index;
