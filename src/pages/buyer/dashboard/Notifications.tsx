import { useState } from 'react'
import Header from '../../../components/reuseable/Header'



const Notifications = () => {
  const[sidebar, setSidebar] = useState(false)

  const showSidebar =()=>{
    setSidebar(!sidebar)
  }

  return (
    <div>
      <Header
        Heading='Notifications'
        Text='Get instant notification as you perform real-time transaction immediately on MyBalance.'
      />
      <p className='text-[#121212] text-lg font-bold'>You have  1 unread notifications</p>
      <div className='mt-6'>
        {
          datas.map((data, key) =>(
            <div key={key} className='w-[325px] mt-4 pl-6 pb-4 rounded border-b border-[#E4E4E4]'>
              <p className='text-[#121212] text-lg font-medium'>{data.heading}</p>
              <p className='text-[#303030] text-sm font-normal'>{data.text}</p>
              <p className='text-[10px] text-[#B7B7B7] font-normal'>{data.date}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const datas =[
  {
    heading:"You have locked 10,000",
    text: "For Apple Series 2 ...",
    date: "Just now"
  },
  {
    heading:"You have locked 20,000",
    text: "For White pair of Air Jordans ...",
    date: "3 days ago"
  },
  {
    heading:"You have locked 30,000",
    text: "You have deposited 30,000 into your wallet",
    date: "10 days ago"
  }
]

export default Notifications