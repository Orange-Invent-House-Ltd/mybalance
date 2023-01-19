import { useState } from "react"
import {Link} from 'react-router-dom'
import { Button } from "../../../components/reuseable/Button";
import Header from '../../../components/reuseable/Header'
import DashboardLockedBox from '../../../components/reuseable/DashboardLockedBox'
import DashboardQuickBox from '../../../components/reuseable/DashboardQuickBox'
import plus  from '../../../assets/Icons/plus.svg'
import lock from '../../../assets/Icons/lock.svg'
import unlock from '../../../assets/Icons/unlock.svg'
import download from '../../../assets/Icons/download.svg'
import DashboardHistoryBox from '../../../components/reuseable/DashboardHistoryBox'


const Dashboard = () => {
  return (
    <div className='mb-16'>
      <Header
        Heading='Welcome Jamjam!'
        Text='Your last login was on 01/12/2022 10:00:34 AM'
      />
      <div className='flex flex-wrap gap-3 mt-16'>
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
      <div className="md:flex justify-between flex-row-reverse">
        <div>
          {/* Right side box - Charges box */}
          <div className="border border-#B7B7B7 max-w-[297px] rounded-[10px] mt-8 px-4 py-6">
            <h6 className="h6 text-[#6D6D6D] mb-2">Our charges</h6>
            <p>
              We offer very user friendly charges which are range-based.
              The higher the transaction, the lower the charge percentage.
            </p>
            <div className="flex justify-between mt-8 text-[14px]">
              <div className="flex flex-col gap-2">
                <p className="text-[#6D6D6D] text-[16px]">Range</p>
                <p>Below N100,000</p>
                <p>N100,000 - N500,000</p>
                <p>Above N500,000</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#6D6D6D] text-[16px]" >Charges</p>
                <p>1.5% per party</p>
                <p>1% per party</p>
                <p>0.8% per party</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h6 className='h6 mt-10 mb-6 text-[#6D6D6D]'>Quick actions</h6>
          <div className='flex flex-wrap mb-4'>
            <Link to='/buyer/quick-action' className='mb-4 mr-4'>
              <DashboardQuickBox 
              icon ={plus}
              text='Deposit money'
              subtext='Tap on this to add money to your escrow wallet'
              />
            </Link>
            <Link to='/buyer/quick-action' className='mr-4'>
              <DashboardQuickBox 
                icon ={lock}
                text='Lock money'
                subtext='Tap on this to lock your money in your wallet'
              />
            </Link>
            <Link to='/buyer/quick-action' className='mr-4'>
              <DashboardQuickBox 
                icon ={unlock}
                text='Unlock money'
                subtext='Tap on this to release the money in your wallet'
              />
            </Link>
            <Link to='/buyer/quick-action'>
              <DashboardQuickBox 
                icon ={download}
                text='Withdraw money'
                subtext='Tap on this to release the money in your wallet'
              />
            </Link>
          </div>
          <h6 className='h6 mt-10 text-[#6D6D6D]'>Transaction history</h6>
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
          <div className='w-[343px]'>
            <Link to='/buyer/transaction-history'>
              <Button fullWidth variant="outlined">View all transactions</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard