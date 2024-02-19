import React from 'react'

type HeroProps = {
  menu: string;
  text:string;
};

const HeroSection = ({menu, text}:HeroProps) => {
  return (
    <div className='px-[7%] h-[400px] md:h-[700px] flex flex-col justify-center items-center bg-primary-normal text-white'>
      <p className='text-base font-medium text-[#373737] mb-6'>
        <a href="/" className='underline text-black '>Home</a> | {menu}
      </p>
      <h3 className='max-w-[725px] text-center text-[29px] md:text-[36px] font-bold'>
        {text}
      </h3>
    </div>
  )
}

export default HeroSection