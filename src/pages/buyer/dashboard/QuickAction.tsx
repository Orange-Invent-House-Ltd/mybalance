import { useState } from "react"
import Header from "../../../components/reuseable/Header"

const QuickAction = () => {
  const [openTab, setOpenTab] = useState(1);
  
  return (
    <div>
      <Header
        Heading='Quick Actions'
        Text='You can either deposit, lock, unlock and/or withdraw your money here.'
      />
      {/* tabs */}
      <div className="flex flex-wrap ">
        <div className="w-full">
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
                  content
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>Create as a seller</p>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <p>THirds tab</p>
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <p>Fourth tab</p>
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