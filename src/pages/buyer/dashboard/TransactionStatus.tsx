import React, { useEffect, useState } from "react";
import successIcon from "../../../assets/Icons/celebrateIcon.svg";
import notS from "../../../assets/Icons/notS.svg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { usePaymentRedirect } from "../../../hooks/queries";
import LoadingLogo from "../../../components/reuseable/LoadingLogo";
const Transtatus = () => {
  const [failed] = useState(false);
  const [searchParams] = useSearchParams();
  console.log(
    "🚀 ~ file: Transtatus.tsx:11 ~ Transtatus ~ searchParams:",
    searchParams
  );
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");
  const { data, isLoading } = usePaymentRedirect({
    status,
    tx_ref,
    transaction_id,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  });
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingLogo />
      </div>
    );
  }
 

  return (
    <div className="flex items-center justify-center h-screen ">
      {data?.success === true ? (
        <div>
          <div className="w-[400px] h-[359px] p-6 bg-white rounded-xl shadow flex-col justify-start items-center gap-8 inline-flex">
            <div className="self-stretch h-[235px] p-[0px] flex-col justify-start items-start gap-[20px] flex">
              <div className="self-stretch h-[235px] p-[0px] flex-col justify-start items-center gap-4 flex">
                <img className="w-[100px] h-[100px]" src={successIcon} />
                <div className="self-stretch h-[119px] p-[0px] flex-col justify-start items-center gap-2 flex">
                  <div className="self-stretch text-center text-neutral-900 text-[29px] font-medium">
                    Payment Successful!
                  </div>
                  <div className="self-stretch text-center text-zinc-800 text-[16px] font-normal leading-normal">
                    Your payment was transacted successfully! Click the button
                    below to return to MyBalance dashboard.
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => navigate("/buyer/dashboard")}
              className="p-[0px] flex-col justify-start items-start gap-[12px] flex"
            >
              <div className="w-[352px] p-[0px] justify-start items-start gap-[12px] inline-flex">
                <div className="grow shrink basis-0 h-[44px] p-[0px] rounded-lg justify-start items-start flex">
                  <div className="grow shrink basis-0 h-[44px] px-[18px] py-[10px] bg-emerald-600 rounded-lg shadow border border border border border-emerald-600 justify-center items-center gap-2 flex">
                    <Link
                      to="/buyer/dashboard"
                      className="text-white text-[18px] font-medium"
                    >
                      Return to dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-[400px] h-[323px] p-6 bg-white rounded-xl shadow flex-col justify-start items-center gap-8 inline-flex">
          <div className="Content self-stretch h-[199px] p-[0px] flex-col justify-start items-start gap-[20px] flex">
            <div className="Content self-stretch h-[199px] p-[0px] flex-col justify-start items-center gap-4 flex">
              <img className="Icons8Error641 w-16 h-16" src={notS} />
              <div className="TextAndSupportingText self-stretch h-[119px] p-[0px] flex-col justify-start items-center gap-2 flex">
                <div className="Text self-stretch text-center text-red-600 text-[29px] font-medium">
                  Payment Failed!
                </div>
                <button className="SupportingText self-stretch text-center text-zinc-800 text-[16px] font-normal leading-normal">
                  Unfortunately, your payment was not successful! Click the
                  button below to return to MyBalance dashboard.
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/buyer/dashboard")}
            className="Frame34643 p-[0px] flex-col justify-start items-start gap-[12px] flex"
          >
            <div className=" w-[352px] p-[0px] justify-start items-start gap-[12px] inline-flex">
              <div className="Button grow shrink basis-0 h-[44px] p-[0px] rounded-lg justify-start items-start flex">
                <div className="ButtonBase grow shrink basis-0 h-[44px] px-[18px] py-[10px] bg-red-600 rounded-lg shadow  border-red-600 justify-center items-center gap-2 flex">
                  <div className="Text text-white text-[18px] font-medium">
                    Return to dashboard
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Transtatus;
