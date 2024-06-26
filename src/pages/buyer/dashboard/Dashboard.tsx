import { useState, useEffect } from "react";
import useStore, { useTabStore } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/reuseable/Button";
import DashboardLockedBox from "../../../components/reuseable/DashboardLockedBox";
import DashboardQuickBox from "../../../components/reuseable/DashboardQuickBox";
import plus from "../../../assets/Icons/plus.svg";
import unlock from "../../../assets/Icons/unlock.svg";
import wallet from "../../../assets/Icons/alertWallet.svg";
import download from "../../../assets/Icons/download.svg";
import bell from "../../../assets/Icons/notification.svg";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import TextField from "../../../components/reuseable/TextField1";
import back from "../../../assets/Icons/back.svg";
import {
  useBanks,
  useTransactions,
  useUser,
  useWallets,
} from "../../../hooks/queries";
import {
  formatToDollarCurrency,
  formatToNairaCurrency,
} from "../../../util/formatNumber";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import {
  // useCheckEmail,
  useCreateEscrow,
  useDepositMoney,
  useEndTourGuide,
  useFundEscrow,
  useLockFunds,
  useLookUpBank,
  useLookUpEmail,
} from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import moment from "moment";
import infoIcon from "../../../assets/Icons/info-icon.svg";
import Joyride from "react-joyride";
import { useQueryClient } from "@tanstack/react-query";

type Bank = {
  name: string;
  code: string;
};

