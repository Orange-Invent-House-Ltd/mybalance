import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";
import useStore from "../../store";
import { Button } from "../../components/reuseable/Button";
import check from "../../assets/Icons/check.svg";
import { useResendOtp, useVerifyEmail } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import OtpInput from "../../components/reuseable/OtpInput";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const { mutate, isLoading, isSuccess } = useVerifyEmail();
  const { mutate:resendMutate, isLoading: resendLoading } = useResendOtp();
  const navigate = useNavigate();
  const tempId = localStorage.getItem("tempId");
  const email = localStorage.getItem("email");

  // tabs
  const [activeTab, setActiveTab] = useState(1);
  const userType = localStorage.getItem("userType")

  const verifyEmail = async (otp: string) => {
    console.log(
      "🚀 ~ file: EmailVerification.tsx:82 ~ verifyEmail ~ otp:",
      otp
    );
    // const stringOtp = otp.join("").toString();
    console.log(
      "🚀 ~ file: EmailVerification.tsx:87 ~ verifyEmail ~ stringOtp:",
      otp
    );
    if (otp.length < 6) return;
    mutate({ otp: otp, tempId: tempId! });
  };

  useEffect(()=>{
    userType === "seller" && setActiveTab(2)
  }, [])
  
  if (!tempId || !email) {
    return <Navigate to="/get-verification-link" />;
  }
  return (
    <div className="relative">
      {(isLoading || resendLoading) && <LoadingOverlay />}
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
                Create as a buyer
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
                  setActiveTab(2);
                }}
                data-toggle="tab"
                href="#link1"
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
                  className={activeTab === 1 ? "block" : "block"}
                  id="link1"
                >
                  <h6 className="h6">Check your email</h6>
                  <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
                    Hello We sent a verification link to {email}
                  </p>
                  <div className="grid gap-y-3.5">
                    <form>
                      <OtpInput value={otp} valueLength={6} onChange={(value: string) => setOtp(value)}/>
                      {/* otp input boxes */}
                      <Button
                        fullWidth
                        disabled = {otp.length === 6 ? false : true}
                        onClick={(e) => {
                          e.preventDefault();
                          verifyEmail(otp);
                        }}
                      >
                        Verify
                      </Button>
                      <p className="mt-4 text-[#121212]">
                        Didn’t receive the email?
                        <span
                          className="font-semibold cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            resendMutate({email:email!})
                          }}
                        >
                          {" "}
                          Click to resend
                        </span>
                      </p>
                    </form>
                  </div>
                  {isSuccess && (
                    <div className=" fixed top-0 left-0 backdrop-blur-md right-0 bottom-0 bg-black-rgba flex items-center justify-center z-1">
                      <div className="w-[400px] bg-white p-[24px] rounded-lg flex flex-col items-center">
                        <img className="mb-5 " src={check} alt="check" />
                        <h6 className="font-bold text-[23px] mb-2 ">
                          ACCOUNT CREATED! 👍🏾
                        </h6>
                        <p className="mb-5 text-center text-[#767676] text-base font-normal leading-[21.6px]">
                          Weldone! You have successfully created an account with
                          MyBalance. Let’s get you started.
                        </p>

                        <Button
                          disabled={false}
                          fullWidth={true}
                          onClick={() => {
                            userType === "seller" ? navigate('/seller/register/continue/identity')  : navigate("/login")
                          }}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal mb-7 w-fit mx-auto">
          Existing user?{" "}
          <Link to="/login" className="text-[#121212] font-bold">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
