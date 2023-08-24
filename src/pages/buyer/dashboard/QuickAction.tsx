import { useEffect, useState } from "react";
import { Button } from "../../../components/reuseable/Button";
import Header from "../../../components/reuseable/Header";
import TextField from "../../../components/reuseable/TextField1";
import * as Tabs from "@radix-ui/react-tabs";
import copy from "../../../assets/Icons/copy.svg";
import LockMoneyBox from "../../../components/reuseable/LockMoneyBox";
import check from "../../../assets/Icons/check.svg";
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
import { useBanks, useUser } from "../../../hooks/queries";
import { useTabStore } from "../../../store";
import { toast } from "react-toastify";

const QuickAction = () => {
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const [openTab, setOpenTab] = useState(1);
  const [openTabs, setOpenTabs] = useState(1);
  //lock
  const [lock, setLock] = useState(false);
  const [editLocked, setEditLocked] = useState(false);
  const [unlock, setUnlock] = useState(false);
  //
  const [pin, setPin] = useState("");
  // withdraw
  const [value, setValue] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);

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
  const { handleSubmit: handleSubmitWithdraw, control: controlWithdraw } =
    useForm();
  const { mutate: depositMutate, isLoading: depositLoading } =
    useDepositMoney();
  const {
    mutate: withdrawMutate,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess,
  } = useWithdraw();
  const {
    mutate: withdrawFeeMutate,
    isLoading: withdrawFeeLoading,
    data: withdrawFeeData,
  } = useWithdrawFee();
  const { defaultTab } = useTabStore();

  const { data: user } = useUser();

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
  useEffect(() => {
    if (withdrawSuccess) {
      setIsWithdraw(true);
    }
  }, []);
  return (
    <div>
      <Header
        Heading="Quick Actions"
        Text="You can either deposit, lock, unlock and/or withdraw your money here."
      />
      {/* tabs ************************************************************* */}
      <Tabs.Root className="max-w-[460px] " defaultValue={defaultTab}>
        <Tabs.List
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
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
          <Tabs.Content className="w-[350px]" value="depositMoney">
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
          <Tabs.Content className="" value="unlockMoney">
            <p className="max-w-[449px] text-base font-normal">
              Click on the card with the information of the item you want to
              unlock and click on the unlock button. That’s it.
            </p>
            <div onClick={() => setUnlock(true)}>
              {lockDatas.map(({ date, heading, text }: any, key: any) => (
                <LockMoneyBox
                  date={date}
                  heading={heading}
                  text={text}
                  key={key}
                />
              ))}
            </div>
            {unlock && <UnlockAmount setUnlock={setUnlock} />}
          </Tabs.Content>
          <Tabs.Content className="" value="withdrawMoney">
            <form
              onSubmit={handleSubmitWithdraw((data) => {
                delete data.accountName;
                delete data.accountNumber;
                withdrawMutate({
                  ...data,
                  accountNumber: accNum,
                  bankCode: "035",
                });
                
              })}
              className="relative"
            >
              {withdrawLoading && <LoadingOverlay />}

              <p className="max-w-[449px] text-base font-normal">
                In a case of a dispute with a seller, you can choose to withdraw
                your money into your bank account.
              </p>
              <h1 className="mt-8 text-[#EDEDED] text-lg font-medium">
                SENDER ADDITIONAL INFORMATION
              </h1>
              <div>
                <TextField
                  control={controlWithdraw}
                  rules={{ required: "this field is required" }}
                  label="How much are you withdrawing?"
                  placeholder="e.g 20,000"
                  name={"amount"}
                  type="number"
                />

                <TextField
                  control={controlWithdraw}
                  rules={{ required: "this field is required" }}
                  name={"description"}
                  label="Reason for withdrawing (description)"
                />
              </div>
              <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
                RECEIVER ACCOUNT INFORMATION
              </h1>
              <div className="mt-6 flex flex-col gap-4">
                <div className="w-full mb-3 ">
                  <label htmlFor={"selectBank"} className="block">
                    select bank
                  </label>
                  <select
                    className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
                    // {...register(name)}
                  >
                    {banks?.data?.map((bank: any) => (
                      <option key={bank.slug} value={bank.slug}>
                        {bank.name}
                      </option>
                    ))}
                    {bankIsLoading && <option value="">loading...</option>}
                  </select>
                  {/* {errors[name] && (
                        <span className="text-red-500 text-xs pt-1 block">
                          {errors[name]?.message as string}
                        </span>
                      )} */}
                </div>
                <TextField
                  control={controlWithdraw}
                  label="Enter account number"
                  placeholder="e.g 4758593837"
                  name={"accountNumber"}
                  value={accNum}
                  onChange={(e) => {
                    setAccNum(e.target.value);
                  }}
                />
                <div className="relative">
                  {LookupIsLoading && <LoadingOverlay />}
                  <TextField
                    readOnly={true}
                    control={controlWithdraw}
                    name={"accountName"}
                    label="Account Name"
                    value={LookupData?.data.accountName}
                    placeholder="e.g JMusty Feet"
                  />
                </div>
                {/* <TextField
                control={controlWithdraw}
                rules={{ required: "this field is required" }}
                label="Phone number"
                placeholder="+234 8345687945"
                value={value}
                name={"text"}
              /> */}
              </div>
              <div className="mt-6 mb-16">
                <Button
                  // disabled={value ? false : true}
                  fullWidth
                  type="submit"
                >
                  Withdraw amount
                </Button>
              </div>
              {isWithdraw && (
                <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-1">
                  <div className="w-[400px] bg-white p-[20px] rounded-[5px] flex flex-col items-center">
                    <img
                      className="p-4 bg-[#ECFDF3] rounded-[50%]"
                      src={check}
                      alt="check"
                    />
                    <h6 className="h6">[Amount] Withdrawn!👍🏾</h6>
                    <p className="mt-4 text-center text-base font-normal leading-[21.6px]">
                      Weldone! You have successfully withdrawn [amount]. You
                      should receive a credit alert in seconds.
                    </p>
                    <div className=" mt-4 w-[300px]">
                      <Button
                        disabled={false}
                        fullWidth={true}
                        onClick={() => setIsWithdraw(false)}
                      >
                        Return to dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default QuickAction;
