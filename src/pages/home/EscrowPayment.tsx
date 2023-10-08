import React from "react";
import shake from "../../assets/Icons/shake.svg";
import successIcon from "../../assets/Icons/celebrateIcon.svg";
import copyIcon from "../../assets/Icons/copyIcon.svg";
import emailIcon from "../../assets/Icons/copyEmailIcon.svg";
import whatsappIcon from "../../assets/Icons/copyWhatsappIcon.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import formatToNairaCurrency from "../../util/formatNumber";
import { toast } from "react-toastify";
import { useEscrowPaymentRedirect, useUser } from "../../hooks/queries";
import LoadingLogo from "../../components/reuseable/LoadingLogo";

const EscrowPayment = () => {
  const [searchParams] = useSearchParams();
  const { data: user, isLoading: userLoading } = useUser();

  const status = searchParams.get("status");
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");

  const { data, isLoading } = useEscrowPaymentRedirect({
    status,
    tx_ref,
    transaction_id,
  });
  console.log(
    "🚀 ~ file: EscrowPayment.tsx:27 ~ EscrowPayment ~ data:",
    data
  );
  const ref = searchParams.get("ref") || data?.data?.transactionReference;
  const amount = formatToNairaCurrency(
    searchParams.get("amt") || formatToNairaCurrency(data?.data?.amount)
  );

  const linkValue = `https://www.mybalanceapp.com/share-escrow-link?ref=${ref}`;
  if (isLoading || userLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingLogo />
      </div>
    );
  }
  return (
    <div className="flex flex-col-reverse md:flex-row w-screen h-screen">
      <div className="flex-[0.6] text-center md:text-left p-5 lg:p-0 flex items-center justify-center">
        <div className="max-w-lg">
          <img src={successIcon} className="mx-auto" alt="" />
          <h2 className="text-3xl md:text-5xl font-bold">
            {user?.userType === "BUYER"
              ? "Payment Successful!"
              : "Share Escrow Link"}
          </h2>{" "}
          {user?.userType === "BUYER" ? (
            <p className=" md:text-lg mt-2">
              <strong>Great news! </strong>
              Your recent transaction of <strong>{amount}</strong> has been
              successfully processed. Feel free to share this with your vendor
            </p>
          ) : (
            <p className=" md:text-lg  mt-2">
              you can share your one time escrow link to customer all over
              social media
            </p>
          )}
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
                className="font-bold  md:text-lg whitespace-nowrap   px-3 py-2 md:px-5 md:py-3 rounded-full bg-[#FD7E14]"
              >
                Copy URL
              </button>
            </div>
            <div className="flex mx-auto w-fit  items-center mb-10 gap-10">
              <a
                href={`mailto:?subject=Check%20Out%20This%20Link&body=Here%20is%20the%20link:%20https://www.mybalanceapp.com/share-escrow-link?ref=${searchParams.get(
                  "ref"
                )}`}
                className=""
              >
                <img src={emailIcon} className="mx-auto" alt="" />
              </a>
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

export default EscrowPayment;
