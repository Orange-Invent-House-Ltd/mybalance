import { useState, useEffect } from "react";
import useStore, { useTabStore } from "../../../store";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/reuseable/Button";
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
import * as Dialog from "@radix-ui/react-dialog";
import {
  useCreateEscrow,
  useDepositMoney,
  useFundEscrow,
  useLockFunds,
  useLookUpBank,
} from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import moment from "moment";

const Dashboard = () => {
  const [isVerify, setIsVerify] = useState(false);
  const [accNum, setAccNum] = useState("");
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const store = useStore();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, register } = useForm();
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  var today = moment().format("YYYY-MM-DD");
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
    error,
    isError: lockFundsIsError,
  } = useLockFunds();
  const deficit = error?.response?.data?.errors?.deficit;

  const {
    data: fundEscrowData,
    mutate: fundEscrowMutate,
    isLoading: fundEscrowIsLoading,
  } = useFundEscrow();
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
      bankCode: code,
      bankAccountNumber: accNum,
    });
  };
  const { isLoading, data: transactionData } = useTransactions({
    page: 1,
    size: 2,
  });

  useEffect(() => {
    if (depositSuccess) setOpen(false);
  }, [depositSuccess]);
  useEffect(() => {
    if (createEscrowIsSuccessful) {
      lockFundsMutate(createEscrowData.data.reference, {
        onError: (data) => {
          if (
            data?.response?.data?.errors?.message ===
            "Insufficient funds in wallet."
          ) {
            setOpen(true);
            setIsVerify(false);
          }
        },
      });
    }
  }, [createEscrowIsSuccessful]);
  useEffect(() => {
    if (accNum.length === 10) {
      LookupMutate({ bankCode: code, accountNumber: accNum });
    }
  }, [accNum, code]);
  return (
    <div className=" overflow-hidden ">
      <div className="md:flex justify-between items-center ">
        <div>
          <h6 className="text-[18px] sm-text-[23px] items-center gap-2 flex font-medium mb-2 md:mb-4 ">
            <span className="text-[#6D6D6D]">Welcome</span>
            <span className=" font-semibold capitalize flex-1">
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
          {user?.freeEscrowTransactions && (
            <p className="text-sm font-normal px-2  leading-[18.9px] text-[#303030]">
              <b>{user?.freeEscrowTransactions}</b> free escrow transaction
              remaining
            </p>
          )}
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

        <Dialog.Root open={isVerify}>
          <Dialog.Portal className="">
            <Dialog.Overlay
              onClick={() => setIsVerify(false)}
              className="bg-[#3a3a3a]/50 z-50   fixed inset-0"
            />

            <Dialog.Content>
              {/* <div className="  w-[393px] h-screen z-50 fixed animate-fade-left animate-duration-300 top-0 right-0 animate-ease-out bg-white pl-[16px] pr-[34px] overflow-y-scroll "> */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[400px] h-screen z-50 fixed top-0 right-0 animate-fade-left animate-duration-300 animate-ease-out bg-white px-3 md:px-[16px] overflow-y-scroll"
              >
                <div className="relative">
                  {(createEscrowIsLoading || lockFundsLoading) && (
                    <LoadingOverlay />
                  )}
                  <div className="flex gap-4 items-center mt-10 mb-4">
                    <img
                      src={back}
                      alt="back"
                      onClick={() => setIsVerify(false)}
                    />
                    <h6 className="text-[23px] font-medium">
                      Create MyBalance Link
                    </h6>
                  </div>
                  <p className="text-[16px] text-[#303030] font-normal mb-8">
                    Create your MyBalance escrow information and share with
                    everyone.
                  </p>
                  <h1 className="text-[#393737] text-lg font-medium">
                    ITEM(S) INFORMATION
                  </h1>
                  <div className="mt-6 flex flex-col gap-4">
                    <TextField
                      control={control}
                      rules={{ required: "this field is required" }}
                      name={"purpose"}
                      label="Purpose of creating  escrow"
                      placeholder="Purchase of sneakers"
                    />
                    <TextField
                      control={control}
                      rules={{ required: "this field is required" }}
                      name={"itemType"}
                      label="Type of item(s)"
                      placeholder="Gucci sneakers"
                    />
                    <TextField
                      control={control}
                      rules={{ required: "this field is required" }}
                      name={"itemQuantity"}
                      label="Number of item(s)"
                      placeholder="5"
                      type="number"
                    />
                    <TextField
                      control={control}
                      rules={{ required: "this field is required" }}
                      name={"amount"}
                      label="Amount"
                      placeholder="20000"
                      type="number"
                      min={1}
                    />
                    <TextField
                      control={control}
                      rules={{ required: "this field is required" }}
                      name={"deliveryDate"}
                      label="Delivery timeline"
                      type="date"
                      min={today}
                    />
                  </div>
                  <h1 className="mt-6 text-[#303030] text-lg font-medium">
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
                        placeholder="JMusty Feet"
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
                      placeholder="JMustyfeet@gmail.com"
                    />
                  </div>
                  <div className="mt-6 mb-16">
                    <Button
                      disabled={
                        createEscrowIsLoading ||
                        lockFundsLoading ||
                        LookupIsLoading
                      }
                      fullWidth
                      // onClick={() => {
                      //   setIsVerify(false);

                      //   // setOpen(true);
                      // }}
                      type="submit"
                    >
                      pay now
                    </Button>
                  </div>{" "}
                </div>
              </form>
              {/* </div> */}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="flex gap-3 mt-10 md:mt-16 w-full overflow-x-auto no-scrollbar">
        <div className="border whitespace-nowrap border-[#9A4D0C] overflow-hidden relative rounded min-w-[270px] w-full flex-[0.4] h-[125px] p-6 ">
          <div className="w-[163px] h-[163px] bg-[#FFF2E8] rounded-full top-[-19px] left-[-96px] z-[-10] absolute"></div>
          <div className="w-[66px] h-[66px] bg-[#FECA9F] rounded-full top-[-19px] left-[324px] z-[-10] absolute"></div>

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
            className="border border-#B7B7B7 w-full md:max-w-[297px] rounded-[10px] mt-10 md:mt-16 px-4 py-6"
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
        <div className="mt-10 md:mt-16">
          <h6 className="  mb-6 text-[#6D6D6D] font-bold text-[23px] ">
            Quick actions
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-4  mb-4 ">
            <DashboardQuickBox
              tab="depositMoney"
              icon={plus}
              text="Deposit money"
              subtext="Add money to your escrow wallet"
            />

            <DashboardQuickBox
              tab="unlockMoney"
              disabled={user?.walletBalance === "0.00"}
              icon={unlock}
              text="Unlock money"
              subtext="Release the money in your wallet"
            />

            <DashboardQuickBox
              tab="withdrawMoney"
              disabled={user?.walletBalance === "0.00"}
              icon={download}
              text="Withdraw money"
              subtext="Withdraw your money from your wallet"
            />
          </div>
          <h6 className=" mt-10 text-[#6D6D6D] font-bold text-[23px]">
            Transaction history
          </h6>
          {isLoading && (
            <div className="flex flex-col gap-3 w-full max-w-[676px]">
              <Skeleton className="w-full h-[100px] " />
              <Skeleton className="w-full h-[100px] " />
            </div>
          )}
          {transactionData?.data?.map((transaction: any) => (
            <DashboardHistoryBox key={transaction.id} {...transaction} />
          ))}
          {transactionData?.data.length === 0 && <EmptyTrans />}

          <div className="max-w-[343px] mt-5 ">
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
          <AlertDialog.Overlay className="bg-black/10 backdrop-blur z-50 fixed inset-0" />
          <AlertDialog.Content className="z-50  fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[24px] ">
            <img src={wallet} className="mb-[20px]" alt="" />
            <AlertDialog.Title className=" text-[18px] font-medium">
              Insufficient Balance!
            </AlertDialog.Title>
            <AlertDialog.Description className=" mt-4 mb-5 text-[15px] leading-normal">
              <p>
                Please top up your wallet with{" "}
                <strong>{formatToNairaCurrency(deficit)}</strong> to complete
                this transaction, as the charges are inclusive.
              </p>
            </AlertDialog.Description>

            <Button
              fullWidth
              onClick={() => {
                const transactionReference =
                  localStorage.getItem("transactionRef");
                fundEscrowMutate(
                  {
                    transactionReference,
                    amountToCharge: deficit,
                  },
                  {
                    onSuccess: (data) => {
                      window.open(data?.data?.link);
                    },
                  }
                );
              }}
            >
              {fundEscrowIsLoading ? "loading..." : " top up my wallet"}
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default Dashboard;
