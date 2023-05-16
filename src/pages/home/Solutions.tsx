import React from 'react'
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import HeroSection from '../../components/reuseable/HeroSection';

const Solutions = () => {
  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
        <HeroSection 
          menu='Solutions' 
          text='MyBalance is the world’s most secure escrow service provider platform safeguarding all parties involved.'
        />
        <div className='py-20 px-[7%] mb-16'>

        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Solutions