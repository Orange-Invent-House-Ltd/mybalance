import {FC} from "react"
import rectangle from "../../assets/images/Rectangle-1.png"
import card from "../../assets/images/online-shopping 1.png"
import laptop from "../../assets/images/a-pair-of-hands-typing-away 1.png"
import { Button } from '../reuseable/Button';

const AboutComponent:FC = () => {
  return (
    <div className="px-[5%] mt-[50px] text-center lg:text-left lg:flex flex-row-reverse justify-between lg:mt-28">
      <div className="lg:ml-[50px]">
        <h3 className="h6 sm:font-black sm:text-[36px] sm:mb-6">About MyBalance</h3>
        <div className="mb-[40px]">
          {data.map(({paragraph}, key)=>(
            <p className="para mx-auto lg:mx-0 w-[343px] sm:w-[550px] md:w-[614px]" key={key}>{paragraph}</p>
          ))}
        </div>
        <div className="mx-auto lg:mx-0 max-w-[244px]"><Button fullWidth={true}>learn more</Button></div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="relative">
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
    paragraph: "My Balance is a product of Orange Invent Limited with CAC Registration Number RC 1303150. Our core mission is to mitigate the fear of transaction fraud, scenarios of what I ordered vs what I got and pay after delivery."
  },
  {
    paragraph: "We are a platform where buyers are assured of getting value for their money and the seller can bank on us to get paid for the product sold."
  },
  {
    paragraph: "We are of the conviction that both parties involve in an online transaction should have their interests protected by ensuring they control the payment process from deposit to withdrawal."
  }
]
export default AboutComponent