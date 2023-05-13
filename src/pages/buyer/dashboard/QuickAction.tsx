import { useState } from "react"
import { Button } from "../../../components/reuseable/Button";
import Header from "../../../components/reuseable/Header"
import TextField from "../../../components/reuseable/TextField1";
import copy from '../../../assets/Icons/copy.svg'
import LockMoneyBox from "../../../components/reuseable/LockMoneyBox";
import check from '../../../assets/Icons/check.svg'
import LockNewAmount from "./LockNewAmount";
import EditLockedAmount from "../../../components/buyers/EditLockedAmount";
import lockDatas from "../../../util/lockDatas";
import UnlockAmount from "../../../components/buyers/UnlockAmount";


const QuickAction = () => {
  const [openTab, setOpenTab] = useState(1);
  const [openTabs, setOpenTabs] = useState(1);
  //lock
  const [lock, setLock] = useState(false)
  const [editLocked, setEditLocked]= useState(false)
  const [unlock, setUnlock] = useState(false)
  // 
  const [pin, setPin] = useState("")
  // withdraw
  const [value, setValue] = useState("") 
  const [isWithdraw, setIsWithdraw] = useState(false);

  const handlePin =(e:any)=>{
    setPin(e.target.value)
  }
  const handleChange = (e:any)=>{
    setValue(e.target.value)
  }
  //lock function
  const handleEdit =(e:any)=>{
    let data = e.target.value
    setEditLocked(true)
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
                  <div onClick={()=>setEditLocked(true)}>
                    {lockDatas.map(({date, heading, text}:any, key:any)=>(
                    <LockMoneyBox 
                      date={date}
                      heading={heading}
                      text={text}
                      key={key}
                    />
                    ))}
                  </div>
                  { editLocked && 
                    <EditLockedAmount
                      setEditLocked = {setEditLocked}
                    />
                  }
                  <div className="w-[343px] mt-6 mb-16"><Button fullWidth onClick={()=> setLock(true)}>Lock new amount</Button></div>
                  { lock &&(
                    <LockNewAmount 
                      setLock = {setLock}
                    />
                  )}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  {/* Unlock Money Tab ***************************************** */}
                  <p className="max-w-[449px] text-base font-normal">Click on the card with the information of the item you want to unlock and click on the unlock button. That’s it.</p>
                  <div onClick={()=>setUnlock(true)}>
                    {lockDatas.map(({date, heading, text}:any, key:any)=>(
                    <LockMoneyBox 
                      date={date}
                      heading={heading}
                      text={text}
                      key={key}
                    />
                    ))}
                  </div>
                  { unlock && 
                    <UnlockAmount
                      setUnlock = {setUnlock}
                    />
                  }
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
    </div>
  )
}


export default QuickAction