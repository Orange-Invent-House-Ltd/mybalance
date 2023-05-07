import {useState} from "react";
import logo from "../../../assets/Icons/logo.svg"
import phoneImage from "../../../assets/images/R-phone.png"
import mphone from "../../../assets/images/m-phone.png"
import { Button } from '../../../components/reuseable/Button';
import TextField from '../../../components/reuseable/TextField';
import {Link} from 'react-router-dom'
import facebook from '../../../assets/Icons/Facebook.svg'
import twitter from '../../../assets/Icons/Twitter.svg'
import linkedin from '../../../assets/Icons/LinkedIn.svg'


const RegisterIdentity = () => {
  // tabs
  const [openTab, setOpenTab] = useState(2);
  const [selectedValue, setSelectedValue] = useState('');
  //seller
  const [idNumber, setIdNumber] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

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
                  <a
                    className={
                      "text-xs font-bold uppercase py-3 block leading-normal " +
                      (openTab === 1
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Create as a customer
                  </a>
                </li>
                {/* seller tab */}
                <li className="-mb-px last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase py-3  block leading-normal " +
                      (openTab === 2
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(2);
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
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <form>
                        <h6 className='mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]'>We need your identity</h6>
                        <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>Enter your NIN, Int’l passport, Driver’s license or Voter’s card number below.</p>
                        <div className='grid gap-y-3.5'>
                          <form action="">
                            <label htmlFor="ID" className="text-sm mb-[6px] capitalize block">Means of ID</label>
                            <select name="ids" id="ids" onChange={handleSelectChange} className="border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] mb-6">
                              <option value="select">Select</option>
                              <option value="international passport">International Passport</option>
                              <option value="nin">NIN</option>
                              <option value="voter’s card">Voter’s Card</option>
                              <option value="driver’s license">Driver’s License</option>
                            </select>
                            { 
                              selectedValue === "international passport" ? (
                                <div>
                                  <TextField type="phone" label = "Passport number" placeholder='1234 1234 123'/>
                                  <TextField value={idNumber} type="text" onChange={e=>setIdNumber(e.target.value)} label = "Last name" placeholder='Saka'/>
                                </div>
                              ) : selectedValue === "nin" ? (
                                <div>
                                  <TextField type="phone" label = "NIN number" placeholder='e.g 1234 1234 123'/>
                                </div>
                              ) : selectedValue === "voter’s card" ? (
                                <div>
                                  <TextField type="phone" label = "Voter’s card number" placeholder='e.g 1234 1234 123'/>
                                  <TextField type="text" label = "First name" placeholder='Bukola'/>
                                  <TextField type="text" label = "Last name" placeholder='Saka'/>
                                  <TextField type="phone" label = "Date of birth" placeholder='e.g DD-MM-YYYY'/>
                                  <div className="flex justify-center gap-4">
                                    <TextField variant = "short" type="text" label = "State" placeholder='Lagos'/>
                                    <TextField variant = "short" type="text" label = "LGA" placeholder='Eti-Osa'/>
                                  </div>
                                </div>
                              ) : selectedValue === "driver’s license" ? (
                                <div>
                                  <TextField label = "Card number" placeholder='e.g 1234 1234 123'/>
                                  <TextField label = "Date of birth number" placeholder='DD-MM-YY'/>
                                </div>
                              ) : ( <></>)
                            }
                            <div className="mt-6">
                              <Link to='verification'><Button disabled = {idNumber ? false : true} fullWidth = {true}>Next</Button></Link>
                            </div>
                          </form>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className='text-sm font-normal mb-7 w-fit mx-auto'>Existing user? <a href="/seller/login" className='text-[#121212] font-bold'>Log in here</a></p>
          </div>
        </div>
        <div className="px-[5%] w-fit mx-auto mb-16 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© 2022 My Balance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={linkedin} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default RegisterIdentity
