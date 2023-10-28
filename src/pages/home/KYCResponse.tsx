import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';
import { Button } from '../../components/reuseable/Button';
import successFace from '../../assets/Icons/faceSuccess.svg'
import failFace from '../../assets/Icons/faceFail.svg'


const KYCResponse = () => {
  const store = useStore();
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="flex justify-center items-center px-1 md:px-[197px] py-[150px] rounded-lg border border-gray-200">
        {store.isSuccessful ? (
          <div className="flex flex-col justify-start items-center">
            <img src={successFace} alt="" className="mb-6" />
            <h2 className="text-center text-neutral-900 text-[23px] font-medium">Amazing! You Are Not a Scam 👍🏾</h2>
            <p className="w-[343px] mb-6 text-center text-neutral-500 text-base font-normal">
              We have successfully verified your ID. Feel free to enjoy all the benefits of MyBalance.
            </p>
            <Button fullWidth onClick={()=>navigate("/seller/dashboard")}>
              Return to dashboard
            </Button>
          </div>
        ):(
          <div className="flex flex-col justify-start items-center">
            <img src={failFace} alt="" className="mb-6" />
            <h2 className="text-center text-neutral-900 text-[23px] font-medium">Oops! Verification Incomplete! 👍🏾</h2>
            <p className="w-[343px] mb-6 text-center text-neutral-500 text-base font-normal">
              Unfortunately, we cannot verify your information at this moment. Try again later.
            </p>
            <Button fullWidth onClick={()=>navigate("/seller/dashboard")}>
              Return to dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default KYCResponse