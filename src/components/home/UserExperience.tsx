import React from 'react'
import cash from '../../assets/Icons/cash.svg'
import link from "../../assets/Icons/link.svg";
import card from "../../assets/Icons/card.svg";
import moneyPhone from "../../assets/Icons/moneyPhone.svg";
import line from "../../assets/Icons/line.svg";

const UserExperience = () => {
  return (
    <div className="bg-[#EDEDED] py-[50px] md:py-[100px] px-5">
      <div className="max-w-[552px] w-full mx-auto">
        <h1 className="md:text-center text-neutral-900 text-[23px] md:text-4xl font-bold mb-6">
          <span  className='relative' >
            Enhancing
            <img src={line} className='absolute -bottom-2 left-0' alt="" />
          </span>  Your User Experience
        </h1>
        <p className="hidden md:inline-block ">
          We offer various features to protect the financial interests of both buyers and sellers during transactions, ensuring satisfaction for all parties involved:
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
    subHeading:"You have the power to take charge of your transactions.",
  },
  {
    icon: link,
    heading: "Generate link",
    subHeading: "Share your unique transaction link on social media and other platforms.",
  },
  {
    icon: card,
    heading: "Multiple payment methods",
    subHeading: "Use debit cards or bank transfers for your transactions.",
  },
  {
    icon: moneyPhone,
    heading: "Multiple escrow transactions",
    subHeading: "You can create and disburse multiple transactions simultaneously.",
  },
];
export default UserExperience