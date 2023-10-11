import React from "react";
import { useNavigate } from "react-router-dom";
import notS from "../../assets/Icons/notS.svg";
const TransactionFailed = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className=" w-[400px] h-[323px] p-6 bg-white rounded-xl shadow flex-col justify-start items-center gap-8 inline-flex">
        <div className="Content self-stretch h-[199px] p-[0px] flex-col justify-start items-start gap-[20px] flex">
          <div className="Content self-stretch h-[199px] p-[0px] flex-col justify-start items-center gap-4 flex">
            <img className="Icons8Error641 w-16 h-16" src={notS} />
            <div className="TextAndSupportingText self-stretch h-[119px] p-[0px] flex-col justify-start items-center gap-2 flex">
              <div className="Text self-stretch text-center text-red-600 text-[29px] font-medium">
                Payment Failed!
              </div>
              <button className="SupportingText self-stretch text-center text-zinc-800 text-[16px] font-normal leading-normal">
                Unfortunately, your payment was not successful! Click the button
                below to return to MyBalance dashboard.
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
    </div>
  );
};

export default TransactionFailed;
