import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/reuseable/Button";
import Header from "../../../components/reuseable/Header";
import TextField from "../../../components/reuseable/TextField1";
import * as Tabs from "@radix-ui/react-tabs";
import copy from "../../../assets/Icons/copy.svg";
import check from "../../../assets/Icons/check.svg";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import LockMoneyBox from "../../../components/reuseable/LockMoneyBox";
import LockNewAmount from "./LockNewAmount";
import EditLockedAmount from "../../../components/buyers/EditLockedAmount";
import lockDatas from "../../../util/lockDatas";
import UnlockAmount from "../../../components/buyers/UnlockAmount";
import {
  useDepositMoney,
  useLookUpBank,
  useWithdraw,
  useWithdrawFee,
} from "../../../hooks/mutations";
import { useForm } from "react-hook-form";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { useBanks, useLockedFunds, useUser } from "../../../hooks/queries";
import { useTabStore } from "../../../store";
import { toast } from "react-toastify";
import loading from "../../../assets/Icons/loadingSpinner.svg";
import WithdrawMoney from "../../../components/buyers/quickActions/WithdrawMoney";
import { useNavigate } from "react-router-dom";
import EmptyMoney from "../../../components/reuseable/EmptyMoney";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";

const QuickAction = () => {
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState(1);
  const [openTabs, setOpenTabs] = useState(1);
  const [successModal, setSuccessModal] = useState(false);

  //lock
  const [lock, setLock] = useState(false);
  const [editLocked, setEditLocked] = useState(false);
  const [unlock, setUnlock] = useState(false);
  //
  const [pin, setPin] = useState("");
  // withdraw
  const [value, setValue] = useState("");

  const handlePin = (e: any) => {
    setPin(e.target.value);
  };
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  //lock function
  const handleEdit = (e: any) => {
    let data = e.target.value;
    setEditLocked(true);
  };

  const { handleSubmit: handleSubmitDeposit, control: controlDeposit } =
    useForm();

  const { mutate: depositMutate, isLoading: depositLoading } =
    useDepositMoney();

  const { defaultTab } = useTabStore();
  const [page, setPage] = useState<number>(1);

  const { data: user } = useUser();
  const { data: lockedFunds, isLoading: lockedFundsLoading } =
    useLockedFunds(page);
  console.log(
    "🚀 ~ file: QuickAction.tsx:69 ~ QuickAction ~ lockedFunds:",
    lockedFunds
  );

  const [accNum, setAccNum] = useState("");
  const [code, setCode] = useState("");
  const {
    data: LookupData,
    mutate: LookupMutate,
    isLoading: LookupIsLoading,
  } = useLookUpBank();
  useEffect(() => {
    if (accNum.length === 10) {
      // LookupMutate({ bankCode: code, accountNumber: accNum });
      LookupMutate({ bankCode: "035", accountNumber: accNum });
    }
  }, [accNum, code]);
  const handlePageChange = useCallback(({ selected }: any) => {
    setPage(selected + 1);
  }, []);

  return (
    <>
      {/* <div className="w-screen h-screen flex items-center justify-center  absolute top-0 left-00 z-[900] bg-black/20 ">
        <img
          src={loading}
          className="animate-spin mx-auto "
          alt="loading spinner"
        />
        <p className="text-center">Loading! Please wait ...</p>
      </div> */}
      <Header
        Heading="Quick Actions"
        Text="You can either deposit, lock, unlock and/or withdraw your money here."
      />
      {/* tabs ************************************************************* */}
      <Tabs.Root defaultValue={defaultTab}>
        <Tabs.List
          className="flex mb-0 list-none whitespace-nowrap overflow-x-auto pt-3 pb-4 flex-row"
          aria-label="Manage your account"
        >
          <Tabs.Trigger className="tab " value="depositMoney">
            Deposit money
          </Tabs.Trigger>
          <Tabs.Trigger className="tab" value="unlockMoney">
            unlock money
          </Tabs.Trigger>
          <Tabs.Trigger className="tab" value="withdrawMoney">
            withdraw money
          </Tabs.Trigger>
        </Tabs.List>

        <div className="mt-10 ">
          <Tabs.Content className="w-full max-w-[350px]" value="depositMoney">
            <div className="relative">
              {depositLoading && <LoadingOverlay />}

              {/* BanK Card Contents ************************ */}
              <form
                onSubmit={handleSubmitDeposit((data) => {
                  depositMutate(data.amount);
                })}
                className="mb-4 flex flex-col gap-4 "
              >
                <TextField
                  control={controlDeposit}
                  placeholder="e.g 10,000"
                  label="Enter amount to deposit"
                  name="amount"
                  rules={{
                    required: "this field is required",
                  }}
                  type="number"
                />
                <Button>Continue</Button>
              </form>
            </div>
          </Tabs.Content>
          <Tabs.Content className="w-full max-w-[449px]" value="unlockMoney">
            <p className=" text-base font-normal">
              Click on the card with the information of the item you want to
              unlock and click on the unlock button. That’s it.
            </p>
            <div className=" ">
              {lockedFunds?.data?.map((data: any) => (
                <div
                  onClick={() => {
                    setUnlock(true);

                    localStorage.setItem(
                      "transactionInfo",
                      JSON.stringify(data)
                    );
                  }}
                  key={data.id}
                >
                  <LockMoneyBox
                    date={new Date(data.createdAt).toLocaleString()}
                    heading={data.meta.title}
                    text={data.meta.description}
                  />
                </div>
              ))}
              {lockedFunds?.data.length === 0 && <EmptyMoney />}
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                // initialPage={data?.meta?.currentPage - 1}
                initialPage={lockedFunds?.meta?.currentPage - 1 || 0}
                onPageChange={handlePageChange} // Use the handlePageChange function
                pageRangeDisplayed={5}
                pageCount={lockedFunds?.meta?.totalPages}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                pageClassName="border border-[#6D6D6D] flex item-center justify-center h-[30px] w-[30px] py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer "
                previousClassName="border border-[#6D6D6D] p-2 py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer"
                nextClassName="border border-[#6D6D6D] p-2 py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer"
                containerClassName="flex gap-3 mt-10 ml-10 items-center "
                // Adjust for 0-based page numbering
                activeClassName="bg-[#FD7E14] text-white"
                breakClassName="page-item"
              />
            </div>
            {unlock && (
              <UnlockAmount
                setSuccessModal={setSuccessModal}
                setUnlock={setUnlock}
                unlock={unlock}
              />
            )}
            {lockedFundsLoading && (
              <div className="flex flex-col gap-3 w-full max-w-[676px]">
                <Skeleton className="w-full h-[100px] " />
                <Skeleton className="w-full h-[100px] " />
                <Skeleton className="w-full h-[100px] " />
                <Skeleton className="w-full h-[100px] " />
                <Skeleton className="w-full h-[100px] " />
                <Skeleton className="w-full h-[100px] " />
              </div>
            )}
            {successModal && (
              <div className=" fixed  top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-50  ">
                <div className="w-[400px] animate-jump bg-white p-[20px] rounded-[5px] flex flex-col ">
                  <div className="flex items-center w-fit rounded-full bg-[#ECFDF3] justify-center">
                    <img className="   " src={check} alt="check" />
                  </div>

                  <h6 className="font-semibold text-lg">
                    New Amount Unlocked! 👍🏾
                  </h6>
                  <p className="mt-2   text-base font-normal leading-[21.6px]">
                    Weldone! You have successfully unlocked [amount]. It will
                    reflect in your unlocked amount on your dashboard.
                  </p>
                  <div className="w-full space-y-2 mt-2">
                    <Button
                      fullWidth={true}
                      success
                      variant="black-outlined"
                      onClick={() => setSuccessModal(false)}
                    >
                      Unlock another amount
                    </Button>
                    <Button
                      fullWidth={true}
                      onClick={() => navigate("/buyer/dashboard")}
                      success
                    >
                      Return to dashboard
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Tabs.Content>
          <WithdrawMoney />
        </div>
      </Tabs.Root>
    </>
  );
};

export default QuickAction;
