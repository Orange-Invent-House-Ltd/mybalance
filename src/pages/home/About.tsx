import React from 'react'
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import { Button } from '../../components/reuseable/Button';
import ourValueImg from '../../assets/images/our-value.png'
import number1 from '../../assets/Icons/01.svg'
import number2 from '../../assets/Icons/02.svg'
import number3 from '../../assets/Icons/03.svg'
import number4 from '../../assets/Icons/04.svg'
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
        <div className='px-[7%] h-[400px] md:h-[700px] flex flex-col justify-center items-center bg-primary-normal text-white'>
          <p className='text-base font-medium text-[#373737] mb-6'>
            <a href="/" className='underline text-black '>Home</a> | About Us
          </p>
          <h3 className='max-w-[725px] text-center text-[29px] md:text-[36px] font-bold'>
            Never shop online without MyBalance escrow service. Services and Product delivery guaranteed
          </h3>
        </div>
        <div className='py-20 px-[7%] mb-16'>
          <h3 className='h3 text-center'>About</h3>
          <p className='text-center text-base md:text-lg max-w-[635px] mx-auto'>MyBalance offers escrow services for businesses, organizations and government parastatals with our world’s most secure payment method from a counterparty risk perspective - thereby protecting both buyer and seller, all funds transacted using escrow are kept in trust. 
            MyBalance is a product of Orange Invent Limited with <span className='font-medium'>CAC Registration Number RC 1303150</span>. Our core mission is to mitigate the fear of transaction fraud, scenarios of what I ordered vs what I got and pay after delivery. 
            We are a platform where buyers are assured of getting value for their money and the seller can bank on us to get paid for the product sold.
          </p>
        </div>

        <div className='md:flex gap-16 bg-greyBg'>
          <img src={ourValueImg} alt="Our Value" />
          <div className='mt-[80px] pr-[7%] pl-[5%] pb-6 md:pb-0'>
            <h3 className='text-headingColor text-[29px] md:text-[36px] mb-6 font-bold'>Our Values</h3>
            <p className='mb-4'>A team built on United-Front, Service and Trust. 
              We are building the impossible. We create and grow focused and consistent mindset over a fixed mindset, and encourage each other to brazenly take on new approaches to solving problems for our customers.
            </p>
            <p>
              We empower you with all the context and tools you need to get things done, and we trust you'll take it from there leaving no stone unturned in the process.
            </p>
            <div className='mt-10'>
            {data.map(({number, heading, text }, key) => {
              return (
                <div className='flex items-start gap-4 mb-20'
                  key={key}
                >
                  <img
                    src={number}
                    alt="number"
                    className='pt-2'
                  />
                  <div>
                    <p className='font-semibold text-[#121212] mb-2'>{heading}</p>
                    <p>{text}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>

        <div className='py-24 px-[5%]'>
          <h3 className='text-[29px] md:text-[36px] mb-6 font-bold text-primary-normal max-w-[618px] text-center mx-auto'>Interested in connecting with the people behind our success?</h3>
          <div className='flex flex-col items-center justify-center gap-4'>
            <Link to='/contact'><div className='w-[244px]'><Button fullWidth variant='outlined'>Contact us</Button></div></Link> 
            <div className='w-[244px]'><Button fullWidth>See vacancies</Button></div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

const data = [
  {
    number: number1,
    heading: "Customer Attention",
    text: 'Customers happiness is treasured. We go the extra mile in solving problems for our customers and enabling them to achieve their long term goals.'
  },
  {
    number: number2,
    heading: "Idea Meritocracy",
    text: 'The best ideas are key. We think critically to proffer solutions and answers to challenges.'
  },
  {
    number: number3,
    heading: "Speed",
    text: 'Move Swiftly and launch quickly. We act with urgency, learn quickly and are biased towards quality and quick decision making & execution.'
  },
  {
    number: number4,
    heading: "World-Class Execution",
    text: 'Be a master of your craft & get it done. Trust, Accountability, Security, & Integrity. We set clear expectations, are reliable and hold ourselves accountable. Security is top of mind for us at all times.'
  }
];

export default About