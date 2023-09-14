import React from "react";
import shake from "../../assets/Icons/shake.svg";
import successIcon from "../../assets/Icons/celebrateIcon.svg";
import copyIcon from "../../assets/Icons/copyIcon.svg";
import emailIcon from "../../assets/Icons/copyEmailIcon.svg";
import whatsappIcon from "../../assets/Icons/copyWhatsappIcon.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import formatToNairaCurrency from "../../util/formatNumber";
import { toast } from "react-toastify";

const PaymentSucessfull = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const linkValue = `https://www.mybalanceapp.com/share-escrow-link?ref=${searchParams.get(
    "ref"
  )}`;

  return (
    <div className="flex flex-col-reverse md:flex-row w-screen h-screen">
      <div className="flex-[0.6] text-center md:text-left p-5 lg:p-0 flex items-center justify-center">
        <div className="max-w-lg">
          <img src={successIcon} className="mx-auto md:mx-0" alt="" />
          <h2 className="text-5xl font-bold">Payment Successful!</h2>
          <p className=" text-lg mt-2">
            <strong>Great news! </strong>
            Your recent transaction of{" "}
            <strong>
              {formatToNairaCurrency(searchParams.get("amt"))}
            </strong>{" "}
            has been successfully processed. Feel free to share this with your
            vendor.
          </p>
          <div className="shadow-md text-center  mt-9 rounded-md p-6">
            <p className=" font-medium  mb-4">Share to:</p>
            <div className=" flex rounded-full mb-10 overflow-hidden  bg-[#FFF2E8]">
              <input
                type="text"
                readOnly
                className="bg-transparent pl-5 flex-1  outline-none"
                name=""
                id=""
                value={linkValue}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(linkValue);
                  toast.success("link has been copied to clipboard");
                }}
                className="font-bold text-lg   px-5 py-3 rounded-full bg-[#FD7E14]"
              >
                Copy URL
              </button>
            </div>
            <div className="flex mx-auto w-fit  items-center mb-10 gap-10">
              <button className="">
                <img src={emailIcon} className="mx-auto" alt="" />
              </button>
              <a
                href={`whatsapp://send?text=https://www.mybalanceapp.com/share-escrow-link?ref=${searchParams.get(
                  "ref"
                )}`}
              >
                <img src={whatsappIcon} className="mx-auto" alt="" />
              </a>
            </div>
            <Link
              to="/buyer/dashboard"
              className="font-medium   text-lg text-primary-normal underline"
            >
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#9A4D0C] flex items-center justify-center flex-[0.4]">
        <img src={shake} className="w-full object-fit  " alt="" />
      </div>
    </div>
  );
};

export default PaymentSucessfull;
