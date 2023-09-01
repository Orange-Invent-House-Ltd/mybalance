type historyprops = {
  header: string;
  text: string;
  price: string;
  subtext: string;
  status: string;
};

const DashboardHistoryBox = ({ header, text, price, subtext, status }: historyprops) => {
  return (
    <div className="my-4 flex justify-between items-center gap-2 rounded border shadow-lg shadow-[#E4E4E4] border-white max-w-[676px]  px-[40px] py-[20px]">
      <div
        className={
          status === "SUCCESSFUL" || "FUFILLED" || "RESOLVED"
            ? "text-[#B7B7B7]"
            : ""
        }
      >
        <p className="text-lg font-medium">{header}</p>
        <p className="text-sm font-normal">{text}</p>
      </div>
      <div className={status == "SUCCESSFUL" ? "text-[#B7B7B7]" : ""}>
        <div
          className={
            status == "PENDING"
              ? "status_style bg-[#FFF2F1] text-[#DA1E28]"
              : status == "SUCCESSFUL" || "FUFILLED" || "RESOLVED"
              ? "status_style bg-[#ECFDF3]  text-[#027A48]"
              : "status_style bg-[#FFFCF2] text-[#FDB022] "
          }
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
