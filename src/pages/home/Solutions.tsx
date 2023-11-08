import React from 'react'
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import HeroSection from '../../components/reuseable/HeroSection';
import { Button } from '../../components/reuseable/Button';
import { Link } from 'react-router-dom';
import lightcard from '../../assets/images/solution_frame.png'
import darkcard from '../../assets/images/solution_frame_dark.png'
import shirt50 from '../../assets/images/shirt_50.png'
import pc from '../../assets/images/pconthebed.png'
import officeTower from '../../assets/images/office_tower.png'
import office from '../../assets/images/office.png'
import buildingTower from '../../assets/images/building_tower.png'
import tractor from '../../assets/images/tractor.png'

const Solutions = () => {
  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
        <HeroSection 
          menu='Solutions' 
          text='Welcome to MyBalance, your trusted partner in secure online transactions. Our platform is dedicated to safeguarding all parties involved, ensuring a seamless and reliable escrow service experience.'
        />
        <div className='py-20 px-[5%] mb-16'>
          <div id='b&s' className='md:flex justify-between gap-10'>
            <div className='max-w-[426px]'>
              <h3 className='h3700'>Buyers & Sellers</h3>
              <p>MyBalance empowers e-commerce enterprises, small-scale businesses, and individual sellers to ensure the success of their transactions. We eliminate the common problem of discrepancies between what was ordered and what is received, a challenge that is eroding trust and confidence in online transactions.
              </p>
              <div className='w-[244px] mt-6 mb-8 md:mb-0'><a href='/buyer/register'><Button fullWidth>Sign up now</Button></a> </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img className="" src={lightcard} alt="someone with credit card" />
                <img className="absolute bottom-[150px] left-3 md:left-10" src={shirt50} alt="background rectangle shape" />
              </div>
              <div className=" relative mr-4 md:mr-0">
                <img className="absolute top-[130px] left-3 md:left-[25px]" src={pc} alt="someone shoping online" />
                <img className="mt-[150px] -z-10" src={darkcard} alt="bacgrund rectangle shape" />
              </div>
            </div>
          </div>

          <div id='c&m' className='md:flex justify-between gap-10 mt-[100px]'>
            <div className="flex justify-center">
              <div className="relative">
                <img className="" src={lightcard} alt="someone with credit card" />
                <img className="absolute bottom-[180px] left-3 md:left-10" src={officeTower} alt="background rectangle shape" />
              </div>
              <div className=" relative mb-8">
                <img className="absolute top-[130px] right-3 md:right-[25px]" src={office} alt="someone shoping online" />
                <img className="mt-[150px] -z-10" src={darkcard} alt="bacgrund rectangle shape" />
              </div>
            </div>
            <div className='max-w-[426px]'>
              <h3 className='h3700'>Companies & Merchants</h3>
              <p>For Organizations, MyBalance helps secure transactions between Organizations and their Vendors by activating payment immediately projected milestones, service delivery or products are delivered. Organizations can integrate MyBalance on their platform with ease.</p>
              <div className='w-[244px] mt-6'><Button fullWidth>Sign up now</Button></div>
            </div>
          </div>

          <div id='g&c' className='md:flex justify-between gap-10 mt-[100px]'>
            <div className='max-w-[500px]'>
              <h3 className='h3700'>Government & Contractors</h3>
              <p className='max-w-[426px]'>For Government Parastatals and their Contractors
                Government parastatals are not left out in our services delivery, as all Contractors and vendors services and products delivery can be tracked and payment initiated through our escrow services. Thereby enhancing and  increasing productivity  because of timely payments and ease of doing business in all establishments.
              </p>
              <div className='w-[244px] mt-6 mb-8 md:mb-0'><Button fullWidth>Sign up now</Button></div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img className="" src={lightcard} alt="someone with credit card" />
                <img className="absolute bottom-[150px] left-3 md:left-10" src={buildingTower} alt="background rectangle shape" />
              </div>
              <div className=" relative mr-4 md:mr-0">
                <img className="absolute top-[130px] left-3 md:left-[25px]" src={tractor} alt="someone shoping online" />
                <img className="mt-[150px] -z-10" src={darkcard} alt="bacgrund rectangle shape" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Solutions