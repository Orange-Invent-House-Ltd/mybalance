import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BuyerDashboardLayout from "./layout/BuyerDashboardLayout";
import Login from "./pages/buyer/auth/Login";
import Seller from "./pages/seller/index";
import AddNewDispute from "./pages/buyer/dashboard/AddNewDispute";
import CustomerSupport from "./pages/buyer/dashboard/CustomerSupport";
import DisputeResolution from "./pages/buyer/dashboard/DisputeResolution";
import Home from "./pages/buyer/dashboard/Home";
import Profile from "./pages/buyer/dashboard/Profile";
import Settings from "./pages/buyer/dashboard/Settings";
import Register from "./pages/buyer/auth/Register";
import RegVerification from "./pages/buyer/auth/RegVerification";
import Dashboard from "./pages/buyer/dashboard/Dashboard";
import QuickAction from "./pages/buyer/dashboard/QuickAction";
import LockNewAmount from "./pages/buyer/dashboard/LockNewAmount";
import TransactionHistory from "./pages/buyer/dashboard/TransactionHistory";
import Notifications from "./pages/buyer/dashboard/Notifications";
import SellerDashboardLayout from "./layout/SellerDashboardLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="buyer/login" replace />} />
        <Route path="/buyer" element={<BuyerDashboardLayout />}>
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
          <Route path="lock" element={<LockNewAmount />} />
        </Route>
        <Route path="/buyer/login" element={<Login />} />
        <Route path="/buyer/register" element={<Register />} />
        <Route
          path="/buyer/register/verification"
          element={<RegVerification />}
        />
        <Route path="/seller/*" element={<Seller />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
