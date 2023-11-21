import {FC} from "react"
import aboutImg from '../../assets/images/About.png'
import { Button } from '../reuseable/Button';
import { NavLink } from "react-router-dom";
import line from "../../assets/Icons/line.svg";

const AboutComponent:FC = () => {
  return (
    <div className="lg:flex justify-center items-center gap-10 lg:text-left bg-[#ededed] px-[5%] py-[50px] md:py-[100px]">
      <img src={aboutImg} alt="About MyBalance" className="w-full max-w-[400px]"/>
      <div className="lg:ml-[50px]">
        <h3 className="mt-6 md:mt-0 w-[446px]text-neutral-900 text-[23px] md:text-4xl font-bold mb-6">
          <span className="relative">
            About
            <img src={line} className="absolute -bottom-0 left-0" alt="" />{" "}
          </span> MyBalance
        </h3>
        <div className="mb-[40px]">
          {data.map(({paragraph}, key)=>(
            <p className="para mb-4 w-fit lg:w-[614px]" key={key}>{paragraph}</p>
          ))}
        </div>
        <NavLink to='about-us'><div className="max-w-[244px]"><Button fullWidth={true}> learn more</Button></div></NavLink>
      </div>
    </div>
  )
}

const data =[
  {
    paragraph: "Welcome to 'MyBalance,' where our mission is straightforward: we aim to enhance confidence in online transactions, simplify the process of buying, and usher in the era of 'Balance After Delivery.'"
  },
  {
    paragraph: "We believe in ensuring a secure experience for everyone involved in online transactions. At 'MyBalance,' we've created a robust platform where both buyers and sellers have control over their financial journey, from deposit to withdrawal."
  },
  {
    paragraph: "Imagine a secure space where buyers can trust they'll receive what they paid for, and sellers rely on us for prompt and secure payments.That's the assurance and dependability you'll find in our escrow payment solution. We proudly serve as the reliable bridge connecting buyers and sellers across Nigeria, safeguarding your financial interests."
  },
]
export default AboutComponent