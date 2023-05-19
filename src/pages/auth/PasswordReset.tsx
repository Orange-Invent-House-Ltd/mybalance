import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/Icons/logo.svg"
import mphone from "../../assets/images/m-phone.png"
import phone from "../../assets/images/R-phone.png"
import check from "../../assets/Icons/check.svg"
import { Button } from '../../components/reuseable/Button';
import { Link } from 'react-router-dom'


const PasswordReset = () => {
  const navigate = useNavigate();

  return (
    <div className='md:flex justify-center flex-row-reverse'>
      {/* mobile header */}
      <header className='md:hidden ml-[5%] mb-4 mt-[5%]'>
        <Link to="/buyer/register"><img src={logo} alt="my-balance" /></Link>
      </header>
      <div className='md:w-[40%] lg:w-[30%]'>
        <img src={phone} alt="" className="hidden md:flex"/>
      </div>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%]"/>
      {/* medium size header */}
      <div className='md:w-[60%] lg:w-[70%]'>
        {/* Desktop header */}
        <header className='hidden md:flex ml-[5%] mt-[5%]'>
          <Link to="/"><img src={logo} alt="my-balance" /></Link>
        </header>
        
        <div className='w-[365px] md::w-[376px] mt-16 mx-auto mb-10 md:mb-0'>
          <img src={check} alt="password" className='mx-auto' />
          <h6 className='mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]'>Password reset</h6>
          <p className='mt-6 mb-8 text-center text-[#3A3A3A] text-[18px] leading-5 font-normal'>Your password has been successfully reset. Click button below to continue.</p>
            <Button fullWidth onClick={()=> navigate('/login')}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset