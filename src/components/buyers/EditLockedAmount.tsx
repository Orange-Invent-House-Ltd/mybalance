import { useState } from "react"
import back from "../../assets/Icons/back.svg"
import TextField from "../reuseable/TextField"
import { Button } from "../reuseable/Button"

const EditLockedAmount = ({setEditLocked, description, timeline, amount}:any) => {
  const [value,setValue] = useState("")

  const handleChange =(e:any)=>{
    setValue(e.target.value)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
      <div className= "w-[393px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
        <div className="flex gap-4 items-center pt-10 mb-8">
          <img onClick={()=>setEditLocked(false)} src={back} alt="back" className="cursor-pointer" />
          <h6 className="h6">Edit Locked Amount</h6>
        </div>
        <div className="text-center mb-6">
          <p className="text-[18px] font-medium">White Air Jordans</p>
          <p className="text-[14px] font-normal">Pair of white Air Jordans from Young Jonn</p>
        </div>
        <p className="text-[14px] font-normal mb-6">Please note that for safety reasons, you can only edit the “reason for locking (description)” section.</p>
        <h1 className="text-[#EDEDED] text-lg font-medium">
          SENDER ADDITIONAL INFORMATION
        </h1>
        <form action="">
        <div className="mt-6 flex flex-col gap-4">
          <TextField label="How much are you locking?" id="amount" value={amount} placeholder="e.g 20,000" />
          <TextField
            label="Reason for locking (description)"
            placeholder="****"
            value={description}
          />
          <TextField
            label="How long will you be locking it for?"
            placeholder="give a description"
            value={timeline}
          />
        </div>
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
        <div className="mt-6 mb-16">
          <Button
            disabled={value ? false : true}
            fullWidth
          >
            Save
          </Button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default EditLockedAmount