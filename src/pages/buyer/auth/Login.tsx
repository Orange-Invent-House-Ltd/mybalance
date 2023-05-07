import React from "react";
import { useForm } from "react-hook-form";
import sideImg from "../../../assets/images/rightImg.png";
import { Button } from "../../../components/reuseable/Button";
import { Link } from "react-router-dom";
import TextField from "../../../components/reuseable/TextField";
import logo from '../../../assets/Icons/logo.svg'

import facebook from '../../../assets/Icons/Facebook.svg'
import twitter from '../../../assets/Icons/Facebook.svg'
import linkedin from '../../../assets/Icons/Facebook.svg'

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState:{errors},
  } = useForm()

  const onSubmit = (data:{}) => console.log(data);

  return (
    <div className="flex flex-col-reverse relative md:flex-row">
      <div className="flex-[.7]  flex items-center  justify-center px-5">
      <Link to='/'><img src={logo} alt="" className="absolute top-10 left-10" /></Link>
        <div className="w-[400px]   mt-[55px]">
          <div className="flex text-center mt-8 md:mt-0 items-center mb-10 leading-10 w-full  ">
            <p className="text-[#9A4D0C]  flex-1 cursor-pointer capitalize border-b-2 font-medium px-4 py-3   border-primary-dark  ">
              Login as a customer
            </p>
            <p className="text-[#6D6D6D] flex-1 cursor-pointer capitalize border-b-2 font-medium px-4 py-3 border-[#6D6D6D]  ">
              login as a seller
            </p>
          </div>
          <form 
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-medium text-2xl mb-2">
              Log in to your account
            </h1>
            <p className="text-base text-gray mb-8">
              Welcome back! Please enter your details and access your dashboard.
            </p>
            <TextField 
              {
                ...register('email', {
                  required: 'this field is required',
                  pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
                    message: 'invalid email format',
                  },
                }) 
              }
              error={errors?.email} 
              helperText={errors?.email?.message}
              label="email" 
              autoComplete="email"
            />
            <TextField 
              
              label="password" type="password" />
            <div className="flex items-center justify-between py-5">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">remember me</label>
              </div>
              <Link to='/forgot-password' className="font-bold">forget password</Link>
            </div>
            <Button fullWidth>
              login
            </Button>
            <div className="mt-6">
              <p className='text-sm font-normal w-fit mx-auto'>
                Don’t have an account? <Link to='/buyer/register' className="font-bold cursor-pointer">Create one</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <img
        className=" w-screen h-[300px] md:flex-[.5]  md:h-screen object-cover"
        src={sideImg}
        alt=""
      />
    </div>
  );
};

export default Login;
