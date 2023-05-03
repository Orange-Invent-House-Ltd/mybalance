import { useState } from "react"
import back from "../../assets/Icons/back.svg"
import TextField from "../reuseable/TextField"
import { Button } from "../reuseable/Button"
import { Link } from "react-router-dom"

const UnlockAmount = ({setUnlock, description, timeline, amount}:any) => {
  const [value,setValue] = useState("")

  const handleChange =(e:any)=>{
    setValue(e.target.value)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
      <div className= "w-[393px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
        <div className="flex gap-4 items-center pt-10 mb-8">
          <img onClick={()=>setUnlock(false)} src={back} alt="back" className="cursor-pointer" />
          <h6 className="h6">Unlock Amount </h6>
        </div>
        <form action="">
        <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
          RECEIVER ACCOUNT INFORMATION
        </h1>
        <div className="mt-6 flex flex-col gap-4">
          <TextField label="Select bank" placeholder="e.g UBA" />
          <TextField label="Select account name" placeholder="e.g John Buz" />
          <TextField label="Enter account number" placeholder="e.g 4758593837" />
          <TextField
            label="Email address"
            placeholder="****"
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-6 mt-6 mb-16">
          <Link to="/buyer/dispute-resolution">
            <Button
              disabled={value ? false : true}
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