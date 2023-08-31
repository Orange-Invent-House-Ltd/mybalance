import { useState, useEffect } from "react";
import useStore, { useTabStore } from "../../../store";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { publicApi } from "../../../api/axios";
import { Button } from "../../../components/reuseable/Button";
import { IUserResponse } from "../../../api/types";
import DashboardLockedBox from "../../../components/reuseable/DashboardLockedBox";
import DashboardQuickBox from "../../../components/reuseable/DashboardQuickBox";
import plus from "../../../assets/Icons/plus.svg";
import share from "../../../assets/Icons/share.svg";
import unlock from "../../../assets/Icons/unlock.svg";
import wallet from "../../../assets/Icons/alertWallet.svg";
import download from "../../../assets/Icons/download.svg";
import bell from "../../../assets/Icons/notification.svg";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import TextField from "../../../components/reuseable/TextField1";
import back from "../../../assets/Icons/back.svg";
import { useBanks, useTransactions, useUser } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {
  useCreateEscrow,
  useDepositMoney,
  useLockFunds,
  useLookUpBank,
} from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
const Dashboard = () => {
  const [isVerify, setIsVerify] = useState(false);
  const [accNum, setAccNum] = useState("");
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const store = useStore();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { setTab } = useTabStore();
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, register } = useForm();
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const {
    data: createEscrowData,
    mutate: createEscrowMutate,
    isLoading: createEscrowIsLoading,
    isSuccess: createEscrowIsSuccessful,
  } = useCreateEscrow();
  const {
    data: lockFundsData,
    mutate: lockFundsMutate,
    isLoading: lockFundsLoading,
  } = useLockFunds();
  const {
    data: LookupData,
    mutate: LookupMutate,
    isLoading: LookupIsLoading,
  } = useLookUpBank();

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const {
    mutate: depositMutate,
    isLoading: depositLoading,
    isSuccess: depositSuccess,
  } = useDepositMoney();
  const onSubmit = (data: any) => {
    delete data?.accountName;
    delete data?.accountNumber;
    createEscrowMutate({
      ...data,
      bankCode: "035",
      bankAccountNumber: accNum,
    });
  };
  const { isLoading, data: transactionData } = useTransactions({
    page: 1,
    search: "",
    size: 2,
  });

  useEffect(() => {
    if (depositSuccess) setOpen(false);
  }, [depositSuccess]);
  useEffect(() => {
    if (createEscrowIsSuccessful) {
      console.log("initiated");
      lockFundsMutate(createEscrowData.data.reference);
    }
  }, [createEscrowIsSuccessful]);
  useEffect(() => {
    if (accNum.length === 10) {
      // LookupMutate({ bankCode: code, accountNumber: accNum });
      LookupMutate({ bankCode: "035", accountNumber: accNum });
    }
  }, [accNum, code]);
  return (
    <div className=" overflow-hidden ">
      <div className="md:flex justify-between items-center ">
        <div>
          <h6 className="text-[23px]  items-center gap-2 flex font-medium mb-4 ">
            <span>Welcome</span>
            <span className="font-semibold  flex-1">
              {user?.fullName || <Skeleton width={100} />}
            </span>
          </h6>
          <p className="max-w-[478px] text-[#303030] font-normal text-sm leading-[18.9px] ">
            Your last login was on{" "}
            {user && user.lastLoginDate ? (
              new Date(user.lastLoginDate).toLocaleString()
            ) : (
              <Skeleton width={100} />
            )}
          </p>
        </div>
        <img
          src={bell}
          alt="notification bell"
          className="hidden md:flex ml-auto mr-4"
        />
        <div className="hidden md:flex w-[343px] md:w-[270px]">
          <Button
            fullWidth
            variant="contained"
            onClick={() => setIsVerify(true)}
          >
            Create MyBalance Link
          </Button>
        </div>
        {isVerify && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[400px] bg-white pl-[16px] relative pr-[34px] overflow-y-scroll"
            >
              <div className="flex gap-4 items-center mt-10 mb-4">
                <img src={back} alt="back" onClick={() => setIsVerify(false)} />
                <h6 className="text-[23px] font-medium">
                  Create MyBalance Link
                </h6>
              </div>
              <p className="text-[16px] text-[#303030] font-normal mb-8">
                Create your MyBalance escrow information and share with
                everyone.
              </p>
              <h1 className="text-[#EDEDED] text-lg font-medium">
                ITEM(S) INFORMATION
              </h1>
              <div className="mt-6 flex flex-col gap-4">
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"purpose"}
                  label="Purpose of creating  escrow"
                  placeholder="e.g 20,000"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"itemType"}
                  label="Type of item(s)"
                  placeholder="****"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"itemQuantity"}
                  label="Number of item(s)"
                  placeholder="give a description"
                  type="number"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"amount"}
                  label="Amount"
                  placeholder="give a description"
                  type="number"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"deliveryDate"}
                  label="Delivery timeline"
                  placeholder="Select number of days"
                  type="date"
                />
              </div>
              <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
                VENDOR ACCOUNT INFORMATION
              </h1>
              <div className="mt-6 flex flex-col gap-4">
                <div className="w-full mb-3 ">
                  <label htmlFor={"selectBank"} className="block">
                    select bank
                  </label>
                  <select
                    className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                  >
                    {banks?.data?.map((bank: any) => (
                      <option key={bank.slug} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                    {bankIsLoading && <option value="">loading...</option>}
                  </select>
                </div>
                <TextField
                  control={control}
                  label="Enter Account number"
                  placeholder="1234567890"
                  name={"accountNumber"}
                  onChange={(e) => {
                    setAccNum(e.target.value);
                  }}
                  value={accNum}
                />
                <div className="relative">
                  {LookupIsLoading && <LoadingOverlay />}
                  <TextField
                    readOnly={true}
                    control={control}
                    name={"accountName"}
                    label="Account Name"
                    value={LookupData?.data.accountName}
                    placeholder="e.g JMusty Feet"
                  />
                </div>
                <TextField
                  control={control}
                  rules={{
                    required: "this field is required",
                    pattern: {
                      message: "requires a valid email",
                      value: /\S+@\S+\.\S+/,
                    },
                  }}
                  name={"partnerEmail"}
                  label="Email Address"
                  placeholder="e.g JMustyfeet@gmail.com"
                />
              </div>
              <div className="mt-6 mb-16">
                <Button
                  disabled={createEscrowIsLoading || lockFundsLoading}
                  fullWidth
                  // onClick={() => {
                  //   setIsVerify(false);

                  //   // setOpen(true);
                  // }}
                  type="submit"
                >
                  {createEscrowIsLoading || lockFundsLoading
                    ? "loading..."
                    : " pay now"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="flex   gap-3 mt-16  ">
        <div className="border whitespace-nowrap border-[#9A4D0C]  overflow-hidden relative rounded w-full flex-[0.4] h-[125px] p-6 ">
          <div className="w-[163px] h-[163px]  bg-[#FFF2E8]  rounded-full  top-[-19px] left-[-96px] z-[-10] absolute "></div>
          <div className="w-[66px] h-[66px]  bg-[#FECA9F]  rounded-full  top-[-19px] left-[364px] z-[-10] absolute "></div>

          <p className="mb-2 font-base font-normal leading-[21.6px]">
            Available balance in escrow
          </p>
          <h4 className="font-bold text-[32px] leading-[43.2px]">
            {formatToNairaCurrency(user?.walletBalance || 0)}
          </h4>
        </div>
        <DashboardLockedBox
          Text="Locked amount"
          Amount={formatToNairaCurrency(user?.lockedAmount || 0)}
        />
        <DashboardLockedBox
          Text="Unlocked amount"
          Amount={formatToNairaCurrency(user?.unlockedAmount || 0)}
        />
      </div>
      {/* Create MyBalance link - mobile view */}
      <div className="md:hidden mt-4 p-2 flex justify-between items-center border border-[#FFF2E8]">
        <p className="font-semibold text-sm">Create your MyBalance link.</p>
        <Button onClick={() => setIsVerify(true)}>Create link</Button>
      </div>
      <div className="md:flex justify-between flex-row-reverse">
        <div>
          {/* Right side box - Charges box */}
          <div
            style={{
              boxShadow: " 0px 9px 100px 0px rgba(60, 60, 60, 0.25)",
            }}
            className="border border-#B7B7B7 max-w-[297px] rounded-[10px] mt-16 px-4 py-6"
          >
            <h6 className="text-2xl font-bold  text-[#6D6D6D] ">Our charges</h6>
            <p className="text-sm mt-2 text-[#6D6D6D]">
              We offer very user friendly charges which are range-based. The
              higher the transaction, the lower the charge percentage.
            </p>
            <div className="flex justify-between mt-8 text-[14px]">
              <div className="flex flex-col gap-5">
                <p className="text-[#6D6D6D] text-[16px] font-semibold">
                  Range
                </p>
                <p>Below N100,000</p>
                <p>N100,000 - N500,000</p>
                <p>Above N500,000</p>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-[#6D6D6D] text-[16px] font-semibold">
                  Charges
                </p>
                <p>1.5% per party</p>
                <p>1% per party</p>
                <p>0.8% per party</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h6 className="  mb-6 text-[#6D6D6D] font-bold text-[23px] ">
            Quick actions
          </h6>
          <div className="flex flex-wrap mb-4">
            <Link
              onClick={() => {
                setTab("depositMoney");
              }}
              to="/buyer/quick-action"
              className="mb-4 mr-4"
            >
              <DashboardQuickBox
                icon={plus}
                text="Deposit money"
                subtext="Tap on this to add money to your escrow wallet"
              />
            </Link>
            <Link
              onClick={() => {
                setTab("unlockMoney");
              }}
              to="/buyer/quick-action"
              className="mr-4"
            >
              <DashboardQuickBox
                icon={unlock}
                text="Unlock money"
                subtext="Tap on this to release the money in your wallet"
              />
            </Link>
            <Link
              onClick={() => {
                setTab("withdrawMoney");
              }}
              to="/buyer/quick-action"
              className="mb-4 mr-4"
            >
              <DashboardQuickBox
                icon={download}
                text="Withdraw money"
                subtext="Tap on this to release the money in your wallet"
              />
            </Link>
            <Link to="/share-escrow-link">
              <DashboardQuickBox
                icon={share}
                text="Share link"
                subtext="Tap on this to lock your money in your wallet"
              />
            </Link>
          </div>
          <h6 className=" mt-10 text-[#6D6D6D] font-bold text-[23px]">
            Transaction history
          </h6>
          {transactionData?.data?.results?.map(
            ({ amount, status, createdAt, meta, id }: any) => (
              <DashboardHistoryBox
                key={id}
                header={meta.title}
                text={meta.description}
                status={status}
                price={formatToNairaCurrency(amount)}
                subtext={new Date(createdAt).toLocaleString()}
              />
            )
          )}

          <div className="w-[343px] mt-5 ">
            <Link to="/buyer/transaction-history">
              <Button fullWidth variant="outlined">
                View all transactions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black/10 backdrop-blur  fixed inset-0" />
          <AlertDialog.Content className="z-50  fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[24px] ">
            <img src={wallet} className="mb-[20px]" alt="" />
            <AlertDialog.Title className=" text-[18px] font-medium">
              Insufficient Balance!
            </AlertDialog.Title>
            <AlertDialog.Description className=" mt-4 mb-5 text-[15px] leading-normal">
              <p>
                Please top up your wallet with ₦5,700 to complete this
                transaction, as the charges are inclusive.
              </p>
            </AlertDialog.Description>

            <Button
              fullWidth
              onClick={() => {
                depositMutate("5700");
              }}
            >
              {depositLoading ? "loading..." : " top up my wallet"}
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default Dashboard;
