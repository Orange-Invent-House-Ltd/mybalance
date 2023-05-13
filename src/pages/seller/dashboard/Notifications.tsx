import { useState } from 'react'
import Header from '../../../components/reuseable/Header'
import { Button } from '../../../components/reuseable/Button';
import TextField from '../../../components/reuseable/TextField1';
import back from "../../../assets/Icons/back.svg"
import RejectModal from '../../../components/sellers/RejectModal';
import { data } from '../../../util/data';



const Notifications = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState("");
  const [isReject, setIsReject] = useState(false)

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

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
            <div key={key} className='w-[325px] mt-4 pl-6 pb-4 rounded border-b border-[#E4E4E4] cursor-pointer'
              onClick={() => setIsClicked(true)}
            >
              <p className='text-[#121212] text-lg font-medium'>{data.name} has {data.action}</p>
              <p className='text-[#303030] text-sm font-normal'>{data.text}</p>
              <p className='text-[10px] text-[#B7B7B7] font-normal'>{data.date}</p>
            </div>
          ))
        }
      </div>
      {isClicked && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
          <div className= "w-[400px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
            <div className="flex gap-4 items-center mt-10 mb-4">
              <img src={back} alt="back" onClick={() => setIsClicked(false)}/>
              <h6 className="h6">Abiodun Has Just Locked ₦10,000</h6>
            </div>
            <h1 className="text-[#EDEDED] text-lg font-medium">
              SENDER ADDITIONAL INFORMATION
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <TextField label="Amount locked" value={datas[0].amount} />
              <TextField
                label="Reason for locking (description)"
                value="Purchase of apple series 2"
              />
              <TextField
                label="Timeline"
                value="3 days"
              />
            </div>
            <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
              RECEIVER ACCOUNT INFORMATION
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <TextField label="Bank" value="UBA" />
              <TextField label="Account name" value="MUSTY FEET"/>
              <TextField label="Account number" value="1234567890"/>
              <TextField
                label="Email address"
                value="Mustyfeet@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 mt-6 mb-16">
              <Button
                fullWidth variant = "outlined"
                onClick={()=> setIsReject(true) }
              >
                Reject information
              </Button>
              <Button
                fullWidth
                onClick={() => setIsClicked(false)}
              >
                Approve information
              </Button>
            </div>
            { isReject && (
                  <RejectModal
                    setIsReject = {setIsReject}
                    setIsClicked = {setIsClicked}
                  />
                )}
          </div>
        </div>
      )}
    </div>
  )
}

const datas =[
  {
    name: "Abiodun",
    amount: "₦10,000",
    action: "lock ₦10,000",
    duration: "3 days",
    text: "For Apple Series 2 ...",
    date: "Just now"
  },
  {
    name: "Justin",
    amount: "₦20,000",
    action: "unlocked ₦20,000",
    duration: "",
    text: "For White pair of Air Jordans ...",
    date: "3 days ago"
  },
  {
    name: "Jamiu",
    amount: "₦30,000",
    action: "raised a dispute",
    duration: "",
    text: "Jamiu has raised a dispute against you",
    date: "10 days ago"
  }
]

export default Notifications