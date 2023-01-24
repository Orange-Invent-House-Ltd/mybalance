import {useState} from "react";
import logo from "../../../assets/Icons/logo.svg"
import phoneImage from "../../../assets/images/R-phone.png"
import mphone from "../../../assets/images/m-phone.png"
import { Button } from '../../../components/reuseable/Button';
import TextField from '../../../components/reuseable/TextField';
import {Link} from 'react-router-dom'


const RegisterIdentity = () => {
  // tabs
  const [openTab, setOpenTab] = useState(2);

  //seller
  const [sellerEmail, setSellerEmail] = useState("")
  const [idNumber, setIdNumber] = useState("")

  //seller functions
  const handleSellerEmail=(e:any)=>{
    let sellerEmail = e.target.value
    setSellerEmail(sellerEmail)
  }
  const handleIdNumber=(e:any)=>{
    let idNumber= e.target.value
    setIdNumber(idNumber)
  }

  return ( 
    <div className=' md:flex justify-center flex-row-reverse'>
      {/* mobile header */}
      <header className='md:hidden ml-[5%] mb-4 mt-[5%] '>
        <Link to="/buyer/register"><img src={logo} alt="my-balance" /></Link>
      </header>
      <div className='md:w-[48%] lg:w-[35%]'>
        <img src={phoneImage} alt="Image of a phone" className="hidden md:flex" />
      </div>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%] "/>
      
      <div className='md:w-[52%] lg:w-[65%]'>
        {/* Desktop header */}
        <header className='hidden md:flex ml-[5%] mt-[5%]'>
          <Link to="/buyer/register"><img src={logo} alt="my-balance" /></Link>
        </header>
        
        <div className='w-[343px] mx-auto my-6 '>
          {/* tabs */}
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
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
                    {/* create account as buyer */}
                    {/* <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    </div> */}
                    {/* create account as seller */}
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <form>
                        <h6 className='mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]'>We need your identity</h6>
                        <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>Enter your NIN, Int’l passport, Driver’s license or Voter’s card number below.</p>
                        <div className='grid gap-y-3.5'>
                          <form action="">
                            <label htmlFor="ID" className="text-sm mb-[6px] capitalize block">Means of ID</label>
                            <select name="ids" id="ids" className="border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] mb-6">
                              <option value="select">Select</option>
                              <option value="nin">NIN</option>
                              <option value="international passport">International Passport</option>
                              <option value="voter’s card">Voter’s Card</option>
                              <option value="driver’s license">Driver’s License</option>
                            </select>
                            <TextField value={idNumber} type="phone" onChange={handleIdNumber} label = "Valid ID number" placeholder='e.g 1234 1234 123'/>
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
            <p className='text-sm font-normal w-fit mx-auto'>Existing user? <a href="/seller/login" className='text-[#121212] font-bold'>Log in here</a></p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RegisterIdentity
