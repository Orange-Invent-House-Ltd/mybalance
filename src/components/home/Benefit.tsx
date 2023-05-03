import signup from "../../assets/images/icons8-sign-up-96.png"
import question from "../../assets/images/icons8-where-to-quest-96.png"
import nocash from "../../assets/images/icons8-no-cash-96.png"
import trust from "../../assets/images/icons8-trust-96.png"
import { Button } from '../reuseable/Button';
import { useNavigate } from "react-router-dom";
import line from "../../assets/Icons/line.svg";

const Benefit = () => {
  const navigate = useNavigate()
  return (
    <div className="my-[50px] md:my-[100px]">
      <div className="px-[5%]">
        <h3 className=" h6 w-[350px] sm:font-black sm:text-[36px] sm:mb-6 mx-auto sm:text-center sm:leading-[48.6px]">
          {" "}
          <span className="relative" >
            Benefits
            <img src={line} alt="" className="absolute left-0 bottom-0 " />
          </span>{" "}
          of Using MyBalance
        </h3>
        <div className="min-h-[146px] gap-5 flex items-center justify-center mb-[80px] flex-wrap">
          {data.map(({ icon, heading, paragraph }, key) => (
            <div key={key} className="w-[340px] sm:w-auto border-[#FFF2E8] border p-2 mb-2 rounded-lg">
              <img
                src={icon}
                alt=""
                className="mb-[20px] p-2 bg-[#FFF2E8] rounded-lg"
              />
              <p className="text-base text-[#121212] font-medium leading-[21.6px] mb-4">
                {heading}
              </p>
              <p className="font-regular text-[#767676] w-[250px]">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-benefit h-[325px] bg-center mx-[5%]">
        <h3 className="h5 w-[289px] text-center pt-[40px] sm:font-black sm:text-[36px] sm:mb-6 sm:w-[470px] mx-auto sm:pt-[70px] ">
          Enough talk, Let’s get you started on the journey!
        </h3>
        <p className="text-center mt-[-8px] ">Create an account now!</p>
        <div className="mx-auto w-[244px] mt-[30px]">
          <Button fullWidth={true} onClick={()=>navigate('/buyer/register')}>Get Started</Button>
        </div>
      </div>
    </div>
  );
}

const data=[
  {
    icon: signup ,
    heading: "Seamless account creation",
    paragraph:"Create your account in just a matter of seconds." 
  },
  {
    icon: question,
    heading: "Easy & simple to navigate",
    paragraph:"Enjoy the very best user experience and interface combined." 
  },
  {
    icon: nocash,
    heading: "Zero charges on first two transactions",
    paragraph:"Your first two transactions are absolutely free. Bill on us." 
  },
  {
    icon:trust,
    heading: "Reliability & trust",
    paragraph: "We have you, your interest and your money covered all the way." 
  }
]

export default Benefit