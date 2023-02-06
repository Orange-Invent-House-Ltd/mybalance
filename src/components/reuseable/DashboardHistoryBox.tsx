import React from 'react'

type historyprops = {
  header: string
  text: string
  price: string
  subtext:string
  status:string
}

const HistoryBox = ({header, text, price, subtext, status}: historyprops) => {
  return (
    <div className='my-4 flex justify-between items-center gap-2 rounded border shadow shadow-[#E4E4E4] border-white max-w-[676px] h-[80px] px-6 py-4'>
      <div className={status == "Successful" ? 'text-[#B7B7B7]' : ""}>
        <p className='text-lg font-medium'>{header}</p>
        <p className='text-sm font-normal'>{text}</p>
      </div>
      <div className={status == "Successful" ? 'text-[#B7B7B7]' : "" }>
        <div className={status == "Pending" ? 'status_style bg-[#FFF2F1] text-[#DA1E28]' : status == "In progress" ? 'status_style bg-[#FFFCF2] text-[#FDB022]' : 'status_style bg-[#ECFDF3] text-[#027A48]'}>
          <p>{status}</p>
        </div>
        <p className='text-lg font-bold'>{price}</p>
        <p className='text-[#B7B7B7] text-[10px] font-normal text-right'>{subtext}</p>
      </div>
    </div>
  )
}

export default HistoryBox