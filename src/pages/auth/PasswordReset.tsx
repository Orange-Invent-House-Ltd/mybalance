import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Icons/logo.svg";
import mphone from "../../assets/images/m-phone.png";
import phone from "../../assets/images/R-phone.png";
import check from "../../assets/Icons/check.svg";
import { Button } from "../../components/reuseable/Button";

const PasswordReset = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <img src={check} alt="password" className="mx-auto" />
      <h6 className="mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]">
        Password reset
      </h6>
      <p className="mt-6 mb-8 text-center text-[#3A3A3A] text-[18px] leading-5 font-normal">
        Your password has been successfully reset. Click button below to
        continue.
      </p>
      <Button fullWidth onClick={() => navigate("/login")}>
        Continue
      </Button>
    </div>
  );
};

export default PasswordReset;
