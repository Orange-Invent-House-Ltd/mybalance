import React from 'react'

type lockprops = {
  Text: string;
  Amount: string;
}

const LockedBox = ({Text, Amount}:lockprops) => {
  return (
    <div  className='border border-[#FECA9F] rounded w-[260px] h-[125px] p-6 '>
      <p className='mb-2 font-base font-normal leading-[21.6px]'>{Text}</p>
      <h4 className='font-bold text-[32px] leading-[43.2px]'>{Amount}</h4>
    </div>
  )
}

export default LockedBox