import {useState} from 'react'
import bell from "../../assets/Icons/notification.svg"
import { Button } from "../reuseable/Button"
import TextField from "../reuseable/TextField"
import back from "../../assets/Icons/back.svg"


type HeaderProps = {
  Heading: string;
  Text:string;
};
const Header = ({Heading, Text}:HeaderProps) => {
  const [isVerify, setIsVerify] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center md:flex-row gap-6 justify-between mb-8">
      <div className="flex gap-4">
        <div className="w-[60px] h-[60px] bg-[#FFF2E8] border-2 border-[#FECA9F] text-2xl text-[#9A4D0C] rounded-full  flex items-center justify-center uppercase font-bold">
          TM
        </div>
        <div>
          <h6 className='h6'>{Heading}</h6>
          <p className='max-w-[478px] text-[#303030] font-normal text-sm leading-[18.9px] '>{Text}</p>
        </div>
      </div>
      <img src={bell} alt="notification bell" className="hidden md:flex ml-auto mr-4"/>
      <div className="w-[343px] md:w-[270px]">
        <Button fullWidth variant="contained" onClick={() => setIsVerify(true)}>Create One-time MyBalance Link</Button>
      </div>
      {isVerify && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
          <div className= "w-[400px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
            <div className="flex gap-4 items-center mt-10 mb-4">
              <img src={back} alt="back" onClick={() => setIsVerify(false)}/>
              <h6 className="h6">Create an Escrow Link</h6>
            </div>
            <p className="text-[16px] text-[#303030] font-normal mb-8">Create your one-time escrow link and share with your prospective customers.</p>
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
              <TextField label="Select bank" placeholder="Access Bank" />
              <TextField label="Select account name" placeholder="e.g JMusty Feet"/>
              <TextField label="Enter account number" placeholder="1234567890"/>
              <TextField
                label="Phone number"
                placeholder="090123456789"
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
  )
}

export default Header