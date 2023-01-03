import {useState} from 'react'
import TextField from '../../../components/reuseable/TextField'
import { Button } from '../../../components/reuseable/Button'
import check from '../../../assets/Icons/check.svg'

const LockNewAmount = () => {
  const [value, setValue] = useState("")
  const [isLock, setIsLock] = useState(false);

  const handleChange =(e:any)=>{
    setValue(e.target.value)
  }

  return (
    <div className=''>
      <h1 className='text-[#EDEDED] text-lg font-medium'>SENDER ADDITIONAL INFORMATION</h1>
      <div className='mt-6 flex flex-col gap-4'>
        <TextField 
          label='How much are you locking?'
          placeholder='e.g 20,000'
        />
        <TextField 
          label='Reason for locking (description)'
          placeholder='****'
        />
        <TextField 
          label='How long will you be locking it for?'
          placeholder='give a description'
        />
      </div>
      <h1 className='mt-6 text-[#EDEDED] text-lg font-medium'>RECEIVER ACCOUNT INFORMATION</h1>
      <div className='mt-6 flex flex-col gap-4'>
        <TextField 
          label='Select bank'
          placeholder='e.g UBA'
        />
        <TextField 
          label='Select account name'
          placeholder='e.g John Buz'
        />
        <TextField 
          label='Enter account number'
          placeholder='e.g 4758593837'
        />
        <TextField 
          label='Phone number'
          placeholder='+234 8345687945'
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className='mt-6 mb-16'><Button disabled={value? false : true} fullWidth onClick={()=> setIsLock(true) }>Lock amount</Button></div>
      { isLock && (
        <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-1">
          <div className="w-[400px] bg-white p-[20px] rounded-[5px] flex flex-col items-center">
            <img className='p-4 bg-[#ECFDF3] rounded-[50%]' src={check} alt="check" />
            <h6 className='h6'>New Amount Locked!👍🏾</h6>
            <p className='mt-4 text-center text-base font-normal leading-[21.6px]'>Weldone! You have successfully locked [amount]. It will reflect in your locked amount on your dashboard.</p>
            <div className=' mt-4 w-[300px]' >
            <Button disabled = {false} fullWidth = {true} onClick={() => setIsLock(false) }>Share receipt with your vendor</Button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default LockNewAmount