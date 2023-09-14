import React from "react";
import emptyMoneyIcon from "../../assets/Icons/emptyMoneyIcon.svg";

const EmptyMoney = () => {
  return (
    <div className="shadow-md text-[#6D6D6D] rounded-md h-[400px] max-w-[600px] w-full flex flex-col  items-center justify-center">
      <img src={emptyMoneyIcon} className="mb-4" alt="" />
      <p className="text-lg mb-2 font-medium">No recent activity</p>
      <p>Oops! It seems that no transaction has been performed yet. </p>
    </div>
  );
};

export default EmptyMoney;
