import { useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "../../../components/reuseable/Button";
import Header from "../../../components/reuseable/Header"
import TextField from "../../../components/reuseable/TextField";
import copy from '../../../assets/Icons/copy.svg'
import LockMoneyBox from "../../../components/reuseable/LockMoneyBox";
import lockicon from '../../../assets/Icons/lock.svg'
import check from '../../../assets/Icons/check.svg'
import logo from '../../../assets/Icons/logo.svg'
import handburger from '../../../assets/Icons/handburger.svg'
import close from '../../../assets/Icons/close.svg'
import twitter from '../../../assets/Icons/Twitter.svg'
import linkedin from '../../../assets/Icons/LinkedIn.svg'
import  facebook from '../../../assets/Icons/Facecook.svg'


const QuickAction = () => {
  const [openTab, setOpenTab] = useState(1);
  const [openTabs, setOpenTabs] = useState(1);
  // 
  const [pin, setPin] = useState("")
  // withdraw
  const [value, setValue] = useState("") 
  const [isWithdraw, setIsWithdraw] = useState(false);
  // mobile menu
  const[sidebar, setSidebar] = useState(false)

  const handlePin =(e:any)=>{
    setPin(e.target.value)
  }
  const handleChange = (e:any)=>{
    setValue(e.target.value)
  }
  // mobile menu
  const showSidebar =()=>{
    setSidebar(!sidebar)
  }

  return (
    <div>
      <Header
        Heading='Quick Actions'
        Text='You can either deposit, lock, unlock and/or withdraw your money here.'
      />
      {/* tabs ************************************************************* */}
      <div className="flex flex-wrap ">
        <div className="">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase p-3 block leading-normal " +
                  (openTab === 1
                    ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)] focus:bg-[#FFF2E8]"
                    : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D] hover:bg-[#FFF2E8]")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >Deposit money</a>
            </li>
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase p-3  block leading-normal " +
                  (openTab === 2
                    ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)] focus:bg-[#FFF2E8]"
                    : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D] hover:bg-[#FFF2E8]")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >Lock money</a>
            </li>
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase p-3  block leading-normal " +
                  (openTab === 3
                    ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)] focus:bg-[#FFF2E8]"
                    : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D] hover:bg-[#FFF2E8]")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >Unlock money</a>
            </li>
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase p-3  block leading-normal " +
                  (openTab === 4
                    ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)] focus:bg-[#FFF2E8]"
                    : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D] hover:bg-[#FFF2E8]")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >Withdraw money</a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {/* Inner Tabs ***********************************************/}
                  <div className="flex flex-wrap ">
                    <div className="">
                      <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                      >
                        <li className="-mb-px last:mr-0 flex-auto text-center">
                          <a
                            className={
                              "text-xs font-bold uppercase p-3 block leading-normal " +
                              (openTabs === 1
                                ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)] focus:bg-[#FFF2E8]"
                                : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D] hover:bg-[#FFF2E8]")
                            }
                            onClick={e => {
                              e.preventDefault();
                              setOpenTabs(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                          >Use a bank card</a>
                        </li>
                        <li className="-mb-px last:mr-0 flex-auto text-center">
                          <a
                            className={
                              "text-xs font-bold uppercase p-3  block leading-normal " +
                              (openTabs === 2
                                ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)] focus:bg-[#FFF2E8]"
                                : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D] hover:bg-[#FFF2E8]")
                            }
                            onClick={e => {
                              e.preventDefault();
                              setOpenTabs(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                          >Deposit via transfer</a>
                        </li>
                      </ul>
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
                        <div className="px-4 py-5 flex-auto">
                          <div className="tab-content tab-space">
                            <div className={openTabs === 1 ? "block" : "hidden"} id="link1">
                              {/* BanK Card Contents ************************ */}
                              <div className="mb-4 flex flex-col gap-4 ">
                                <TextField 
                                  placeholder="********************"
                                  label="Card number"
                                />
                                <div className="flex gap-4">
                                  <TextField 
                                    placeholder="-- / -- / ----"
                                    label="Expiry date"
                                  />
                                  <TextField 
                                    placeholder="***"
                                    label="CVV"
                                  />
                                </div>
                                <TextField 
                                  placeholder="e.g 10,000"
                                  label="Enter amount to deposit"
                                />
                                <TextField 
                                  placeholder="****"
                                  label="Enter your 4-digit PIN"
                                  value={pin}
                                  onChange={handlePin} 
                                />
                                <Button disabled={ pin? false : true}>Pay now</Button>
                              </div>
                            </div>
                            <div className={openTabs === 2 ? "block" : "hidden"} id="link2">
                              <div className="pt-16 border border-[#FFF2E8] rounded">
                                <p className="pl-6 text-base font-normal">Your account number</p>
                                <h4 className="pl-6 my-4 text-[32px] font-bold">1234567890</h4>
                                <p className="pl-6 text-base font-normal">Access Bank</p>
                                <div className="mt-6 py-4 bg-[#FFF2E8] text-center cursor-pointer"><img src={copy} alt="copy" className="w-[20px] inline"/> Copy to clipboard</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {/* Lock Money Tab ***************************************** */}
                  <p className="w-[344px] text-base font-normal">Locked amount shows you a list of amount you have locked over a period of time.</p>
                  <LockMoneyBox
                    lockicon= {lockicon}
                    date="Dec 15, 2022 4:56 PM"
                    heading="White Air Jordans"
                    text="Pair of white Air Jordans from Young Jonn"
                  />
                  <LockMoneyBox
                    lockicon= {lockicon}
                    date="Dec 15, 2022 4:56 PM"
                    heading="White Nike Air Max"
                    text="Pair of white Nike Air Max from Young Jonn"
                  />
                  <div className="w-[343px] mt-6 mb-16"><a href="/buyer/lock"><Button fullWidth>Lock new amount</Button></a></div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  {/* Unlock Money Tab ***************************************** */}
                  <p className="max-w-[449px] text-base font-normal">Click on the card with the information of the item you want to unlock and click on the unlock button. That’s it.</p>
                  <LockMoneyBox
                    lockicon= {lockicon}
                    date="Dec 15, 2022 4:56 PM"
                    heading="White Air Jordans"
                    text="Pair of white Air Jordans from Young Jonn"
                  />
                  <LockMoneyBox
                    lockicon= {lockicon}
                    date="Dec 15, 2022 4:56 PM"
                    heading="White Nike Air Max"
                    text="Pair of white Nike Air Max from Young Jonn"
                  />
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  {/* Withdraw Money Tab ***************************************** */}
                  <p className="max-w-[449px] text-base font-normal">In a case of a dispute with a seller, you can choose to withdraw your money into your bank account.</p>
                  <h1 className='mt-8 text-[#EDEDED] text-lg font-medium'>SENDER ADDITIONAL INFORMATION</h1>
                  <div>
                    <TextField 
                      label="How much are you withdrawing?"
                      placeholder="e.g 20,000"
                    />
                    <TextField 
                      label="Reason for withdrawing (description)"
                      placeholder="****"
                    />
                  </div>
                  <h1 className='mt-6 text-[#EDEDED] text-lg font-medium'>RECEIVER ACCOUNT INFORMATION</h1>
                  <div className='mt-6 flex flex-col gap-4'>
                    <TextField 
                      label='Select bank'
                      placeholder='e.g UBA'
                    />
                    <TextField 
                      label='Select account name'
                      placeholder='e.g John Buz'
                    />
                    <TextField 
                      label='Enter account number'
                      placeholder='e.g 4758593837'
                    />
                    <TextField 
                      label='Phone number'
                      placeholder='+234 8345687945'
                      value={value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mt-6 mb-16'><Button disabled={value? false : true} fullWidth onClick={()=> setIsWithdraw(true) }>Withdraw amount</Button></div>
                  { isWithdraw && (
                    <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-1">
                      <div className="w-[400px] bg-white p-[20px] rounded-[5px] flex flex-col items-center">
                        <img className='p-4 bg-[#ECFDF3] rounded-[50%]' src={check} alt="check" />
                        <h6 className='h6'>[Amount] Withdrawn!👍🏾</h6>
                        <p className='mt-4 text-center text-base font-normal leading-[21.6px]'>Weldone! You have successfully withdrawn [amount]. You should receive a credit alert in seconds.</p>
                        <div className=' mt-4 w-[300px]'>
                        <Button disabled = {false} fullWidth = {true} onClick={() => setIsWithdraw(false) }>Return to dashboard</Button>
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
      {/* Mobile footer */}
      <div className="pl-8 mt-24 mb-16 md:hidden">
        <div className="flex gap-6 mb-2 ">
          <img src={twitter} alt="Twitter" />
          <img src={linkedin} alt="LinkedIn" />
          <img src={facebook} alt="Facebook" />
        </div>
        <p className='text-[#121212] text-base font-medium mt-4'>© 2022 MyBalance. All rights reserved.</p>
      </div>
    </div>
  )
}

const sidebarDatas = [
  {
    title: "Dashboard",
    path: "/buyer/dashboard",
    icon: <svg className="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none">
          <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" clip-path="url(#a)">
          <path d="M12 15.592a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM13.45 12.142l2.05-2.05"/><path d="M6.4 20.591a9 9 0 1 1 11.2 0H6.4Z"/></g><defs>
          <clipPath id="a"><path fill="#fff" d="M0 .592h24v24H0z"/></clipPath></defs>
          </svg>
  },
  {
    title: "Quick action",
    path: "/buyer/quick-action",
    icon: <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9996 1.5918L13.4996 19.5918C13.4557 19.6875 13.3853 19.7687 13.2966 19.8256C13.208 19.8824 13.1049 19.9127 12.9996 19.9127C12.8943 19.9127 12.7912 19.8824 12.7025 19.8256C12.6139 19.7687 12.5435 19.6875 12.4996 19.5918L8.99958 12.5918L1.99958 9.0918C1.90384 9.04792 1.82271 8.97748 1.76583 8.88885C1.70895 8.80021 1.67871 8.69711 1.67871 8.5918C1.67871 8.48648 1.70895 8.38338 1.76583 8.29475C1.82271 8.20611 1.90384 8.13567 1.99958 8.0918L19.9996 1.5918Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
  },
  {
    title: "Transaction history",
    path: "/buyer/transaction-history",
    icon: <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" clip-path="url(#a)">
          <path d="M19 4.592H5a2 2 0 1 0 0 4h14a2 2 0 1 0 0-4ZM5 8.592v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-10M10 12.592h4"/></g><defs>
          <clipPath id="a"><path fill="#fff" d="M0 .592h24v24H0z"/></clipPath></defs>
          </svg>
  },
  {
    title: "Notifications",
    path: "/buyer/notifications",
    icon: <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none">
            <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" clip-path="url(#a)">
            <path d="M10 5.592a2 2 0 1 1 4 0 7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17.592v1a3 3 0 0 0 6 0v-1"/></g><defs>
            <clipPath id="a"><path fill="#fff" d="M0 .592h24v24H0z"/></clipPath></defs>
          </svg>
  },
  {
    title: "Customer support",
    path: "/buyer/customer-support",
    icon: <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
  },
  {
    title: "My profile",
    path: "/buyer/profile",
    icon: <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
  },
  {
    title: "Dispute resolution",
    path: "/buyer/dispute-resolution",
    icon: <svg className="w-6 h-6 stroke-current" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9.5918C9 6.6318 7 2.5918 6 1.5918C6 4.6298 4.227 6.3328 3 7.5918C1.774 8.8518 1 10.8318 1 12.5918C1 14.1831 1.63214 15.7092 2.75736 16.8344C3.88258 17.9597 5.4087 18.5918 7 18.5918C8.5913 18.5918 10.1174 17.9597 11.2426 16.8344C12.3679 15.7092 13 14.1831 13 12.5918C13 11.0598 11.944 8.6518 11 7.5918C9.214 10.5918 8.209 10.5918 7 9.5918Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
  },
  {
    title: "Settings",
    path: "/buyer/settings",
    icon: <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" clip-path="url(#a)">
          <path d="M10.325 4.909c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.723 1.723 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065Z"/>
          <path d="M12 15.592a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 .592h24v24H0z"/></clipPath></defs>
          </svg>
  },
  {
    title: "Logout",
    path: "/buyer",
    icon: <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none"><g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" clip-path="url(#a)">
          <path d="M14 8.592v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"/><path d="M7 12.592h14l-3-3m0 6 3-3"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 .592h24v24H0z"/></clipPath></defs>
          </svg>
  }
]

export default QuickAction