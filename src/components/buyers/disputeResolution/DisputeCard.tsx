import React from "react";

const DisputeCard = ({ reason, description, time, status }: any) => {
  return (
    <div className="shadow-lg rounded px-10 py-4 w-[676px]">
      <div className={status === "RESOLVED" ? "text-[#B7B7B7]" : ""}>
        <div className="flex items-center justify-between  ">
          <h1 className="text-lg font-medium">{reason}</h1>
          <div className="bg-[#ECFDF3] py-[2px] px-[8px] font-medium rounded-2xl  text-sm text-[#027A48] capitalize">
            resolved
          </div>
          <div
            className={
              status == "PENDING" || "REJECTED"
                ? "status_style bg-[#FFF2F1] text-[#DA1E28]"
                : status == "RESOLVED"
                ? "status_style bg-[#ECFDF3]  text-[#027A48]"
                : "status_style bg-[#FFFCF2] text-[#FDB022] "
            }
          >
            <p className="capitalize">{status.toLowerCase()}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[6px]">
          <h4 className="text-sm">{description}</h4>
          <h6 className=" text-[#B7B7B7]  text-xs ">
            {new Date(time).toString()}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DisputeCard;
