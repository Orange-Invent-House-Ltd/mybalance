import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '../reuseable/Button';
import phoneImage from "../../assets/images/iPhone.png";
import bg from "../../assets/images/bg.png";
import line from "../../assets/Icons/line.svg";

const Introduction: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="lg:flex items-center gap-[30px] lg:pl-[5%] overflow-hidden mt-[90px]">
      <div className="text-center px-[5%] lg:px-[0px] lg:text-left">
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
        <p className="mx-auto lg:mx-0 w-[257px] leading-[24.3px] font-lg sm:w-[359px] text-[#3A3A3A] my-[20px]">
        MyBalance offers escrow services for businesses, organizations and government parastatals with our world’s most secure payment method.
        </p>
        <div className="mb-[20px] sm:flex gap-4">
          <div className="mx-auto lg:mx-0 w-[244px] mb-[20px]">
            <Button variant="outlined" fullWidth={true} onClick={()=>navigate('/login')}>
              Login to continue
            </Button>
          </div>
          <div className="mx-auto lg:mx-0 w-[244px]" onClick={()=>navigate('/buyer/register')}> 
            <Button fullWidth={true}>Create an account</Button>
          </div>
        </div>
      </div>
      <div className="bg-[#FFF2E8] md:h-screen relative lg:w-[803px]">
        <img src={bg} alt="square background shape" className=""/>
        <img
          className="w-[285px] sm:w-[560px] lg:w-[560px] absolute left-[90px] top-[40px] sm:left-[134px]"
          src={phoneImage}
          alt="phone"
        />
      </div>
    </div>
  );
};

export default Introduction;
