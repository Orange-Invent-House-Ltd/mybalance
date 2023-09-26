import React from "react";

const DisputeCard = ({ reason, description, time, status }: any) => {
  return (
    <div className="shadow-lg rounded px-6 md:px-10 py-4 my-4 w-full max-w-[676px]">
      <div className={status === "RESOLVED" ? "text-[#B7B7B7]" : ""}>
        <div className="flex gap-2  items-center justify-between  ">
          <h1 className="text-lg font-medium">{reason}</h1>

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
        <div className="flex gap-2 items-center justify-between mt-[6px]">
          <h4 className="text-sm">{description}</h4>
          <h6 className=" text-[#B7B7B7]  text-xs ">
            {new Date(time).toLocaleString()}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DisputeCard;
