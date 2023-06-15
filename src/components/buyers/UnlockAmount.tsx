import { useState } from "react"
import back from "../../assets/Icons/back.svg"
import TextField from "../reuseable/TextField1"
import { Button } from "../reuseable/Button"
import { Link, useNavigate } from "react-router-dom"

const UnlockAmount = ({setUnlock, description, timeline, amount}:any) => {
  const [value,setValue] = useState("")
  const navigate = useNavigate();

  const handleChange =(e:any)=>{
    setValue(e.target.value)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
      <div className= "w-[393px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
        <div className="flex gap-4 items-center pt-10 mb-8">
          <img onClick={()=>setUnlock(false)} src={back} alt="back" className=" cursor-pointer" />
          <h6 className="text-[23px] font-medium">Unlock Amount </h6>
        </div>
        <form action="">
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
          RECEIVER ACCOUNT INFORMATION
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
        <div className="flex flex-col gap-6 mt-6 mb-16">
          <Link to="/buyer/dispute-resolution">
            <Button
              onClick={()=>navigate('/buyer/dispute-resolution')}
              fullWidth
              variant= "outlined"
            >
              Report a dispute
            </Button>
          </Link> 
          <Button
            disabled={value ? false : true}
            fullWidth
          >
            Unlock amount
          </Button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default UnlockAmount