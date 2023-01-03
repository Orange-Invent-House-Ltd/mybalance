import React from 'react'

type historyprops = {
  header: string
  text: string
  price: string
  subtext:string
}

const HistoryBox = ({header, text, price, subtext}: historyprops) => {
  return (
    <div className='my-4 flex justify-between items-center rounded border shadow shadow-[#E4E4E4] border-white w-[676px] h-[80px] px-8 py-4'>
      <div>
        <p className='text-lg font-medium'>{header}</p>
        <p className='text-sm font-normal'>{text}</p>
      </div>
      <div>
        <p className='text-lg font-bold'>{price}</p>
        <p className='text-[#B7B7B7] text-[10px] font-normal'>{subtext}</p>
      </div>
    </div>
  )
}

export default HistoryBox