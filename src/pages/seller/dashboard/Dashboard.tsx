import {Link} from 'react-router-dom'
import { Button } from "../../../components/reuseable/Button";
import SellerHeader from '../../../components/reuseable/SellerHeader'
import SellerDashboardBox from '../../../components/reuseable/SellerDashboardBox'
import DashboardHistoryBox from '../../../components/reuseable/DashboardHistoryBox'


const Dashboard = () => {
  return (
    <div className='mb-16'>
      <SellerHeader
        Heading='Welcome TMusty!'
        Text='Your last login was on 01/12/2022 10:00:34 AM'
      />
      <div className='flex justify-center gap-2 mt-16 max-w-[710px]'>
        <SellerDashboardBox 
          Text='Total amount withdrawn'
          Amount= '₦40,000.00' 
        />
        <SellerDashboardBox 
          Text='Total amount in escrow'
          Amount= '₦30,000.00'
        />
      </div>
      <div className="flex flex-col items-center md:flex-row justify-center gap-8 mt-8 max-w-[710px]">
        <button className="bg-[#9A4D0C] w-[332px] md:w-[220px] text-white rounded-[30px] px-[16px] py-[12px]">Share my escrow link</button>
        <button className="border border-[#9A4D0C] w-[332px] md:w-[220px] text-[#9A4D0C] rounded-[30px] px-[16px] py-[12px]">Raise a dispute</button>
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
        price='₦20,000.00'
        subtext='Dec 11, 2022 3:00 PM'
      />
      <div className='w-[343px]'><Link to='/seller/transaction-history'><Button fullWidth variant="outlined">View all transactions</Button></Link></div>
    </div>
  )
}

export default Dashboard