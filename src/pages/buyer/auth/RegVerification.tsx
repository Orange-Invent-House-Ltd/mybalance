import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useEffect, useRef, useState } from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicApi } from "../../../api/axios";
import { GenericResponse } from "../../../api/types";
import useStore from "../../../store";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "../../../components/reuseable/Button";
import { LoadingButton } from "../../../components/reuseable/LoadingButton";
import logo from "../../../assets/Icons/logo.svg";
import mphone from "../../../assets/images/m-phone.png";
import phone from "../../../assets/images/R-phone.png";
import check from "../../../assets/Icons/check.svg";
import facebook from "../../../assets/Icons/Facebook.svg";
import twitter from "../../../assets/Icons/Twitter.svg";
import linkedin from "../../../assets/Icons/LinkedIn.svg";
import Instagram from "../../../assets/Icons/Instagram.svg";

// otp index
let currentOTPIndex: number = 0;

const RegVerification = () => {
  const store = useStore();
  const navigate = useNavigate();
  const { verificationCode } = useParams();

  // otp state
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

  // tabs
  const [activeTab, setActiveTab] = useState(1);

  const [isVerify, setIsVerify] = useState(false);

  // otp continue
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    // the spread operator help to get all the input value
    const newOTP = [...otp];
    // get the last value of the input
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    // moke the focus to the next box on each change
    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);
    // all the input values
    setOtp(newOTP);
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    // input box focus
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  // useEffect(() => {
  //   if (verificationCode) {
  //     const otpCode = verificationCode.split('')
  //     setOtp(otpCode);
  //   }
  // }, []);

  const verifyEmail = async (otp: string[]) => {
    const stringOtp = otp.join("").toString();
    console.log(stringOtp);
    try {
      store.setRequestLoading(true);
      const response = await publicApi.post<GenericResponse>(
        `auth/verify-account`,
        {
          otp: stringOtp,
        }
      );
      store.setRequestLoading(false);
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      navigate("/login");
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const userEmail = store.authEmail;
  return (
    <div className="md:flex justify-center flex-row-reverse">
      {/* mobile header */}
      <header className="md:hidden ml-[5%] mb-4 mt-[5%]">
        <Link to="/">
          <img src={logo} alt="my-balance" />
        </Link>
      </header>
      {/* Desktop Image */}
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

        <div className="w-[365px] md:w-[376px] my-8 mx-auto">
          {/* tabs */}
          <div className="flex flex-wrap px-[3%]">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                {/* customer tab */}
                <li className="-mb-px last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase py-3 block leading-normal " +
                      (activeTab === 1
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Create as a customer
                  </a>
                </li>
                {/* seller tab */}
                <li className="-mb-px last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase py-3  block leading-normal " +
                      (activeTab === 2
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Create as a seller
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
                <div className="mx-auto py-5 flex-auto">
                  <div className="tab-content tab-space">
                    {/* create account as customer */}
                    <div
                      className={activeTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <h6 className="h6">Check your email</h6>
                      <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
                        We sent a verification link to {userEmail}
                      </p>
                      <div className="grid gap-y-3.5">
                        <form>
                          {/* otp input boxes */}
                          <div className=" mb-6 flex justify-start items-center space-x-2">
                            {otp.map((_, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <input
                                    // make the input box focus start from the first one
                                    ref={
                                      index === activeOTPIndex ? inputRef : null
                                    }
                                    type="number"
                                    placeholder=""
                                    value={otp[index]}
                                    onChange={handleChange}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-[50px] h-[50px] rounded bg-transparent text-center font-semibold text-xl spin-button-none outline-none border border-[#cccccc] focus:border-gray-700 text-primary transition"
                                  />
                                </React.Fragment>
                              );
                            })}
                          </div>
                          <LoadingButton
                            loading={store.requestLoading}
                            fullWidth
                            disabled={otp.length === 6 ? false : true}
                            onClick={(e) => {
                              e.preventDefault();
                              verifyEmail(otp);
                            }}
                          >
                            Verify
                          </LoadingButton>
                        </form>
                      </div>

                      <AlertDialog.Root open={isVerify}>
                        <AlertDialog.Portal>
                          <AlertDialog.Overlay className="bg-[#3a3a3a]/50  backdrop-blur-md fixed inset-0" />
                          <AlertDialog.Content className="animate-jump   fixed top-0 left-0 z-50 w-full h-full  ">
                            <div className="w-[400px] bg-white p-[20px] rounded-[5px] flex flex-col items-center">
                              <img
                                className="p-4 bg-[#ECFDF3] rounded-[50%]"
                                src={check}
                                alt="check"
                              />
                              <h6 className="h6">ACCOUNT CREATED! 👍🏾</h6>
                              <p className="mt-4 text-center text-base font-normal leading-[21.6px]">
                                Weldone! You have successfully created an
                                account with MyBalance. Let’s get you started.
                              </p>
                              <div className=" mt-4 w-[300px]">
                                <Link to="/buyer/dashboard">
                                  <Button
                                    disabled={false}
                                    fullWidth={true}
                                    onClick={() => setIsVerify(false)}
                                  >
                                    Continue
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </AlertDialog.Content>
                        </AlertDialog.Portal>
                      </AlertDialog.Root>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm font-normal mb-7 w-fit mx-auto">
              Existing user?{" "}
              <a href="/buyer/login" className="text-[#121212] font-bold">
                Log in here
              </a>
            </p>
          </div>
        </div>
        <div className="px-[5%] w-fit mx-auto mb-16 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
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
        </div>
      </div>
    </div>
  );
};

export default RegVerification;
