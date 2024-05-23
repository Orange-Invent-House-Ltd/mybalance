import React, { useState } from 'react';
import {NavLink, Link, useNavigate} from "react-router-dom"
import { Button } from '../reuseable/Button';
import logo from "../../assets/Icons/logo.svg"
import handburger from "../../assets/Icons/menuicon.png"
import { ChevronDown } from 'lucide-react';
import './dropdown.css'


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
    <div className= {showMenu ? 'bg-[#F7F7F7]  homeHeader ' : 'bg-white homeHeader'}>
      <div className='flex justify-center items-center gap-2'>
        <Link to='/'><img src={logo} alt="logo" className='w-[39px]'/></Link> 
        <p className='text-primary-normal text-[25px] font-bold'>MyBalance</p>
      </div>
      {/* mobile Menu */}
      <div className="md:hidden text-right" >
        {/* handburger - Open menu */}
        <button className='relative' onClick={handleClick}>
          <img src={handburger} alt="Menu" />
        </button>
        <nav className={showMenu ? 'homeNavMenu right-0 duration-300' : 'homeNavMenu -right-full duration-700'}>
          <ul className="flex flex-col gap-5 text-[#373737] font-medium text-left">
            {/* close button - close menu
            <li>
              <Link to="#"><img src={close} alt="close" className='flex ml-auto w-12 mb-6' onClick={handleClick}/></Link>
            </li> */}
            <li className="mb-2"><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about-us">About us</NavLink></li>
            <li className='mb-2'>
            {/* handleDropdown */}
              <NavLink to="/solutions">Solutions </NavLink>
              {/* <div className={display? "mt-2" : "hidden absolute top-[70px] left-0 w-full z-10"}>
                <div>
                  <NavLink to="#" className='text-base font-medium'>Buyers & Vendors</NavLink>
                  <p className='text-[13px] font-normal pl-6'>For small scale vendors and individual buyers</p>
                </div>
                <div className='mt-2'>
                  <NavLink to="#" className='text-base font-medium'>Companies & Merchants</NavLink>
                  <p className='text-[13px] font-normal pl-6'>For organizations and their merchants</p>
                </div>
                <div className='mt-2'>
                  <NavLink to="#" className='text-base font-medium'>Government & Contractors</NavLink>
                  <p className='text-[13px] font-normal pl-6'>For government parastatals and contractors</p>
                </div>
              </div> */}
            </li>
            <li className=''>
            {/* handleDropdown */}
            <button onClick={handleDropdown} className={display ? 'w-full text-left' : ''} >Resources <ChevronDown className='inline'/></button>
              <div className={display ? "px-[5%] py-2 flex flex-col gap-3 items-start" : "hidden absolute top-[70px] w-full z-10"}>
                <NavLink to='/learn-mybalance' className='text-[14px] font-medium'>Learn MyBalance</NavLink>
                <NavLink to='/blog' className='text-[14px] font-medium'>Blog</NavLink>
              </div>
            </li>
            {/* <li><NavLink to="/learn-mybalance">Learn Mybalance</NavLink></li> */}
            <li className=''><NavLink to="/contact">Contact</NavLink></li>
            <li className='mb-4'><a href="https://documenter.getpostman.com/view/15948667/2sA3JFA4J3" target='_blank'>Developer Docs</a></li>
          </ul>
          <div className="" onClick={()=>navigate('/buyer/register')}><Button fullWidth={true}>Get Started</Button></div>
        </nav>
      </div>
      {/* Desktop Menu */}
      <nav className='hidden md:flex'>
        <ul className="flex items-center gap-6 text-[#373737] font-medium">
          <li className=""><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about-us">About us</NavLink></li>
          <li>
            <NavLink to="/solutions" className="flex">Solutions </NavLink>
            <div className={display? "absolute top-[70px] left-0 w-full z-10 bg-white" : "hidden absolute top-[70px] left-0 w-full z-10 bg-white"}>
              <div className='flex justify-evenly items-center gap-10 h-[142px] px-[5%]'>
                <div>
                  <NavLink to="#" className='text-[23px] font-bold'>Buyers & Vendors</NavLink>
                  <p className='text-sm font-regular text-[#6D6D6D]'>For small scale vendors and individual buyers</p>
                </div>
                <div>
                  <NavLink to="#" className='text-[23px] font-bold'>Companies & Merchants</NavLink>
                  <p className='text-sm font-regular text-[#6D6D6D]'>For organizations and their merchants</p>
                </div>
                <div>
                  <NavLink to="#" className='text-[23px] font-bold'>Government & Contractors</NavLink>
                  <p className='text-sm font-regular text-[#6D6D6D]'>For government parastatals and contractors</p>
                </div>
              </div>
              <div className='flex justify-center items-center h-[80px] bg-[#FFF2E8]'>
                <p>Feel free to select the one that pertains to you.</p>
              </div>
            </div>
          </li>
          <li className='dropdown relative'>
            <button  className="flex py-7">Resources <ChevronDown /></button>
            <div className="hidden absolute right-[-80px] rounded-[8px] w-[296px] bg-white py-4 mt-[3px] z-10">
              <div className='h-[142px] px-[5%]'>
                <div>
                  <NavLink to="/learn-mybalance" className='text-[18px] text-[#101828] font-semibold'>Learn Mybalance</NavLink>
                  <p className='text-sm font-regular text-[#6D6D6D] mb-4'>Discover MyBalance with Our Easy Video Tutorials!</p>
                </div>
                <div>
                  <NavLink to="" className='text-[18px] text-[#101828] font-semibold'>Blog</NavLink>
                  <p className='text-sm font-regular text-[#6D6D6D]'>Find out the latest MyBalance news</p>
                </div>
              </div>

            </div>
          </li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><a href="https://documenter.getpostman.com/view/15948667/2sA3JFA4J3" target='_blank'>Developer Docs</a></li>
        </ul>
      </nav>
      <div className="w-[130px] hidden md:flex" onClick={()=>navigate('/buyer/register')}><Button fullWidth={true}>Get Started</Button></div>
    </div>
  )
}

export default Header