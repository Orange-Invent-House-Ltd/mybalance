import React, { useEffect, useState } from 'react'
import { useCheckPhoneNumber, useEditProfile } from '../../hooks/mutations'
import { useForm } from 'react-hook-form'
import TextField from '../../components/reuseable/TextField1'
import { Button } from '../../components/reuseable/Button'
import { privateApi } from '../../api/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import LoadingOverlay from '../../components/reuseable/LoadingOverlay'

const ChangePhoneNumber = () => {
  const {control, watch, handleSubmit} = useForm()
  // const {mutate, isLoading} = useEditProfile()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {mutate:checkPhone } = useCheckPhoneNumber()

  const checkPhoneNumber = async(phone:any) => {
    checkPhone({
      phone: phone
    })
  }

  useEffect(()=>{
    const phone = watch('phone')
    if(phone?.length === 11){
      checkPhoneNumber (phone)
      // console.log(phone)
    }
  },[watch('phone')])

  const changePhoneNumber= async (data:any) => {
    setIsLoading(true)
    try {
      const response = await privateApi.put(
        "/auth/profile/edit",
        data
      );
      toast.success(response.data.message as string, {
        toastId: "success1",
        position: "top-right",
      });
      if(localStorage.getItem('userType') === 'buyer'){
        navigate("/buyer/dashboard")
      }else{
        navigate("/seller/dashboard")
      }
    } catch (error: any) {
      console.log(error)
      const resMessage = error.response.data.message.toString();
      toast.error(resMessage, {
        toastId: "error1",
        position: "top-right",
      });
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div>
      {isLoading && <LoadingOverlay /> }
      <h6 className="mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]">
        Please change your phone number to proceed to dashboard.
      </h6>
      <p className="mt-2 mb-8 text-[#6D6D6D] text-base font-normal">
        Use the form below to change your phone number.
      </p>

      <form className='mb-[50px]' onSubmit={handleSubmit(changePhoneNumber)}>
        <TextField
          name='phone'
          label='Phone Number'
          placeholder='09034545678'
          type='number'
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              message: "Phone number must be 11 digits",
              value: /^\d{11}$/,
            },
          }}
        />
        <div className='mt-4'>
          <Button fullWidth>Save</Button>
        </div>

      </form>
      
    </div>
  )
}

export default ChangePhoneNumber