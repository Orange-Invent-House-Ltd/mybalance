import React from "react";
import { useTabStore } from "../../store";
import { useNavigate } from "react-router-dom";

type quickprops = {
  icon: any;
  text: string;
  subtext: string;
  disabled?: boolean;
  tab: string;
};

const QuickBox = ({ icon, text, subtext, disabled, tab }: quickprops) => {
  const { setTab } = useTabStore();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        if (disabled) return;
        setTab(tab);
        navigate("/buyer/quick-action");
      }}
      disabled={disabled}
      className={`flex gap-y-2 disabled:cursor-not-allowed flex-col w-full justify-center relative overflow-hidden items-start md:items-center px-2 border rounded border-[#FECA9F]  h-[110px] ${tab}`}
    >
      {disabled && (
        <div className="w-full h-full absolute top-0 bg-white/50 left-0"></div>
      )}
      <img src={icon} alt="" className="w-[30px]" />
      <p className="text-base">{text}</p>
      <p className="md:hidden text-left text-[10px] font-normal">{subtext}</p>
    </button>
  );
};

export default QuickBox;
