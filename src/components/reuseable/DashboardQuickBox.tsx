import React from "react";

type quickprops = {
  icon: any;
  text: string;
  subtext: string;
  disabled?: boolean;
};

const QuickBox = ({ icon, text, subtext, disabled }: quickprops) => {
  return (
    <button disabled={disabled} className="flex gap-y-2 flex-col justify-center relative overflow-hidden items-start md:items-center px-2 border rounded border-[#FECA9F] w-[154px] h-[110px]">
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
