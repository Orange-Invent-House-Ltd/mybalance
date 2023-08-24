import React from "react";
import shake from "../../assets/Icons/shake.svg";
import successIcon from "../../assets/Icons/celebrateIcon.svg";
import { Link, useSearchParams } from "react-router-dom";
import formatToNairaCurrency from "../../util/formatNumber";
import { toast } from "react-toastify";

const PaymentSucessfull = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex w-screen h-screen">
      <div className="flex-[0.6] flex items-center justify-center">
        <div className="max-w-lg">
          <img src={successIcon} alt="" />
          <h2 className="text-5xl font-bold">Payment Successful!</h2>
          <p className="font-medium text-lg">
            Great news! Your recent transaction of{" "}
            <strong>{formatToNairaCurrency(searchParams.get("amt"))}</strong>{" "}
            has been successfully processed. Feel free to share this with your
            vendor.
          </p>
          <div className="flex mt-8  gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`http://127.0.0.1:5173/share-escrow-link?ref=${searchParams.get("ref")!!}`);
                 toast.success("link has been copied to clipboard");
              }}
              className="py-2.5 text-center border w-full border-[#E7E7E7] px-[18px] rounded-md "
            >
              Share link
            </button>
            <Link
              to="/buyer/dashboard"
              className="bg-[#039855] text-center w-full text-white py-2.5 px-[18px] rounded-md"
            >
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#9A4D0C] flex items-center justify-center flex-[0.4]">
        <img src={shake} className="w-full object-contain  " alt="" />
      </div>
    </div>
  );
};

export default PaymentSucessfull;
