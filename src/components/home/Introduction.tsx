import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '../reuseable/Button';
import heroImg from "../../assets/images/heroImg.png";
import line from "../../assets/Icons/line.svg";

const Introduction: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="lg:flex justify-between items-center gap-[20px] lg:pl-[5%] overflow-hidden mt-[90px]">
      <div className="px-[5%] lg:px-[0px] lg:text-left">
        <div className="w-[fit] h-[33px] p-2 bg-neutral-400 rounded-[15px] justify-center items-center inline-flex">
          <p className="text-white text-[13px] md:text-base font-bold">WELCOME TO MYBALANCE</p>
        </div>
        <h1 className="mx-auto lg:mx-0 h4 sm:text-[52px] text-headingColor sm:font-black sm:leading-[70.2px] sm:h-[210px] sm:w-[509px]">
          Your{" "}
          <span className="relative">
            trusted{" "}
            <img src={line} className="absolute -bottom-0 left-0" alt="" />{" "}
          </span>{" "}
          and{" "}
          <span className="relative">
            reliable
            <img
              src={line}
              className="absolute -bottom-0  left-0"
              alt=""
            />{" "}
          </span>{" "}
          escrow payment solution
        </h1>
        <p className="lg:mx-0 w-[257px] leading-[24.3px] font-lg sm:w-[359px] text-[#3A3A3A] my-[20px]">
          MyBalance offers escrow services for businesses, organizations and government parastatals with our highly secure payment method.
        </p>
        <div className="mb-[20px] sm:flex gap-4">
          <div className="lg:mx-0 w-[244px] mb-[20px]">
            <Button variant="outlined" fullWidth={true} onClick={()=>navigate('/login')}>
              Login to continue
            </Button>
          </div>
          <div className="lg:mx-0 w-[244px]" onClick={()=>navigate('/buyer/register')}> 
            <Button fullWidth={true}>Create an account</Button>
          </div>
        </div>
      </div>
      <img
        className="w-full sm:w-[560px] md:w-[600px] lg:w-[700px]"
        src={heroImg}
        alt="phone"
      />
    </div>
  );
};

export default Introduction;
