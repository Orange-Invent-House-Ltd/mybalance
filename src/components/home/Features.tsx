import React from 'react'
import cash from '../../assets/icons/cash.svg'
import link from "../../assets/icons/link.svg";
import card from "../../assets/icons/card.svg";
import moneyPhone from "../../assets/icons/moneyPhone.svg";
import line from "../../assets/icons/line.svg";

const Features = () => {
  return (
    <div className="bg-[#EDEDED]  py-[76px] px-5 mb-[50px] ">
      <div className="max-w-[552px] w-full mx-auto">
        <h1 className=" font-black text-xl md:text-4xl text-[#121212] ">
          <span  className='relative' >
            Features
            <img src={line} className='absolute -bottom-1 left-0' alt="" />
          </span> That Enhance Your User Experience on MyBalance
        </h1>
        <p className=" mt-10 hidden md:inline-block ">
          We have varieties of features that help protect the financial interest
          of both buyers and sellers when making transactions to ensure all
          parties are satisfied and happy.
        </p>
      </div>
      <div className="grid max-w-7xl w-full mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 ">
        {data.map(({ heading, icon, subHeading }) => (
          <div className="bg-white rounded-lg border p-2 border-[#B7B7B7] ">
            <img src={icon} alt="" />
            <div className="space-y-2 mt-1 ">
              <p className="font-medium">{heading}</p>
              <p className="text-[#767676]">{subHeading}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const data = [
  {
    icon: cash,
    heading: "View, lock, unlock and withdraw money",
    subHeading:
      "The power is all in your hands to take charge of your transactions",
  },
  {
    icon: link,
    heading: "generate link",
    subHeading:
      "Send and share your unique transaction link to everyone on your social media ",
  },
  {
    icon: card,
    heading: "Multiple payment methods",
    subHeading: "Use your debit or make bank transfer for your transactions",
  },
  {
    icon: moneyPhone,
    heading: "Multiple escrow transactions",
    subHeading:
      "You can create and disburse more than one transaction at the same time",
  },
];
export default Features