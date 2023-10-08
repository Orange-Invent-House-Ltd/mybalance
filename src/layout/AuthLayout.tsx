import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../assets/Icons/logo.svg";
import phoneImage from "../assets/images/R-phone.png";
import mphone from "../assets/images/m-phone.png";
import facebook from "../assets/Icons/Facebook.svg";
import twitter from "../assets/Icons/Twitter.svg";
import linkedin from "../assets/Icons/LinkedIn.svg";
import Instagram from "../assets/Icons/Instagram.svg";
import { useUser } from "../hooks/queries";
import LoadingLogo from "../components/reuseable/LoadingLogo";

const AuthLayout = () => {
  // const { data: user, isLoading } = useUser();
  // console.log("🚀 ~ file: AuthLayout.tsx:15 ~ AuthLayout ~ user:", user);
  // if (isLoading) {
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <LoadingLogo />
  //     </div>
  //   );
  // }
  // if (user) {
  //   return <Navigate to="/buyer/dashboard" />;
  // }
  if (localStorage.getItem("session_token")) {
    return <Navigate to="/buyer/dashboard" />;
  }
  return (
    <div className=" md:flex justify-center flex-row-reverse">
      {/* mobile header */}
      <header className="md:hidden ml-[5%] mb-4 mt-[5%] ">
        <Link to="/">
          <img src={logo} alt="my-balance" />
        </Link>
      </header>
      {/* mobile phone Image */}
      {/* <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%]  " /> */}
      {/* Desktop Image */}

      <img
        src={phoneImage}
        alt="Image of a phone"
        className="hidden md:flex w-[519px] object-cover min-h-screen"
      />

      <div className="md:w-[52%] lg:w-[65%]">
        {/* Desktop header */}
        <header className="hidden md:flex ml-[5%] mt-[5%]">
          <Link to="/">
            <img src={logo} alt="my-balance" />
          </Link>
        </header>

        <div className="  w-full max-w-[354px] px-5 sm:px-0 mx-auto my-6 ">
          <Outlet />
        </div>
        <footer className="px-[5%] w-fit mx-auto mb-7 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© 2022 MyBalance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com/mybalance_app" target="_blank">
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="" target="_blank">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="https://www.facebook.com/themybalanceapp" target="_blank">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/mybalance_app" target="_blank">
              <img src={Instagram} alt="Instagram" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
