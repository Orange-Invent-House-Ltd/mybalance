import {EventHandler, SyntheticEvent, useState} from "react";
import logo from "../../../assets/Icons/logo.svg"
import phoneImage from "../../../assets/images/R-phone.png"
import mphone from "../../../assets/images/m-phone.png"
import { Button } from '../../../components/reuseable/Button';
import TextField from '../../../components/reuseable/TextField';
import {Link} from 'react-router-dom'


const Register = ({ setActiveTab}:any) => {
  // tabs
  const [openTab, setOpenTab] = useState(1);
  //seller
  const [businessName, setBusinessName] = useState("")
  const [discription, setDiscription] = useState("")
  const [address, setAddress] = useState("")
  const [sellerPhone, setSellerPhone] = useState("")

  return ( 
    <div className=' md:flex justify-center flex-row-reverse'>
      {/* mobile header */}
      <header className='md:hidden ml-[5%] mb-4 mt-[5%] '>
        <Link to="/"><img src={logo} alt="my-balance" /></Link>
      </header>
      <div className='md:w-[48%] lg:w-[35%]'>
        <img src={phoneImage} alt="Image of a phone" className="hidden md:flex" />
      </div>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%] "/>
      
      <div className='md:w-[52%] lg:w-[65%]'>
        {/* Desktop header */}
        <header className='hidden md:flex ml-[5%] mt-[5%]'>
          <Link to="/"><img src={logo} alt="my-balance" /></Link>
        </header>
        
        <div className='w-[343px] mx-auto my-6 '>
          {/* tabs */}
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                {/* customer tab */}
                <li className="-mb-px last:mr-0 flex-auto text-center">
                <Link
                  to ='/buyer/register'
                ><a
                    className={
                      "text-xs font-bold uppercase py-3 block leading-normal " +
                      (openTab === 0
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    // onClick={e => {
                    //   e.preventDefault();
                    //   setOpenTab(1);
                    // }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Create as a Customer
                  </a></Link>
                </li>
                {/* Seller tab */}
                <li className="-mb-px last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase py-3  block leading-normal " +
                      (openTab === 1
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Create as a seller
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    {/* create account as seller */}
                    <div className={openTab === 1 ? "block" : "hidden"} id="link2">
                      <form>
                        <h6 className='mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]'>Create your account now</h6>
                        <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>Create your account in seconds and enjoy the full features of MyBalance.</p>
                        <div className='grid gap-y-3.5'>
                          <TextField value={businessName} onChange={e=>setBusinessName(e.target.value)}  label = "Business name" placeholder='e.g “Musty Feet”'/>
                          <TextField value={discription} onChange={e=>setDiscription(e.target.value)} label = "Describe your service" placeholder='Sales of sneakers, footwear, etc'/>
                          <TextField value={address} onChange={e=>setAddress(e.target.value)}  label = "Address" placeholder='Ikeja, Lagos.'/>
                          <TextField value={sellerPhone} onChange={e=>setSellerPhone(e.target.value)} label = "Phone" type="phone" placeholder='+234 000 0000 000'/>
                          <Link to='/seller/register/continue'><Button disabled = {sellerPhone ? false : true} fullWidth = {true}>Next</Button></Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className='text-sm font-normal w-fit mx-auto'>Existing user? <a href="/buyer/login" className='text-[#121212] font-bold'>Log in here</a></p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Register
