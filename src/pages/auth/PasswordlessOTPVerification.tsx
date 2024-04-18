import React, { useState } from "react";
import { Button } from "../../components/reuseable/Button";
import OtpInput from "../../components/reuseable/OtpInput";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import { usePasswordlessOtpVerification, useResendOtp, useVerifyEmail } from "../../hooks/mutations";

const PasswordlessOTPVerification = () => {
  const [otp, setOtp] = useState("");
  const { mutate, isLoading, isSuccess } = usePasswordlessOtpVerification();
  const { mutate:resendMutate, isLoading: resendLoading } = useResendOtp();
  const tempId = localStorage.getItem("tempId");
  const email = localStorage.getItem("email");

  const passwordlessOTPVerification = async (otp: string) => {
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

  return (
    <div className="relative mb-20">
      {isLoading && <LoadingOverlay />}
      <h6 className="h6">Verify One-Time Login Code</h6>
      <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
        Hello We sent a verification link to {email}
      </p>
      <div className="grid gap-y-3.5">
        <form>
          <OtpInput
            value={otp}
            valueLength={6}
            onChange={(value: string) => setOtp(value)}
          />
          {/* otp input boxes */}
          <Button
            fullWidth
            disabled={otp.length === 6 ? false : true}
            onClick={(e) => {
              e.preventDefault();
              passwordlessOTPVerification(otp);
            }}
          >
            Verify
          </Button>
          {/* <p className="mt-4 text-[#121212]">
            Didn’t receive the email?
            <span
              className="font-semibold cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                resendMutate({ email: email! });
              }}
            >
              {" "}
              Click to resend
            </span>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default PasswordlessOTPVerification;
