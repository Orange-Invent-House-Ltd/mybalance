import React from 'react'
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { authApi } from "../../api/authApi";
import { Link, useNavigate  } from "react-router-dom";
import useStore from "../../store";
import { LoadingButton } from "../../components/reuseable/LoadingButton";
import TextField from "../../components/reuseable/TextField";
import phoneImage from "../../assets/images/R-phone.png"
import mphone from "../../assets/images/m-phone.png"
import logo from '../../assets/Icons/logo.svg'
import facebook from '../../assets/Icons/Facebook.svg'
import twitter from '../../assets/Icons/Twitter.svg'
import linkedin from '../../assets/Icons/LinkedIn.svg'
import Instagram from '../../assets/Icons/Instagram.svg'

//type definition with error messages for the form input
const GetVerificationSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
});

//type definition for get verification link form
export type GetVerificationInput = TypeOf<typeof GetVerificationSchema>;

const GetVerificationLink = () => {
  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<GetVerificationInput>({
    resolver: zodResolver(GetVerificationSchema),
  });

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const {
    handleSubmit,
  } = methods;

  const resendVerifyEmail = async (data: GetVerificationInput) => {
    try {
      const response = await authApi.post(
        'auth/resend-otp',
        data
      );
      //Form submition success notifications
      toast.success(response.data.message as string, {
        toastId: 'success1',
        position: "top-right",
      });
      store.setTempId(response.data.data?.tempId);
      store.setAuthEmail(response.data.data?.email);
      navigate('/email-verification')
    } catch (error:any) {
      console.error(error);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        toastId: 'error1',
        position: "top-right",
      });
    }
  };

  return (
    <div className=' md:flex justify-center flex-row-reverse'>
      {/* mobile header */}
      <header className='md:hidden ml-[5%] mb-4 mt-[5%] '>
        <Link to="/"><img src={logo} alt="my-balance" /></Link>
      </header>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%] "/>
      {/* Desktop Image */}
      <div className=''>
        <img src={phoneImage} alt="Image of a phone" className="hidden md:flex" />
      </div>
      <div className='md:w-[52%] lg:w-[65%]'>
        {/* Desktop header */}
        <header className='hidden md:flex ml-[5%] mt-[5%]'>
          <Link to="/"><img src={logo} alt="my-balance" /></Link>
        </header>
        
        <div className='w-[343px] mx-auto my-6 '>
          <h1 className='text-headingColor md:text-center text-[23px] md:text-[32px] mb-4 font-medium md:font-bold'>Get Verification Link</h1>
          <p className='mb-6 md:text-center text-[15px] md:text-[18px]'>Enter the information below to get your verification link.</p>
          <FormProvider {...methods}>
            <form 
              onSubmit={handleSubmit(resendVerifyEmail)}
            >
              <TextField name='email' label='Email'/>  
              <LoadingButton
                loading={store.requestLoading}
                fullWidth
              > Get verification link</LoadingButton>
            </form>
          </FormProvider>  
        </div>
        <div className="px-[5%] mt-32 w-fit mx-auto mb-7 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© 2022 MyBalance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com/mybalance_app" target="_blank" aria-label="twitter"><img src={twitter} alt="Twitter" /></a>
            <a href="" target="_blank" aria-label="linkedin"><img src={linkedin} alt="LinkedIn" /></a>
            <a href="https://www.facebook.com/themybalanceapp" target="_blank" aria-label="facebook"><img src={facebook} alt="Facebook" /></a>
            <a href="https://www.instagram.com/mybalance_app" target="_blank" aria-label="instagram"><img src={Instagram} alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default GetVerificationLink