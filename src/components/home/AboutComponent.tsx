import {FC} from "react"
import rectangle from "../../assets/images/Rectangle-1.png"
import card from "../../assets/images/online-shopping 1.png"
import laptop from "../../assets/images/a-pair-of-hands-typing-away 1.png"
import { Button } from '../reuseable/Button';
import { NavLink } from "react-router-dom";

const AboutComponent:FC = () => {
  return (
    <div className="px-[5%] mt-[50px] lg:text-left lg:flex flex-row-reverse justify-between lg:mt-28">
      <div className="lg:ml-[50px]">
        <h3 className="h6 sm:font-black sm:text-[36px] sm:mb-6">About MyBalance</h3>
        <div className="mb-[40px]">
          {data.map(({paragraph}, key)=>(
            <p className="para mb-4 w-fit lg:w-[614px]" key={key}>{paragraph}</p>
          ))}
        </div>
        <NavLink to='about-us'><div className="max-w-[244px]"><Button fullWidth={true}> learn more</Button></div></NavLink>
      </div>
      <div className="flex md:justify-center mt-6">
        <div className="relative mt-9 md:mt-0">
          <img className="absolute" src={card} alt="someone with credit card" />
          <img className="mt-[25px] ml-[40px] lg:ml-[20px]" src={rectangle} alt="background rectangle shape" />
        </div>
        <div className="hidden sm:block relative">
          <img className="absolute top-[130px] left-[25px]" src={laptop} alt="someone shoping online" />
          <img className="mt-[150px] -z-10" src={rectangle} alt="bacgrund rectangle shape" />
        </div>
      </div>
    </div>
  )
}

const data =[
  {
    paragraph: "Orange Invent House Ltd. proudly introduces 'MyBalance' Our mission is crystal clear: to eliminate the looming threat of transaction fraud, bridge the gap between expectations and reality in online purchases, and introduce the era of 'Balance After Delivery.'"
  },
  {
    paragraph: "We firmly believe that every party engaged in an online transaction deserves protection. At 'MyBalance,' we provide a robust platform where both buyers and sellers retain complete control over their financial journey from deposit to withdrawal."
  },
  {
    paragraph: "Imagine a fortress where buyers find assurance in receiving the full value for their money, and sellers trust us for secure and prompt payments. Welcome to the sanctuary of trust and reliability, embodied in our escrow payment solution. We stand as the unswerving bridge connecting buyers and sellers across Nigeria, ensuring the safeguarding of your financial interests."
  },
]
export default AboutComponent