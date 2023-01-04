import React from 'react'

const DisputeCard = () => {
  return (
    <div className="shadow-lg rounded px-10 py-4 w-[676px]">
      <div className="flex items-center justify-between  ">
        <h1 className="text-lg font-medium">Fake pairs</h1>
        <div className="bg-[#ECFDF3] py-[2px] px-[8px] font-medium rounded-2xl  text-sm text-[#027A48] capitalize">
          resolved
        </div>
      </div>
      <div className="flex items-center justify-between mt-[6px]">
        <h4 className="text-sm">I wanted a red pair of bags not blue</h4>
        <h6 className=" text-[#B7B7B7]  text-xs ">Dec 15, 2022 4:56 PM</h6>
      </div>
    </div>
  );
}

export default DisputeCard