import clsx from "clsx";

type historyprops = {
  header: string;
  text: string;
  price: string;
  subtext: string;
  status: string;
};

const DashboardHistoryBox = ({
  header,
  text,
  price,
  subtext,
  status,
}: historyprops) => {
  return (
    <div className="my-4 flex justify-between items-center gap-2 rounded border shadow-lg shadow-[#E4E4E4] border-white max-w-[676px]  px-[40px] py-[20px]">
      <div
        className={clsx("", {
          "text-[#B7B7B7]":
            status === "SUCCESSFUL" ||
            status === "FUFILLED" ||
            status === "APPROVED" ||
            status === "RESOLVED",
        })}
      >
        <p className="text-lg font-medium">{header}</p>
        <p className="text-sm font-normal">{text}</p>
      </div>
      <div
        className={clsx("", {
          "text-[#B7B7B7]":
            status === "SUCCESSFUL" ||
            status === "FUFILLED" ||
            status === "APPROVED" ||
            status === "RESOLVED",
        })}
      >
        <div
          className={clsx("status_style  ", {
            "bg-[#ECFDF3]  text-[#027A48]":
              status === "SUCCESSFUL" ||
              status === "FUFILLED" ||
              status === "APPROVED" ||
              status === "RESOLVED",
            " bg-[#FFF2F1] text-[#DA1E28]": status === "PENDING",
            " bg-[#EDEDED] text-[#373737]": status === "REJECTED",
            " bg-[#FFFCF2] text-[#FDB022]": status === "PENDING",
          })}
        >
          <p className="capitalize">{status.toLowerCase()}</p>
        </div>
        <p className="text-lg font-bold text-right">{price}</p>
        <p className="text-[#B7B7B7] text-[10px] font-normal text-right">
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default DashboardHistoryBox;
