import { useState } from 'react'
import Header from '../../../components/reuseable/Header'
import { useNotifications, useUser } from '../../../hooks/queries'
import LoadingOverlay from '../../../components/reuseable/LoadingOverlay'
import { Circle } from 'lucide-react';
import Pagination from '../../../components/reuseable/Pagination';



const Notifications = () => {
  const [page, setPage] = useState<number>(1);
  const {data: notifications, isLoading: notificationsIsPending} = useNotifications({
    page,
    size: 10,
  })
  const {data: user, isLoading: userIsPending} = useUser()

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  return (
    <div>
      {notificationsIsPending && <LoadingOverlay/>}
      <Header
        Heading='Notifications'
        Text='Get instant notification as you perform real-time transaction immediately on MyBalance.'
      />
      <p className='text-[#121212] text-lg font-bold'>You have  {user?.unreadNotificationCount} unread notifications</p>
      <div className='mt-6'>
        {notifications?.data?.map((notification:any, key:any) =>{
          const dateTime = new Date(notification.createdAt);
          const dateFormatted = dateTime.toISOString().split('T')[0];
          const timeFormatted = dateTime.toTimeString().split(' ')[0];
          return(
            <div key={notification.id} className='flex gap-x-2 w-[325px] mt-4 pl-6 pb-4 rounded border-b border-[#E4E4E4]'>
              <Circle  fill={`${notification?.isSeen ? '#E4E4E4' : "#FD7E14" }`} color={`${notification?.isSeen ? '#E4E4E4' : "#FD7E14" }`}  size={10} className='mt-2'/>
              <div>
                <p className='text-[#121212] text-lg font-medium mb-2'>{notification.title}</p>
                <p className='text-[#303030] text-sm font-normal'>{notification.content.slice(0, 30)}...</p>
                <p className='text-[10px] text-[#B7B7B7] font-normal'>{dateFormatted} {timeFormatted}</p>
              </div>
            </div>
          )
        })}
        {!notificationsIsPending  && notifications?.data.length > 0 && (
          <div className='w-[325px] mt-[50px]'>
          <Pagination
            initialPage={notifications?.meta?.currentPage}
            onPageChange={handlePageChange}
            pageCount={notifications?.meta?.totalPages}
          />
          </div>
        )}
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