import Header from '../../../components/reuseable/Header'
import DashboardLockedBox from '../../../components/reuseable/DashboardLockedBox'
import DashboardQuickBox from '../../../components/reuseable/DashboardQuickBox'
import plus  from '../../../assets/Icons/plus.svg'
import lock from '../../../assets/Icons/lock.svg'
import unlock from '../../../assets/Icons/unlock.svg'
import download from '../../../assets/Icons/download.svg'
import DashboardHistoryBox from '../../../components/reuseable/DashboardHistoryBox'
import { Button } from "../../../components/reuseable/Button";
import {Link} from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='mb-16'>
      <Header
        Heading='Welcome Jamjam!'
        Text='Your last login was on 01/12/2022 10:00:34 AM'
      />
      <div className='flex flex-wrap gap-2 mt-16'>
        <div  className='border border-[#FECA9F] rounded w-[403px] h-[125px] p-6 '>
          <p className='mb-2 font-base font-normal leading-[21.6px]'>Available balance in escrow</p>
          <h4 className='font-bold text-[32px] leading-[43.2px]'>₦40,000.00</h4>
        </div>
        <DashboardLockedBox 
          Text='Locked amount'
          Amount= '₦30,000.00' 
        />
        <DashboardLockedBox 
          Text='Unlocked amount'
          Amount= '₦0.00'
        />
      </div>
      <h6 className='h6 mt-10 mb-6'>Quick actions</h6>
      <div className='flex flex-wrap mb-4'>
        <Link to='/register/verification' className='mr-4'>
          <DashboardQuickBox 
          icon ={plus}
          text='Deposit money'
          subtext='Tap on this to add money to your escrow wallet'
          />
        </Link>
        <DashboardQuickBox 
          icon ={lock}
          text='Lock money'
          subtext='Tap on this to lock your money in your wallet'
        />
        <DashboardQuickBox 
          icon ={unlock}
          text='Unlock money'
          subtext='Tap on this to release the money in your wallet'
        />
        <DashboardQuickBox 
          icon ={download}
          text='Withdraw money'
          subtext='Tap on this to release the money in your wallet'
        />
      </div>
      <h6 className='h6 mt-10'>Transaction history</h6>
      <DashboardHistoryBox 
        header='White Air Jordans'
        text='Pair of white Air Jordans from Young Jonn'
        price='₦20,000.00'
        subtext='Dec 11, 2022 3:00 PM'
      />
      <DashboardHistoryBox 
        header='Apple Series 2'
        text='Apple series 2 smartwatch ...'
        price='₦10,000.00'
        subtext='Dec 11, 2022 3:00 PM'
      />
      <div className='w-[343px]'><Button fullWidth variant="outlined">View all transactions</Button></div>
    </div>
  )
}

export default Dashboard