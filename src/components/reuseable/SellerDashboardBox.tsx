import React from "react";

type lockprops = {
  Text: string;
  AmountInDollars: string;
  AmountInNaira: string;
  loadWallets: boolean;
};

const LockedBox = ({
  Text,
  AmountInNaira,
  AmountInDollars,
  loadWallets,
}: lockprops) => {
  return (
    <div className="border balance border-[#FECA9F] rounded min-w-[300px]  md:min-w-[300px]  h-[125px] p-2 sm:p-6 ">
      <p className="mb-2 font-base font-normal leading-[21.6px]">{Text}</p>

      {/* <h4 className="font-bold text-[23px] sm:text-[32px] leading-[43.2px]">
        {AmountInDollars}
      </h4> */}
      <h4 className="font-bold text-[23px] sm:text-[32px] leading-[43.2px]">
        {AmountInNaira}
      </h4>
    </div>
  );
};

export default LockedBox;
