import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { Button } from '../reuseable/Button';
import logo from "../../assets/Icons/logo.svg"
import handburger from "../../assets/Icons/handburger.svg"
import close from '../../assets/Icons/close.svg'
import caret from '../../assets/Icons/dropdown.svg'

const  Header = () =>{
  const [ display, setDisplay ] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  
  // Dropdown click event 
  const handleDropdown = () => {
    setDisplay(!display)
  }

  // mobile menu reponsive design
  const handleClick =()=>{
    setShowMenu(!showMenu)
  }
  
  return (
    <div className="flex justify-between items-center px-[5%] text-base h-[80px]">
      <div>
        <Link to='/'><img src={logo} alt="logo" className='w-[39px]'/></Link> 
      </div>
      {/* mobile Menu */}
      <div className="md:hidden text-right" >
        <button className='relative' onClick={handleClick}>
          <img src={handburger} alt="Menue" />
        </button>
          <nav className={showMenu ? 'navMenu right-0 duration-300' : 'navMenu -right-full duration-700'}>
            <ul className="text-[#373737] font-medium">
              <li className='navbar-toggle '>
                <Link to="#" className='menu-bars'><img src={close} alt="close" className='flex ml-auto w-12 mb-6' onClick={handleClick}/></Link>
              </li>
              <li className="font-bold text-primary mb-2"><Link to="/">Home</Link></li>
              <li className='mb-2'><Link to="#">About us</Link></li>
              <li className='mb-2'><Link to="#">How we work</Link></li>
              <li className='mb-2'><Link to="#">FAQs</Link></li>
              <li className='mb-2'>
                <button onClick={handleDropdown}>Solutions <img src={caret} alt="dropdown" className='ml-2 my-auto inline-block' /></button>
                <div className={display? "mt-2" : "hidden absolute top-[70px] left-0 w-full z-10"}>
                  <div>
                    <a href="#" className='text-base font-medium'>Buyers & Vendors</a>
                    <p className='text-[13px] font-normal pl-6'>For small scale vendors and individual buyers</p>
                  </div>
                  <div className='mt-2'>
                    <a href="#" className='text-base font-medium'>Companies & Merchants</a>
                    <p className='text-[13px] font-normal pl-6'>For organizations and their merchants</p>
                  </div>
                  <div className='mt-2'>
                    <a href="#" className='text-base font-medium'>Government & Contractors</a>
                    <p className='text-[13px] font-normal pl-6'>For government parastatals and contractors</p>
                  </div>
                </div>
              </li>
              <li className='mb-4'><Link to="#">Contact</Link></li>
            </ul>
            <div className="w-[103px] ml-auto mr-0" onClick={()=>navigate('/buyer/register')}><Button fullWidth={true}>Get Started</Button></div>
          </nav>
      </div>
      {/* Desktop Menu */}
      <nav className='hidden md:flex'>
        <ul className="flex gap-6 text-[#373737] font-medium">
          <li className="font-bold text-primary"><Link to="/">Home</Link></li>
          <li><Link to="#">About us</Link></li>
          <li><Link to="#">How we work</Link></li>
          <li>
            <button onClick={handleDropdown} className="flex">Solutions <img src={caret} alt="dropdown" className='ml-2 my-auto' /></button>
            <div className={display? "absolute top-[70px] left-0 w-full z-10 bg-white" : "hidden absolute top-[70px] left-0 w-full z-10 bg-white"}>
              <div className='flex justify-evenly items-center gap-10 h-[142px] px-[5%]'>
                <div>
                  <a href="#" className='text-[23px] font-bold'>Buyers & Vendors</a>
                  <p className='text-sm font-regular text-[#6D6D6D]'>For small scale vendors and individual buyers</p>
                </div>
                <div>
                  <a href="#" className='text-[23px] font-bold'>Companies & Merchants</a>
                  <p className='text-sm font-regular text-[#6D6D6D]'>For organizations and their merchants</p>
                </div>
                <div>
                  <a href="#" className='text-[23px] font-bold'>Government & Contractors</a>
                  <p className='text-sm font-regular text-[#6D6D6D]'>For government parastatals and contractors</p>
                </div>
              </div>
              <div className='flex justify-center items-center h-[80px] bg-[#FFF2E8]'>
                <p>Feel free to select the one that pertains to you.</p>
              </div>
            </div>
          </li>
          <li><Link to="#">FAQs</Link></li>
          <li><Link to="#">Contact</Link></li>
        </ul>
      </nav>
      <div className="w-[130px] hidden md:flex" onClick={()=>navigate('/buyer/register')}><Button fullWidth={true}>Get Started</Button></div>
    </div>
  )
}

export default Header