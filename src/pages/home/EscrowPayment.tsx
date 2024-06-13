import React from "react";
import shake from "../../assets/Icons/shake.svg";
import successIcon from "../../assets/Icons/celebrateIcon.svg";
import copyIcon from "../../assets/Icons/copyIcon.svg";
import emailIcon from "../../assets/Icons/copyEmailIcon.svg";
import whatsappIcon from "../../assets/Icons/copyWhatsappIcon.svg";
import { Link, useSearchParams } from "react-router-dom";
import formatToNairaCurrency from "../../util/formatNumber";
import { toast } from "react-toastify";
import {
  useEscrowPaymentRedirect,
  useTransactionUnauthorized,
} from "../../hooks/queries";
import LoadingLogo from "../../components/reuseable/LoadingLogo";
import TransactionFailed from "../../components/reuseable/TransactionFailed";

const EscrowPayment = () => {
  const userType = localStorage.getItem("userType")?.toUpperCase();

  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");

  const { data, isLoading, isError } = useEscrowPaymentRedirect({
    status,
    tx_ref,
    transaction_id,
  });
  const ref = searchParams.get("ref") || data?.data?.transactionReference;
  const { data: transactionData, isLoading: transactionLoading } =
    useTransactionUnauthorized(ref);
  // console.log(
  //   "🚀 ~ file: EscrowPayment.tsx:38 ~ EscrowPayment ~ transactionData:",
  //   transactionData
  // );
  const author = transactionData?.data?.escrowMetadata?.author;
  // console.log(
  //   "🚀 ~ file: EscrowPayment.tsx:41 ~ EscrowPayment ~ author:",
  //   author
  // );
  const amount = formatToNairaCurrency(
    searchParams.get("amt") || data?.data?.amount
  );

  const linkValue = `${
    import.meta.env.VITE_DOMAIN_URL
  }/share-escrow-link?ref=${ref}`;
  if (isLoading || transactionLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingLogo />
      </div>
    );
  }
  return (
    <>
      {isError ? (
        <TransactionFailed />
      ) : (
        <div className="flex flex-col-reverse md:flex-row w-screen h-screen">
          <div className="flex-[0.6] text-center md:text-left p-5 lg:p-0 flex items-center justify-center">
            <div className="max-w-lg">
              <img src={successIcon} className="mx-auto" alt="" />
              <h2 className="text-3xl md:text-5xl font-bold">
                {userType === "BUYER"
                  ? "Payment Successful!"
                  : "Share Escrow Link"}
              </h2>{" "}
              {userType === "BUYER" ? (
                author === "BUYER" ? (
                  <p className=" md:text-lg mt-2 text-center">
                    <strong>Great news! </strong>
                    Your recent transaction of <strong>{amount}</strong> has
                    been successfully processed. Feel free to share this with
                    your vendor
                  </p>
                ) : (
                  <p className=" md:text-lg mt-2 text-center">
                    <strong>Great news! </strong> Your recent transaction of{" "}
                    <strong>{amount}</strong> has been successfully processed
                    and locked.
                  </p>
                )
              ) : (
                <p className=" md:text-lg  mt-2">
                  you can share your one time escrow link to customer all over
                  social media
                </p>
              )}
              {userType === "BUYER" && author === "SELLER" ? (
                <Link
                  to="/buyer/dashboard"
                  className="py-[10px] px-[18px] block text-center mt-[16px] max-w-[325px] w-full mx-auto bg-[#039855] text-white text-lg font-medium rounded-lg "
                >
                  Return to dashboard
                </Link>
              ) : (
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
                      // href={`mailto:?subject=Check%20Out%20This%20Link&body=Here%20is%20the%20link:%20${
                      //   import.meta.env.VITE_DOMAIN_URL
                      // }/share-escrow-link?ref=${searchParams.get("ref")}`}
                      href={`mailto:?subject=Check%20Out%20This%20Escrow%20Transaction%20on%20mybalanceapp.com&body=Here%20is%20the%20transaction%20link:%20${linkValue}`}
                    >
                      <img src={emailIcon} className="mx-auto" alt="" />
                    </a>
                    <a
                      className="md:hidden"
                      href={`whatsapp://send?text=Check%20Out%20This%20Escrow%20Transaction%20Link:%20${linkValue}%20on%20mybalanceapp.com`}
                      // href={`whatsapp://send?text=${
                      //   import.meta.env.VITE_DOMAIN_URL
                      // }/share-escrow-link?ref=${searchParams.get("ref")}`}
                    >
                      <img src={whatsappIcon} className="mx-auto" alt="" />
                    </a>
                    <a
                      className="hidden md:block"
                      href={`https://web.whatsapp.com/send?text=Check%20Out%20This%20Escrow%20Transaction%20Link:%20${linkValue}%20on%20mybalanceapp.com`}
                      rel="nofollow noopener"
                      target="_blank"
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
              )}
            </div>
          </div>
          <div className="bg-[#9A4D0C] flex items-center justify-center flex-[0.4]">
            <img src={shake} className="w-full object-fit  " alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default EscrowPayment;
