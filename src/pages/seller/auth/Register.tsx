import {useState} from "react";
import logo from "../../../assets/Icons/logo.svg"
import phoneImage from "../../../assets/images/R-phone.png"
import mphone from "../../../assets/images/m-phone.png"
import { Button } from '../../../components/reuseable/Button';
import TextField from '../../../components/reuseable/TextField';
import {Link} from 'react-router-dom'


const Register = ({ setActiveTab}:any) => {
  // tabs
  const [openTab, setOpenTab] = useState(2);
  //buyer
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail ] = useState("")
  const [password, setPassword] = useState("")
  //seller
  const [sellerEmail, setSellerEmail] = useState("")
  const [sellerPassword, setSellerPassword] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")

  //buyer functions
  const handleName=(e:any)=>{
    let name = e.target.value
    setName(name)
  }
  const handlePhone=(e:any)=>{
    let phone = e.target.value
    setPhone(phone)
  }
  const handleEmail=(e:any)=>{
    let email= e.target.value
    setEmail(email)
  }
  const handlePassword=(e:any)=>{
    let password = e.target.value
    setPassword(password)
  }
  //seller functions
  const handleSellerEmail=(e:any)=>{
    let sellerEmail = e.target.value
    setSellerEmail(sellerEmail)
  }
  const handleSellerPassword=(e:any)=>{
    let sellerPassword= e.target.value
    setSellerPassword(sellerPassword)
  }
  const handleBankName=(e:any)=>{
    let bankName = e.target.value
    setBankName(bankName)
  }
  const handleAccountNumber=(e:any)=>{
    let accountNumber = e.target.value
    setAccountNumber(accountNumber)
  }
  const handleClick=(e:any)=>{
    setActiveTab(2)
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
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      
                    </div>
                    {/* create account as seller */}
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <form>
                        <h6 className='mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]'>Create your account now</h6>
                        <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>Create your account in seconds and enjoy the full features of MyBalance.</p>
                        <div className='grid gap-y-3.5'>
                          <TextField value={sellerEmail} onChange={handleSellerEmail}  label = "Email" placeholder='e.g tmusty@gmail.com'/>
                          <TextField value={sellerPassword} type="password" onChange={handleSellerPassword} label = "Add password" placeholder='************'/>
                          <TextField value={bankName} onChange={handleBankName}  label = "Bank name" placeholder='e.g UBA'/>
                          <TextField value={accountNumber} onChange={handleAccountNumber} label = "Bank account number" type="phone" placeholder='e.g 0000000000'/>
                          <Link to='identity'><Button disabled = {accountNumber ? false : true} fullWidth = {true}>Next</Button></Link>
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

export default Register
