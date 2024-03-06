import React from 'react'
import HeroSection from '../../components/reuseable/HeroSection'
import Footer from '../../components/home/Footer'
import Header from '../../components/home/Header'
import TutorialVideo from '../../components/home/TutorialVideo'
import GetStarted from '../../components/home/GetStarted'

const LearnMybalance = () => {
  return (
    <div>
      <Header />
      <div className="mt-[80px]">
        <HeroSection
          menu="Learn MyBalance"
          text="Discover MyBalance with Our Easy Video Tutorials!"
        />
        <div className="pt-20 px-[5%] mb-24">
          <p className='max-w-[700px] text-[18px]'>Feeling unsure on how to use MyBalance as a Buyer or Seller? No worries! We've put together a series of easy-to-follow videos just for you. Sit back, relax, and let us guide you through every step.</p>
          <h3 className='text-headingColor text-[22px] md:text-[26px] mb-1 md:mb-6 font-bold mt-[50px]'>As a BUYER</h3>
          <div className='flex gap-4 flex-wrap'>
            {buyer.map(({src, title})=>(
              <TutorialVideo src={src} title={title} client='buyer'/>
            ))}
          </div>
          {/* As A Seller */}
          <h3 className='text-headingColor text-[22px] md:text-[26px] mb-1 md:mb-6 font-bold mt-[70px]'>As a SELLER</h3>
          <div className='flex gap-4 flex-wrap'>
            {seller.map(({src, title})=>(
              <TutorialVideo src={src} title={title} client='seller'/>
            ))}
          </div>
        </div>
        <GetStarted/>
      </div>
      <Footer/>
    </div>
  )
}

const buyer = [
  {
    title: 'How To: Open a Buyer’s Account',
    src: 'https://www.youtube.com/embed/JHxoF0el-Ds?si=2y407y-J6ZQZA1p3'
  },
  {
    title: 'Explore: The Buyer’s Dashboard',
    src: 'https://www.youtube.com/embed/FKdRNbZ5MM4?si=YuI9r6ilLNEhRFsw'
  },
  {
    title: 'How To: Fund Your Wallet',
    src: 'https://www.youtube.com/embed/9s80bt6PgCE?si=gTkHJB4qIjrJkUAo'
  },
  {
    title: 'How To: Unlock Funds',
    src: 'https://www.youtube.com/embed/5-PNnW-CNok?si=2-m65UkkvuDwvh6k'
  },
  {
    title: 'How To: Initiate an Escrow Link',
    src: 'https://www.youtube.com/embed/_F-84jPHuFU?si=JF2Qcp8TxwfgOD_o'
  },
]

const seller = [
  {
    title: 'Explore The Seller’s Dashboard',
    src: 'https://www.youtube.com/embed/j5o3jCKuF3o?si=9mRABXDZdrJwKbPd'
  },
  {
    title: 'How To: Create Link As a Seller',
    src: 'https://www.youtube.com/embed/GpeaNZmXwHw?si=Q8IaECnj-iv0QGI4'
  },
  {
    title: 'How To Open a Seller’s Account',
    src: 'https://www.youtube.com/embed/y7r9QFo7xTE?si=eiLNHXS8ThYrveqJ'
  },
]

export default LearnMybalance