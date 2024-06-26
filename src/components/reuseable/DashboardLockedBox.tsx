import React from "react";

type lockprops = {
  Text: string;
  AmountInNaira: string;
  AmountInDollars: string;
};

const LockedBox = ({ Text, AmountInNaira, AmountInDollars }: lockprops) => {
  return (
    <div className="border flex-[0.3] border-[#FFF2E8] relative overflow-hidden rounded min-w-[270px] w-full h-[125px] p-6">
      <div className="w-[163px] h-[163px]  bg-[#FFF2E8]  rounded-full  top-[-19px] left-[-96px] z-[-10] absolute "></div>
      <p className="mb-2 font-base font-normal leading-[21.6px]">{Text}</p>
      {/* <h4 className="font-bold text-[32px] leading-[43.2px]">
        {AmountInDollars}
      </h4> */}
      <h4 className="font-bold text-[32px] leading-[43.2px]">
        {AmountInNaira}
      </h4>
    </div>
  );
};

export default LockedBox;
