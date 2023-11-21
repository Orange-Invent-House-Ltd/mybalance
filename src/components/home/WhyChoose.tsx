import React from 'react'
import { Link } from 'react-router-dom';
import why1 from '../../assets/images/Why1.png'
import why2 from '../../assets/images/Why2.png'
import line from "../../assets/Icons/line.svg";

const WhyChoose = () => {
  return (
    <div className='px-[5%] py-[50px] md:py-[100px]'>
      <div className='md:flex items-center justify-center gap-20'>
        <img src={why2} alt="A lady using MyBalance" className='w-full max-w-[600px]'/>
        <div>
          <h3 className="mt-6 md:mt-0 max-w-[515px] text-neutral-900 text-[23px] md:text-4xl font-bold mb-6">
            <span className="relative">
              Why Choose
              <img src={line} className="absolute -bottom-1 left-0" alt="" />{" "}
            </span> MyBalance?
          </h3>
          {why.map(({heading, paragraph}, key:any) => (
            <div key={key} className='md:ml-4 mb-2'>
              <h4 className="w-[243px] text-neutral-900 text-base font-medium">{heading}</h4>
              <p className=" text-neutral-500 text-base font-normal leading-normal">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='md:flex items-center justify-center gap-20 mt-10'>
        <div>
          <h3 className="max-w-[515px] text-neutral-900 text-[23px] md:text-4xl font-bold mb-6">
            <span className="relative">
              Key Considerations 
              <img src={line} className="absolute -bottom-2 left-0" alt="" />{" "}
            </span> for Online Buyers and Sellers
          </h3>
          <ul className='ml-4 list-disc'>
          {data.map(({list}, key:any) => (
            <li key={key} className="max-w-[427px] text-neutral-900 text-base font-medium mb-2">{list}</li>
          ))}
          </ul>
          <Link to='/buyer/register'>
          <button className="text-white text-base font-bold w-[155px] h-[42px] px-[18px] py-2.5 mt-4 bg-orange-500 rounded-lg shadow border border-orange-500 justify-center items-center gap-2 inline-flex">
            Sign Up Now
          </button></Link>
        </div>
        <img src={why1} alt="A lady using MyBalance" className='mt-6 md:mt-0 w-full max-w-[600px]'/>
      </div>
    </div>
  )
}
const why = [
  {
    heading: 'Quick Account Setup',
    paragraph: "Create your account in seconds."
  },
  {
    heading: 'User-Friendly Experience',
    paragraph: "We Enjoy a seamless, intuitive interface for easy navigation."
  },
  {
    heading: 'No Charges for Buyers',
    paragraph: "Your first 5 transactions are fee free."
  },
  {
    heading: 'No Charges for Sellers',
    paragraph: "Your initial 10 transactions are exempt from charges."
  },
  {
    heading: '100% Reliability',
    paragraph: "We are committed to protecting your interests and financial security."
  },
]

const data = [
  { list: "Are you a buyer or seller seeking robust financial security?"},
  { list: "Do you want secure transactions with unfamiliar parties?"},
  { list: "Worried about receiving incorrect items or making payments before delivery?"},
  { list: "Anxious about potential online scams when buying or selling?"},
  { list: "Looking for a solution to these concerns?"},
]
export default WhyChoose