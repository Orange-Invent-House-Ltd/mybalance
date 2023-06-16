import { useState } from "react";
import { GenericResponse } from "../../api/types";
import { toast } from "react-toastify";
import { publicApi } from "../../api/axios";
import logo from "../../assets/Icons/logo.svg";
import mphone from "../../assets/images/m-phone.png";
import phone from "../../assets/images/R-phone.png";
import key from "../../assets/Icons/key.svg";
import useStore from "../../store";
import { Button } from "../../components/reuseable/Button";
import { Link } from "react-router-dom";

const ForgotPasswordVerification = () => {
  const store = useStore();
  const userEmail = store.authEmail;

  const resendForgotPasswordLink = async () => {
    try {
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "auth/forgot-password",
        {
          email: userEmail,
        }
      );
      store.setRequestLoading(false);
      //Form submition success notifications
      toast.success(response.data.message as string, {
        position: "top-right",
      });
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="md:flex justify-center flex-row-reverse">
      {/* mobile header */}
      <header className="md:hidden ml-[5%] mb-4 mt-[5%]">
        <Link to="/buyer/register">
          <img src={logo} alt="my-balance" />
        </Link>
      </header>
      <div className="md:w-[40%] lg:w-[30%]">
        <img src={phone} alt="" className="hidden md:flex" />
      </div>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%]" />
      {/* medium size header */}
      <div className="md:w-[60%] lg:w-[70%]">
        {/* Desktop header */}
        <header className="hidden md:flex ml-[5%] mt-[5%]">
          <Link to="/">
            <img src={logo} alt="my-balance" />
          </Link>
        </header>

        <div className="w-[365px] md::w-[376px] mt-16 mx-auto mb-10 md:mb-0 px-[5%]">
          <img src={key} alt="password" className="mx-auto" />
          <h6 className="mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]">
            Check your email
          </h6>
          <p className="mt-2 mb-8 text-[#6D6D6D] text-center text-base leading-5 font-normal">
            We sent a password reset link to{" "}
            <span className="font-bold">{userEmail}</span>
          </p>
          <a href="mailto:">
            <Button fullWidth>Open email app</Button>
          </a>
          <p className="mt-6 text-sm font-normal w-fit mx-auto">
            Didn’t receive the email?{" "}
            <span
              className="text-primary-normal cursor-pointer"
              onClick={() => resendForgotPasswordLink()}
            >
              Click to resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordVerification;
