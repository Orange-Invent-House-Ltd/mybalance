import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuyerDashboardLayout from "./layout/BuyerDashboardLayout";
import Login from "./pages/buyer/auth/Login";
import DisputeResolution from "./pages/buyer/dashboard/DisputeResolution";
import Home from "./pages/buyer/dashboard/Home";
import Settings from "./pages/buyer/dashboard/Settings";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/buyer" element={<BuyerDashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="dispute-resolution" element={<DisputeResolution />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
