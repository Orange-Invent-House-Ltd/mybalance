import {useState} from 'react'
import logo from "../../assets/Icons/logo.svg"
import mphone from "../../assets/images/m-phone.png"
import phone from "../../assets/images/R-phone.png"
import key from "../../assets/Icons/key.svg"
import { Button } from '../../components/reuseable/Button';
import TextField from '../../components/reuseable/TextField';
import { Link } from 'react-router-dom'


const SetNewPassword = () => {
  const [email, setEmail] = useState("")

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
        
        <div className='w-[365px] md::w-[376px] mt-16 mx-auto mb-10 md:mb-0 px-[5%]'>
          <img src={key} alt="password" className='mx-auto' />
          <h6 className='mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]'>Set new password</h6>
          <p className='mt-2 mb-8 text-center text-[#6D6D6D] text-[18px] leading-5 font-normal'>Enter your new password below. Password must be 8 characters or more.</p>
          <form action="">
            <TextField value={email} onChange={e=>setEmail(e.target.value)}  label = "New password" placeholder='******'/>
            <TextField value={email} onChange={e=>setEmail(e.target.value)}  label = "Retype new password" placeholder='******'/> <br />
            <Button fullWidth>Reset password</Button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default SetNewPassword