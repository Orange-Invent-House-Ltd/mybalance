import { Button } from "../reuseable/Button"
import CheckBox from "../reuseable/CheckBox"

const RejectModal = ({setIsReject, setIsClicked}:any) => {
  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-1">
      <div className="w-[387px] bg-white p-[20px] rounded-[9px] flex flex-col items-center">
        <h6 className='h6'>Reason For Rejecting</h6>
        <p className='mt-4 text-center text-base font-normal w-[203px]'>Select your reason for rejecting this transaction.</p>
        <div className="mr-auto my-4 flex flex-col gap-4">
          <CheckBox
            value = 'Wrong amount'
          />
          <CheckBox
            value = 'Wrong description'
          />
          <CheckBox
            value = 'Wrong choice of item(s)'
          />
          <CheckBox
            value = 'Wrong quantity'
          />
          <CheckBox
            value = 'Wrong delivery date'
          />
        </div>
        <div className='flex flex-col gap-4 mt-4 w-[300px]' >
          <Button variant ="outlined" fullWidth = {true} onClick={() =>(
            setIsReject(false),
            setIsClicked(false)
          )}>Cancel</Button>
          <Button fullWidth = {true} onClick={() => setIsReject(false)}>Reject information</Button>
        </div>
      </div>
    </div>
  )
}

export default RejectModal