import {useState} from 'react'
import logo from "../../../assets/Icons/logo.svg"
import mphone from "../../../assets/images/m-phone.png"
import phone from "../../../assets/images/R-phone.png"
import check from "../../../assets/Icons/check.svg"
import { Button } from '../../../components/reuseable/Button';
import ReactInputVerificationCode from 'react-input-verification-code';
import { Link } from 'react-router-dom'
import "./Regverification.css"



const RegVerification = () => {
  // tabs
  const [activeTab, setActiveTab] = useState(1);
 

  const [verifyValue, setVerifyValue] = useState("")
  const [isVerify, setIsVerify] = useState(false);

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
          <Link to="/buyer/register"><img src={logo} alt="my-balance" /></Link>
        </header>
        
        <div className='w-[365px] md::w-[376px] my-8 mx-auto'>
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
                      (activeTab === 1
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setActiveTab(1);
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
                      (activeTab === 2
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={e => {
                      e.preventDefault();
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
                <div className="mx-auto py-5 flex-auto">
                  <div className="tab-content tab-space">
                    {/* create account as customer */}
                    <div className={activeTab === 1 ? "block" : "hidden"} id="link1">
                      <h6 className='h6'>Check your email</h6>
                      <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>We sent a verification link to [emailAddressSupplied]</p>
                      <div className='grid gap-y-3.5'>
                        <div className="custom-styles">
                          <ReactInputVerificationCode 
                            value={verifyValue}
                            onChange={setVerifyValue} 
                            autoFocus
                            length={6}
                            placeholder=""
                          />
                        </div>
                        <Button disabled = {verifyValue ? false : true} fullWidth = {true} onClick={() => setIsVerify(true)}>Verify</Button>
                      </div>
                      {isVerify && (
                        <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-1">
                          <div className="w-[400px] bg-white p-[20px] rounded-[5px] flex flex-col items-center">
                            <img className='p-4 bg-[#ECFDF3] rounded-[50%]' src={check} alt="check" />
                            <h6 className='h6'>ACCOUNT CREATED! 👍🏾</h6>
                            <p className='mt-4 text-center text-base font-normal leading-[21.6px]'>Weldone! You have successfully created an account with MyBalance. Let’s get you started.</p>
                            <div className=' mt-4 w-[300px]' >
                            <Link to= "/buyer/dashboard"><Button disabled = {false} fullWidth = {true} onClick={() => setIsVerify(false)}>Continue</Button></Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className='text-sm font-normal mt-6 text-center'>Existing user? <a href="/buyer/login" className='text-[#121212] font-bold'>Log in here</a></p>
        </div>
      </div>
    </div>
  )
}

export default RegVerification