import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Seller from "./pages/seller/index";
import Buyer from "./pages/buyer/index";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotPasswordVerification from "./pages/auth/ForgotPasswordVerification";
import SetNewPassword from "./pages/auth/SetNewPassword";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/buyer/login" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/forgot-password/email-verification" element={<ForgotPasswordVerification/>} />
        <Route path="/set-new-password" element={<SetNewPassword/>} />
        <Route path="/buyer/*" element={<Buyer />} />
        <Route path="/seller/*" element={<Seller />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
