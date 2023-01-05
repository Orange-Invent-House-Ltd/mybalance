import React from "react";
import sideImg from "../../../assets/images/rightImg.png";
import { Button } from "../../../components/reuseable/Button";
import TextField from "../../../components/reuseable/TextField";
import logo from '../../../assets/Icons/logo.svg'
const Login = () => {
  return (
    <div className="flex flex-col-reverse relative md:flex-row">
      <div className="flex-[.7]  flex items-center justify-center px-5">
        <img src={logo} alt="" className="absolute top-10 left-10" />
        <div className="w-[354px]  ">
          <div className="flex text-center mt-8 md:mt-0 items-center mb-10 leading-10 w-full  ">
            <p className="text-primary-dark  flex-1 cursor-pointer capitalize border-b-2 font-medium   border-primary-dark  ">
              Login as a customer
            </p>
            <p className="text-gray flex-1 cursor-pointer capitalize border-b-2 font-medium border-gray  ">
              login as a seller
            </p>
          </div>
          <form>
            <h1 className="font-medium text-2xl mb-2">
              Log in to your account
            </h1>
            <p className="text-base text-gray mb-8">
              Welcome back! Please enter your details and access your dashboard.
            </p>
            <TextField label="email" />
            <TextField label="password" type="password" />
            <div className="flex items-center justify-between py-5">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">remember me</label>
              </div>
              <p>forget password</p>
            </div>
            <Button fullWidth disabled>
              login
            </Button>
            <div>
              <p>Don’t have an account? <span>Create one</span></p>
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
