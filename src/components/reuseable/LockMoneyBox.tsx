import rightcaret from '../../assets/Icons/rightcaret.svg'
import { useState } from 'react'
import lockicon from "../../assets/Icons/lock.svg"



const LockMoneyBox = ({date, heading, text}:{date:any,heading:string,text:string}) => {

  return (
    
      
        <div  className='px-7 w-full py-3 rounded border shadow-lg shadow-[#E4E4E4] border-white mt-6'>
          <div className='flex items-center gap-3 cursor-pointer'>
            <img src={lockicon} alt="lock" className="w-[20px]"/>
            <p className='text-[10px] text-[#B7B7B7] font-normal'>{date}</p>
            <img src={rightcaret} alt="go" className='w-[15px] ml-auto' />
          </div>
          <div className="pl-8 mt-1 text-[#303030] cursor-pointer">
            <p className="text-lg font-medium">{heading}</p>
            <p className="mt-1">{text}</p>
          </div>
        </div>
      
    
  )
}


export default LockMoneyBox