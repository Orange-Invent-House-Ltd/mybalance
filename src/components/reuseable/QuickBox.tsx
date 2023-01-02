import React from 'react'

type quickprops = {
  icon:any;
  text: string;
  subtext: string
}

const QuickBox = ({icon, text, subtext}:quickprops) => {
  return (
    <div className='flex flex-col justify-center items-center mr-4 px-2 last:mr-0 border rounded border-[#B1580E] w-[154px] h-[100px]'>
      <img src={icon} alt="" className='w-[30px]'/>
      <p className='text-base'>{text}</p>
      <p className='md:hidden text-center text-[10px] font-normal'>{subtext}</p>
    </div>
  )
}

export default QuickBox