import {useState, useEffect} from "react"
import useStore from '../../../store'
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { Button } from "../../../components/reuseable/Button";
import { IUserResponse } from "../../../api/types";
import DashboardLockedBox from '../../../components/reuseable/DashboardLockedBox'
import DashboardQuickBox from '../../../components/reuseable/DashboardQuickBox'
import plus  from '../../../assets/Icons/plus.svg'
import share from '../../../assets/Icons/share.svg'
import unlock from '../../../assets/Icons/unlock.svg'
import download from '../../../assets/Icons/download.svg'
import bell from "../../../assets/Icons/notification.svg"
import DashboardHistoryBox from '../../../components/reuseable/DashboardHistoryBox'
import TextField from "../../../components/reuseable/TextField1";
import back from "../../../assets/Icons/back.svg"



const Dashboard = () => {
  const [isVerify, setIsVerify] = useState(false);
  const [value, setValue] = useState("");
  const store = useStore();
  const navigate = useNavigate();
  const user = store.authUser;
  const profile = store.userProfile

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const getUser = async () => {
    try {
      store.setRequestLoading(true);
      const response = await authApi.get<IUserResponse>(
        "/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${store.authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      store.setRequestLoading(false);
      store.setUserProfile(response.data?.data);
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        toastId: 'error1',
        position: "top-right",
      });
      // navigate('/login')
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='mb-16'>
      <div className="md:flex justify-between items-center mb-8">
        <div>
          <h6 className='h6'>Welcome {user?.name}</h6>
          <p className='max-w-[478px] text-[#303030] font-normal text-sm leading-[18.9px] '>
            Your last login was on {profile?.lastLoginDate}
          </p>
        </div>
        <img src={bell} alt="notification bell" className="hidden md:flex ml-auto mr-4"/>
        <div className="hidden md:flex w-[343px] md:w-[270px]">
          <Button fullWidth variant="contained" onClick={() => setIsVerify(true)}>Create MyBalance Link</Button>
        </div>
        {isVerify && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
          <div className= "w-[400px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
            <div className="flex gap-4 items-center mt-10 mb-4">
              <img src={back} alt="back" onClick={() => setIsVerify(false)}/>
              <h6 className="text-[23px] font-medium">Create MyBalance Link</h6>
            </div>
            <p className="text-[16px] text-[#303030] font-normal mb-8">Create your MyBalance escrow information and share with everyone.</p>
            <h1 className="text-[#EDEDED] text-lg font-medium">
              ITEM(S) INFORMATION
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <TextField label="Purpose of escrow" placeholder="e.g 20,000" />
              <TextField
                label="Type of item(s)"
                placeholder="****"
              />
              <TextField
                label="Number of item(s)"
                placeholder="give a description"
              />
              <TextField
                label="Amount"
                placeholder="give a description"
              />
              <TextField
                label="Delivery timeline"
                placeholder="Select number of days"
              />
            </div>
            <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
              VENDOR ACCOUNT INFORMATION
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <TextField label="Bank Name" placeholder="Access Bank" />
              <TextField label="Enter Account number" placeholder="1234567890"/>
              <TextField label="Account Name" placeholder="e.g JMusty Feet"/>
              <TextField label="Email Address" placeholder="e.g JMustyfeet@gmail.com"
                value={value}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6 mb-16">
              <Button
                disabled={value ? false : true}
                fullWidth
                onClick={() => setIsVerify(false)}
              >
                Share escrow link
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
      
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
      {/* Create MyBalance link - mobile view */}
      <div className="md:hidden mt-4 p-2 flex justify-between items-center border border-[#FFF2E8]">
        <p className="font-semibold text-sm">Create your MyBalance link.</p>
        <Button onClick={() => setIsVerify(true)}>Create link</Button>
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
                icon ={unlock}
                text='Unlock money'
                subtext='Tap on this to release the money in your wallet'
              />
            </Link>
            <Link to='/buyer/quick-action' className='mb-4 mr-4'>
              <DashboardQuickBox 
                icon ={download}
                text='Withdraw money'
                subtext='Tap on this to release the money in your wallet'
              />
            </Link>
            <Link to='/buyer/quick-action'>
              <DashboardQuickBox 
                icon ={share}
                text='Share link'
                subtext='Tap on this to lock your money in your wallet'
              />
            </Link>
          </div>
          <h6 className='h6 mt-10 text-[#6D6D6D]'>Transaction history</h6>
          <DashboardHistoryBox 
            header='White Air Jordans'
            text='Pair of white Air Jordans from Young Jonn'
            status="In progress"
            price='₦20,000.00'
            subtext='Dec 11, 2022 3:00 PM'
          />
          <DashboardHistoryBox 
            header='Apple Series 2'
            text='Apple series 2 smartwatch ...'
            status="Pending"
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