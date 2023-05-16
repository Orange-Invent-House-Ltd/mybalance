import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Seller from "./pages/seller/index";
import Buyer from "./pages/buyer/index";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotPasswordVerification from "./pages/auth/ForgotPasswordVerification";
import SetNewPassword from "./pages/auth/SetNewPassword";
import PageNotFound from "./pages/home/PageNotFound";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/buyer/auth/Register";
import ShareEscrowLink from "./pages/home/ShareEscrowLink";
import About from "./pages/home/About";
import HowWeWork from "./pages/home/HowWeWork";
import Contact from "./pages/home/Contact";
import EmailVerification from "./pages/auth/EmailVerification";
import Solutions from "./pages/home/Solutions";


const App: React.FC = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/buyer/register" element={<Register />} />
        <Route path="/email-verification" element={<EmailVerification />} />
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