const Dashboard = () => {
  const [tourFinished, setTourFinished] = useState(false);
  const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState(false);
  const [accNum, setAccNum] = useState("");
  const store = useStore();
  const { mutate } = useEndTourGuide();
  const [cancleTour, setCancleTour] = useState(false);
  const { data: user, refetch: userRefresh } = useUser();
  // console.log(user);
  const { data: wallets, isLoading: loadWallets } = useWallets();

  const [open, setOpen] = useState(false);
  const { handleSubmit, control, register, watch, setValue } = useForm();
  const queryClient = useQueryClient(); //To refresh the user data
  //
  //search bank by name
  const [code, setCode] = useState("");
  const [filteredBank, setFilteredBank] = useState([]);
  const [showNames, setShowNames] = useState(true);
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const [currency, setCurrency] = useState("");
  const [deficit, setDeficit] = useState();
  const searchBank = watch("bankName");

  // Filter names based on the search term
  useEffect(() => {
    if (searchBank && banks) {
      const filtered = banks?.data?.filter((bankName: Bank) =>
        bankName?.name?.toLowerCase().startsWith(searchBank.toLowerCase())
      );
      setFilteredBank(filtered);
      setShowNames(true); // Show names when search term changes
    } else {
      setFilteredBank([]);
    }
  }, [searchBank, banks]);

  // Handle name click
  const handleNameClick = (bankName: string, code: string) => {
    setValue("bankName", bankName);
    setCode(code);
    setShowNames(false);
    setTimeout(() => setFilteredBank([]), 0);
  };
  useEffect(() => {}, [code]);

  //end search bank by name
  //
  //
  const {
    data: useremailData,
    mutate: userEmail,
    isLoading: emailLoading,
    isSuccess: emailIsSuccessful,
  } = useLookUpEmail();
  const [emailExists, setEmailExists] = useState(false);

  const watchedEmail = watch("partnerEmail");
  // Function to check email existence
  const checkEmail = (data: string) => {
    try {
      const res = userEmail({ email: data });
      setEmailExists(true);
      return res;
    } catch (error) {
      setEmailExists(false);
    }
  };

  useEffect(() => {
    if (watchedEmail) {
      checkEmail(watchedEmail);
    }
  }, [watchedEmail]);

  //

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
  // const deficit = error?.response?.data?.errors?.deficit;
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
    console.log(data);
  };
  const { isLoading, data: transactionData } = useTransactions({
    page: 1,
    size: 2,
  });

  //
  useEffect(() => {
    if (depositSuccess) setOpen(false);
  }, [depositSuccess]);
  useEffect(() => {
    if (createEscrowIsSuccessful) {
      lockFundsMutate(createEscrowData.data.reference, {
        onError: (data) => {
          setCurrency(data?.response?.data?.errors?.currency);
          setDeficit(data?.response?.data?.errors?.deficit);
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

  const endTourGuide = async () => {
    mutate({ email: user?.email });
    setCancleTour(true);
    await userRefresh();
  };

  // Tour Guide
  const [{ run, steps }, setState] = useState({
    run: user?.showTourGuide && !store.endTour,
    // run: true,
    steps: [
      {
        content: <strong>Let's go for a ride!</strong>,
        placement: "center" as "center",
        target: ".start-tour",
      },
      {
        content:
          "Your dashboard provides a snapshot of your account status and activities.",
        placement: "right" as "right",
        target: ".dashboard",
        title: "Dashboard",
      },
      {
        content:
          "Find your name and check the time of your last login and the date for your account activity. Get to enjoy 5 free escrow also.",
        placement: "bottom" as "bottom",
        target: ".find-name",
      },
      {
        content:
          "Find your available escrow balance, locked amount, unlocked amount and charges rate below.",
        placement: "bottom" as "bottom",
        target: ".balance",
      },
      {
        content: (
          <div>
            Initiate transactions effortlessly. Create a one-time MyBalance
            link, where you'll fill in every detail about the product and the
            buyer or seller.{" "}
            <strong>
              Don't forget, your email is crucial for a smooth process
            </strong>
          </div>
        ),
        placement: "bottom" as "bottom",
        target: ".createlink",
        title: "Create MyBalance Link",
      },
      {
        content: "Top up your wallet from your local bank securely.",
        placement: "bottom" as "bottom",
        target: ".depositMoney",
        title: "Deposit",
      },
      {
        content:
          "Use this feature to unlock funds, ensuring a seamless and trustworthy experience.",
        placement: "bottom" as "bottom",
        target: ".unlockMoney",
        title: "Unlock Money",
      },
      {
        content: "Transfer funds from wallet to your local bank account.",
        placement: "bottom" as "bottom",
        target: ".withdrawMoney",
        title: "Withdraw Money",
      },
    ],
  });
  useEffect(() => {
    // Check if the tour guide has finished targeting all the classes
    if (tourFinished) {
      //Navigate to the Quick Action page only if cancletour is false
      if (!cancleTour) {
        navigate("/buyer/quick-action");
      }
      // Set run to false when the tour finishes
      setState((prevState) => ({
        ...prevState,
        run: false,
      }));
    }
  }, [cancleTour, tourFinished, navigate]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
      refetchType: "all", // refetch both active and inactive queries
    });
  }, [store.endTour]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
      refetchType: "all", // refetch both active and inactive queries
    });
    queryClient.invalidateQueries({
      queryKey: ["wallets"],
      refetchType: "all", // refetch both active and inactive queries
    });
  }, []);

  return (
    <div className="overflow-hidden ">
      <Joyride
        continuous
        // callback={() => {}}
        run={run}
        steps={steps}
        // hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        locale={{
          skip: (
            <button
              onClick={() => {
                store.setEndTour(true);
                endTourGuide();
              }}
            >
              <strong>Cancel Tour</strong>
            </button>
          ),
          last: "Next",
        }}
        callback={({ action }) => {
          if (action === "reset") {
            setTourFinished(true);
          }
        }}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            textDecoration: "underline",
            fontWeight: 600,
          },
          buttonBack: {
            marginRight: 10,
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            textDecoration: "underline",
            fontWeight: 600,
          },
          buttonSkip: {
            color: "#DA1E28",
          },
        }}
      />
      <div className="md:flex justify-between items-center start-tour">
        <div className="flex md:hidden items-center justify-end gap-x-4 mb-4 mt-[1rem] mr-3  ">
          <div className="relative">
            {user?.unreadNotificationCount !== 0 && (
              <span className="absolute -right-2 -top-3 rounded-[50%] border border-[#fff2e8] text-primary-normal text-sm w-5 h-5 flex justify-center items-center">
                {user?.unreadNotificationCount}
              </span>
            )}
            <img
              src={bell}
              alt="notification bell"
              className="cursor-pointer"
              onClick={() => navigate("/buyer/notifications")}
            />
          </div>
        </div>
        <div>
          <h6 className="text-[18px] sm-text-[23px] items-center gap-2 flex font-medium mb-1 md:mb-2">
            <span className="text-[#6D6D6D]">Welcome</span>
            <span className=" font-semibold capitalize flex-1 find-name ">
              {user?.fullName || <Skeleton width={100} />}
            </span>
          </h6>
          <h6 className="text-[15px] sm-text-[18px] items-center gap-2 flex  mb-1 md:mb-2">
            <span className="   flex-1 find-name font-semibold">
              {user?.email || <Skeleton width={100} />}
            </span>
          </h6>
          <p className="max-w-[478px] text-[#303030] font-normal text-sm leading-[18.9px]">
            Your last login was on{" "}
            {user && user.lastLoginDate ? (
              new Date(user.lastLoginDate).toLocaleString()
            ) : (
              <Skeleton width={100} />
            )}
          </p>
          {user?.freeEscrowTransactions !== 0 && (
            <div className="flex gap-1 items-center text-sm w-fit bg-[#EBF4EC] px-2 py-1 font-medium rounded-2xl border border-[#D7EAD9]   mt-2 text-[#2D7738]">
              <p className="">
                You have <b>{user?.freeEscrowTransactions}</b> free escrow
                transactions
              </p>
              <img src={infoIcon} className="inline" alt="information" />
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center gap-x-4">
          <div className="relative">
            {user?.unreadNotificationCount !== 0 && (
              <span className="absolute -right-2 -top-3 rounded-[50%] border border-[#fff2e8] text-primary-normal text-sm w-5 h-5 flex justify-center items-center">
                {user?.unreadNotificationCount}
              </span>
            )}
            <img
              src={bell}
              alt="notification bell"
              className="cursor-pointer"
              onClick={() => navigate("/buyer/notifications")}
            />
          </div>
          <div className="w-[343px] md:w-[270px] createlink">
            <Button
              fullWidth
              variant="contained"
              onClick={() => setIsVerify(true)}
            >
              Create MyBalance Link
            </Button>
          </div>
        </div>

        <Dialog.Root open={isVerify}>
          <Dialog.Portal className="">
            <Dialog.Overlay
              onClick={() => setIsVerify(false)}
              className="bg-[#3a3a3a]/50 z-50 fixed inset-0"
            />

            <Dialog.Content>
              {/* <div className="  w-[393px] h-screen z-50 fixed animate-fade-left animate-duration-300 top-0 right-0 animate-ease-out bg-white pl-[16px] pr-[34px] overflow-y-scroll "> */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[400px] h-[100%] z-50 fixed top-0 right-0 animate-fade-left animate-duration-300 animate-ease-out bg-white px-3 md:px-[16px] overflow-y-scroll"
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
                      name={"itemType"}
                      label="Title"
                      placeholder="Gucci sneakers"
                    />
                    <TextField
                      control={control}
                      rules={{ required: "this field is required" }}
                      name={"purpose"}
                      label="Description"
                      placeholder="Purchase of sneakers"
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
                    <div className="w-full mb-1 ">
                      <div className="w-full mb-2 relative ">
                        <label htmlFor="bankName" className="text-[15px] mb-2">
                          Enter bank name
                        </label>
                        <input
                          type="text"
                          {...register("bankName")}
                          placeholder="Enter bank name"
                          onFocus={() => setShowNames(false)} // Hide names when input is focused
                          onBlur={() => setShowNames(true)} // Show names when input loses focus
                          className="  border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] disabled:opacity-75 disabled:hover:cursor-not-allowed"
                        />

                        {showNames && filteredBank.length > 0 && (
                          <div className="absolute top-13 z-30 overflow-y-auto max-h-[150px] w-full p-3 bg-white mb-2 transition-all">
                            {filteredBank.map((bank: Bank, index) => (
                              <p
                                key={index}
                                onClick={() =>
                                  handleNameClick(bank.name, bank.code)
                                }
                                className="mb-2 transition-all cursor-pointer"
                              >
                                {showNames && bank.name}
                              </p>
                            ))}
                            {bankIsLoading && <p>loading...</p>}
                          </div>
                        )}
                      </div>
                    </div>
                    <TextField
                      control={control}
                      label="Enter Account number"
                      placeholder="1234567890"
                      type="number"
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
                    {emailLoading ? (
                      "Loading... "
                    ) : emailExists ? (
                      emailIsSuccessful ? (
                        <p className="text-sm text-[green] -mt-3">
                          {useremailData?.data?.name}
                        </p>
                      ) : (
                        <p className="text-sm text-[red] -mt-3">
                          User not registered, Please make sure that the vendor
                          register with this email address.
                        </p>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-6 mb-16">
                    <Button
                      disabled={
                        createEscrowIsLoading ||
                        lockFundsLoading ||
                        LookupIsLoading ||
                        emailLoading
                        // inputFocused
                      }
                      fullWidth
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
      {loadWallets ? (
        // Show a loading indicator
        <div className="flex flex-col mt-8 gap-2 md:gap-3 w-full ">
          <Skeleton className="w-full h-[120px] " />
        </div>
      ) : (
        <div className="flex gap-3 mt-10 md:mt-16 w-full overflow-x-auto no-scrollbar balance">
          <div className="border whitespace-nowrap border-[#9A4D0C] overflow-hidden relative rounded min-w-[270px] w-full flex-[0.4] h-[125px] p-6 ">
            <div className="w-[163px] h-[163px] bg-[#FFF2E8] rounded-full top-[-19px] left-[-96px] z-[-10] absolute"></div>
            <div className="w-[66px] h-[66px] bg-[#FECA9F] rounded-full top-[-19px] left-[324px] z-[-10] absolute"></div>

            <p className="mb-2 font-base font-normal leading-[21.6px]">
              Available balance in wallet
            </p>
            <h4 className="font-bold text-[32px] leading-[43.2px]">
              {/* <p>{formatToDollarCurrency(wallets[0]?.balance || 0)}</p> */}
              <p>{formatToNairaCurrency(wallets[1]?.balance || 0)}</p>
            </h4>
          </div>
          <DashboardLockedBox
            Text="Locked amount"
            AmountInDollars={formatToDollarCurrency(
              wallets[0]?.lockedAmountOutward || 0
            )}
            AmountInNaira={formatToNairaCurrency(
              wallets[1]?.lockedAmountOutward || 0
            )}
          />
          <DashboardLockedBox
            Text="Unlocked amount"
            AmountInDollars={formatToDollarCurrency(
              wallets[0]?.unlockedAmount || 0
            )}
            AmountInNaira={formatToNairaCurrency(
              wallets[1]?.unlockedAmount || 0
            )}
          />
        </div>
      )}
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
              icon={unlock}
              text="Unlock money"
              subtext="Release the money in your wallet"
            />

            <DashboardQuickBox
              tab="withdrawMoney"
              disabled={
                wallets
                  ? wallets[0]?.balance === "0.00" &&
                    wallets[1]?.balance === "0.00"
                  : false
              }
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
          <AlertDialog.Content
            className="z-50  fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] 
          translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[24px] "
          >
            <img src={wallet} className="mb-[20px]" alt="" />
            <AlertDialog.Title className=" text-[18px] font-medium">
              Insufficient Balance!
            </AlertDialog.Title>
            <AlertDialog.Description className=" mt-4 mb-5 text-[15px] leading-normal">
              <p>
                Please top up your wallet with{" "}
                <strong>
                  {" "}
                  {currency === "NGN"
                    ? formatToNairaCurrency(deficit)
                    : formatToDollarCurrency(deficit)}
                </strong>{" "}
                to complete this transaction, as the charges are inclusive.
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
