import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  ScrollRestoration,
} from "react-router-dom";
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
import PasswordReset from "./pages/auth/PasswordReset";
import TermsAndCondition from "./pages/home/TermsAndCondition";
import Privacy from "./pages/home/Privacy";
import GetVerificationLink from "./pages/auth/GetVerificationLink";
import AuthLayout from "./layout/AuthLayout";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollToTop from "./components/reuseable/ScrollToTop";
import PaymentSucessfull from "./pages/home/PaymentSucessfull";
import Test from "./pages/buyer/dashboard/Test";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test itemsPerPage={4} />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/t&c" element={<TermsAndCondition />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/payment-successful" element={<PaymentSucessfull />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route
            path="/get-verification-link"
            element={<GetVerificationLink />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/forgot-password/email-verification"
            element={<ForgotPasswordVerification />}
          />
          <Route path="/reset-password" element={<SetNewPassword />} />
          <Route
            path="/reset-password/:verificationCode"
            element={<SetNewPassword />}
          />
          <Route
            path="/reset-password/password-reset"
            element={<PasswordReset />}
          />
        </Route>
        {/* <Route path="/buyer/register" element={<Register />} /> */}

        <Route path="/share-escrow-link" element={<ShareEscrowLink />} />
        <Route path="/buyer/*" element={<Buyer />} />
        <Route path="/seller/*" element={<Seller />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
