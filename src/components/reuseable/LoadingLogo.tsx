import React from "react";
import logo from "../../assets/Icons/logo.svg";

const LoadingLogo = () => {
  return (
    <div className="relative flex items-center w-[320px] justify-center ">
      <div className=" z-50  bg-primary-normal  w-24 h-24 flex items-center justify-center rounded-full">
        <img src={logo} className="" alt="MyBalance logo" />
      </div>
      <div className="animate-ping -z-10 absolute  w-20 h-20 bg-primary-normal rounded-full  "></div>
    </div>
  );
};

export default LoadingLogo;
