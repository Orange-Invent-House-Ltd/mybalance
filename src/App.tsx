import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Seller from "./pages/seller/index";
import Buyer from "./pages/buyer/index";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotPasswordVerification from "./pages/auth/ForgotPasswordVerification";
import SetNewPassword from "./pages/auth/SetNewPassword";
import PageNotFound from "./pages/home/PageNotFound";
import Home from "./pages/home/Home";
import Login from "./pages/buyer/auth/Login";
import Register from "./pages/buyer/auth/Register";
import ShareEscrowLink from "./pages/home/ShareEscrowLink";


const App: React.FC = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyer/login" element={<Login />} />
        <Route path="/buyer/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/forgot-password/email-verification" element={<ForgotPasswordVerification/>} />
        <Route path="/set-new-password" element={<SetNewPassword/>} />
        <Route path="/share-escrow-link" element={<ShareEscrowLink/>} />
        <Route path="/buyer/*" element={<Buyer />} />
        <Route path="/seller/*" element={<Seller />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
