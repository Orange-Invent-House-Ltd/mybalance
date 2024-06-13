import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/reuseable/Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { publicApi, privateApi } from '../../api/axios';
import { GenericResponse } from '../../api/types';
import useStore from '../../store';
import LoadingOverlay from '../../components/reuseable/LoadingOverlay';
import TextField from '../../components/reuseable/TextField1';
import logo from "../../assets/Icons/logo.svg";
import rightImage from "../../assets/images/rightImage.png";
import facebook from "../../assets/Icons/Facebook.svg";
import twitter from "../../assets/Icons/Twitter.svg";
import linkedin from "../../assets/Icons/LinkedIn.svg";
import Instagram from "../../assets/Icons/Instagram.svg";

const KYC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [kycMetaId, setKycMetaId] = useState('')
  const {control, getValues, watch, handleSubmit} = useForm();
  const navigate = useNavigate();
  const store = useStore();

  useEffect(()=>{
    watch("number")?.length == 11 && verifyNIN()
  }, [watch("number")])

  const verifyNIN = async () => {
    try {
      //set button loading to true
      setIsLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "shared/lookup/nin",
        {
          number: getValues("number"),
        }
      );
      //Form submition success notifications
      const firstName = response.data.data.meta?.firstName;
      const middleName = response.data.data.meta?.middleName;
      const lastName = response.data.data.meta?.lastName;
      const name = firstName + " " + middleName + " " + lastName;
      setKycMetaId(response.data.data.id)
      // setValue("name", name);
      toast.success(response.data.message as string, {
        toastId: "success1",
        position: "top-right",
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const resMessage = error.response.data.message.toString();
      toast.error(resMessage, {
        toastId: "error1",
        position: "top-right",
      });
    }
  };

  const registerKYC = async (data:any) => {
    // console.log(`data: ${data}`)
    try {
      setIsLoading(true);
      const response = await privateApi.put<GenericResponse>(
        "auth/kyc",
        {
          kycType: 'NIN',
          kycMetaId: kycMetaId,
        }
      );
      toast.success(response.data.message as string, {
        toastId: 'success1',
        position: "top-right",
      });
      setIsLoading(false);
      store.setIsSuccessfull(true)
      navigate("response");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      store.setIsSuccessfull(false)
      const resMessage = error.response.data.message.toString();
      toast.error(resMessage, {
        toastId: 'error1',
        position: "top-right",
      });
    }
  };

  return (
    <div className="md:flex justify-center flex-row-reverse">
      {isLoading && <LoadingOverlay/>}
      <img
        src={rightImage}
        alt="Image of a phone"
        className="hidden md:flex w-[519px] object-cover min-h-screen"
      />

      <div className="md:w-[52%] lg:w-[65%]">
        <header className="w-fit ml-[5%] mt-[5%]">
          <Link to="/seller/dashboard/">
            <img src={logo} alt="my-balance" />
          </Link>
        </header>

        <main className="  w-full max-w-[354px] px-5 sm:px-0 mx-auto my-6 ">
          <h2 className="w-[343px] text-center text-neutral-900 text-[23px] font-medium">
            We need your identity
          </h2>
          <p className="mt-2 mb-8 text-[#6D6D6D] text-base text-center leading-5 font-normal">
            Enter your NIN information below.
          </p>
          <form onSubmit={handleSubmit(registerKYC)}>
            <TextField
              name='kycType'
              label='Means of ID'
              value='NIN'
              control={control}
            />
            <TextField
              name='number'
              label='NIN number'
              placeholder='12341234123'
              type='number'
              control={control}
              rules={{
                required: 'NIN field is required',
                pattern: {
                  message: 'NIN must be 11 digits only',
                  value: /^([0-9]{11})$/
                }
              }}
            />
            <div className="flex flex-col gap-4 mt-6">
              <Button disabled={!kycMetaId} fullWidth={true}>Continue</Button>
              <Button variant='outlined' type='button' fullWidth={true}
                onClick={()=>navigate('/seller/dashboard/')}
              >Back to Dashboard</Button>
            </div>
          </form>
        </main>

        <footer className="px-[5%] w-fit mx-auto mb-7 mt-20 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© 2022 MyBalance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com/mybalance_app" target="_blank">
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="" target="_blank">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="https://www.facebook.com/themybalanceapp" target="_blank">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/mybalance_app" target="_blank">
              <img src={Instagram} alt="Instagram" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default KYC