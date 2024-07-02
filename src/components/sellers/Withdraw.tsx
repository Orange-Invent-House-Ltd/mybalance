import React, { useEffect, useState } from "react";
import TextField from "../reuseable/TextField1";
import check from "../../assets/Icons/check.svg";
import waves from "../../assets/Icons/waves.svg";
import loading from "../../assets/Icons/loadingSpinner.svg";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import back from "../../assets/Icons/back.svg";

import { useForm } from "react-hook-form";
import {
  useLookUpBank,
  useWithdraw,
  useWithdrawFee,
} from "../../hooks/mutations";
import { useBanks, useUser } from "../../hooks/queries";
import { Button } from "../reuseable/Button";
import Pusher from "pusher-js";
import LoadingOverlay from "../reuseable/LoadingOverlay";
import {
  formatToDollarCurrency,
  formatToNairaCurrency,
} from "../../util/formatNumber";

type Bank = {
  name: string;
  code: string;
};

const Withdraw = ({ open, setOpen }: any) => {
  const [accNum, setAccNum] = useState("");
  const [modalMessageTitle, setModalMessageTitle] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [modalMessageDescription, setModalMessageDescription] = useState("");
  const [pusherLoading, setPusherLoading] = useState(false);
  const { data: user } = useUser();

  const {
    handleSubmit: handleSubmitWithdraw,
    control: controlWithdraw,
    reset,
    watch,
    setValue,
    register,
  } = useForm();
  //search bank by name
  const [code, setCode] = useState("");
  const [filteredBank, setFilteredBank] = useState([]);
  const [showNames, setShowNames] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const searchBank = watch("bankName");
  const searchCode = watch("bankcode");

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
    setValue("bankCode", code);
    setCode(code);
    setShowNames(false);
    setTimeout(() => setFilteredBank([]), 0);
  };

  // Hide the dropdown when bank name has a default value
  useEffect(() => {
    if (user?.bankAccount?.bankName) {
      setShowNames(false);
      setIsFocused(false);
    }
  }, [user]);

  useEffect(() => {}, [code]);

  //end search bank by name
  //
  const subscribeToChannel = (txReference: any) => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "mt1",
    });

    const channelName = `WALLET_WITHDRAWAL_${txReference}`;
    const channel = pusher.subscribe(channelName);
    setPusherLoading(true);

    channel.bind("WALLET_WITHDRAWAL_SUCCESS", (data: any) => {
      // console.log("WALLET_WITHDRAWAL_SUCCESS", data);
      setModalMessageTitle(
        `${
          data?.currency === "NGN"
            ? formatToNairaCurrency(data?.amount)
            : formatToDollarCurrency(data?.amount)
        } Withdrawn!`
      );
      setModalMessageDescription(
        `Weldone! You have successfully withdrawn ${
          data?.currency === "NGN"
            ? formatToNairaCurrency(data?.amount)
            : formatToDollarCurrency(data?.amount)
        }. You should receive a credit alert in seconds`
      );
      //   setModalMessageAmount(data.amount);
      setPusherLoading(false);
      setIsWithdraw(true);
    });

    channel.bind("WALLET_WITHDRAWAL_FAILURE", (data: any) => {
      // console.log("WALLET_WITHDRAWAL_FAILURE", data);
      setModalMessageTitle("Withdrawal failed");
      setModalMessageDescription(`Oops, something went wrong`);

      setPusherLoading(false);

      //   setModalMessageAmount(data.amount);
      //   setIsWithdraw(true);
    });
  };
  const {
    mutate: withdrawMutate,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess,
    data: withdrawData,
  } = useWithdraw();

  const {
    mutate: withdrawFeeMutate,
    isLoading: withdrawFeeLoading,
    data: withdrawFeeData,
  } = useWithdrawFee();

  const {
    data: LookupData,
    mutate: LookupMutate,
    isLoading: LookupIsLoading,
  } = useLookUpBank();

  useEffect(() => {
    if (withdrawSuccess) {
      subscribeToChannel(withdrawData?.data?.transactionReference);
      setOpen(false);
    }
  }, [withdrawSuccess]);

  useEffect(() => {
    if (accNum?.length === 10) {
      LookupMutate({ bankCode: code, accountNumber: accNum });
    }
  }, [accNum, code]);
  useEffect(() => {
    reset({
      email: user?.email,
      bank: user?.bankAccount?.bankCode,
      accountNumber: user?.bankAccount?.accountNumber,
      accountName: user?.bankAccount?.accountName,
      bankName: user?.bankAccount?.bankName, // Set default value for bank name
    });
    setAccNum(user?.bankAccount?.accountNumber);
    setCode(user?.bankAccount?.bankCode || "");
  }, [user, reset]);
  return (
    <>
      <Dialog.Root open={open}>
        <Dialog.Portal className="">
          <Dialog.Overlay
            onClick={() => setOpen(false)}
            className="bg-[#3a3a3a]/50 z-50   fixed inset-0"
          />

          <Dialog.Content className="relative">
            <form
              onSubmit={handleSubmitWithdraw((data) => {
                delete data?.accountName;
                delete data?.accountNumber;
                data?.description === "" && delete data.description;
                withdrawMutate({
                  ...data,
                  accountNumber: accNum,
                  bankCode: code,
                });
              })}
              className=" w-full  max-w-[400px] h-screen z-50 fixed top-0 right-0 animate-fade-left animate-duration-300 animate-ease-out bg-white pl-[16px] overflow-y-scroll pr-[34px]"
            >
              <div className="mt-5 relative">
                {withdrawLoading && <LoadingOverlay />}
                <img src={back} alt="back" onClick={() => setOpen(false)} />
                <h1 className="text-lg font-bold pb-3 pt-5">Withdraw Funds</h1>
                <p className="max-w-[449px] text-base font-normal">
                  After your transaction with a buyer is successful, withdraw
                  your funds with the form below.
                </p>
                <h1 className="mt-8 text-[#393737] text-lg font-medium">
                  SENDER ADDITIONAL INFORMATION
                </h1>
                <div>
                  <TextField
                    control={controlWithdraw}
                    rules={{ required: "this field is required" }}
                    label="How much are you withdrawing?"
                    placeholder="e.g 20000"
                    name={"amount"}
                    type="number"
                    min={1}
                  />

                  <TextField
                    control={controlWithdraw}
                    // rules={{ required: "this field is required" }}
                    name={"description"}
                    label="Reason for withdrawing (optional)"
                    defaultValue="I need the money"
                  />
                </div>
                <h1 className="mt-6 text-[#393737] text-lg font-medium">
                  RECEIVER ACCOUNT INFORMATION
                </h1>
                {/*  */}
                <div className="flex flex-col gap-2 justify-start items-start max-w-[752px] mt-8 px-4 py-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="w-[285px] text-amber-800 text-sm font-bold">
                    NOTICE:
                  </p>
                  <div className="w-full border-t border-orange-300" />
                  <p className="max-w-[650px] text-amber-700 text-[13px] font-normal">
                    Withdrawals to microfinance/neo banks (Opay, Kuda, Palmpay)
                    are unavailable. Kindly use any commercial bank (Zenith,
                    Access, GTBank, etc.). We apologize for any inconvenience
                    this may cause.
                  </p>
                </div>
                <div className="grid gap-4 mb-3 mt-5">
                  <div className="w-full mb-2 relative ">
                    <label htmlFor="bankName" className="text-[15px] mb-2">
                      Enter bank name
                    </label>
                    <input
                      type="text"
                      {...register("bankName")}
                      placeholder="Enter bank name"
                      onFocus={() => {
                        setShowNames(true);
                        setIsFocused(true);
                      }}
                      className="  border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] disabled:opacity-75 disabled:hover:cursor-not-allowed"
                    />
                    {isFocused && showNames && filteredBank.length > 0 && (
                      <div className="absolute top-13 z-30 overflow-y-auto h-[150px] text-green-500 w-full p-3 bg-white mb-2 transition-all">
                        {filteredBank.map((bank: Bank, index) => (
                          <p
                            key={index}
                            onClick={() =>
                              handleNameClick(bank.name, bank.code)
                            }
                            className="mb-2 transition-all cursor-pointer"
                          >
                            {bank.name}
                          </p>
                        ))}
                        {bankIsLoading && <p>loading...</p>}
                      </div>
                    )}
                  </div>
                </div>
                <TextField
                  control={controlWithdraw}
                  label="Enter account number"
                  placeholder="e.g 4758593837"
                  type="number"
                  name={"accountNumber"}
                  value={accNum}
                  onChange={(e) => {
                    setAccNum(e.target.value);
                  }}
                />
                <div className="relative mt-4 mb-4">
                  {LookupIsLoading && <LoadingOverlay />}
                  <TextField
                    readOnly={true}
                    control={controlWithdraw}
                    name={"accountName"}
                    label="Account Name"
                    value={LookupData?.data?.accountName}
                    placeholder="e.g JMusty Feet"
                  />
                </div>
                <TextField
                  control={controlWithdraw}
                  rules={{ required: "this field is required" }}
                  label="email"
                  placeholder="placeholder@gmail.com"
                  name={"email"}
                />
              </div>
              <div className="mt-6 mb-16">
                <Button disabled={LookupIsLoading} fullWidth type="submit">
                  Withdraw amount
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <AlertDialog.Root open={isWithdraw}>
        <AlertDialog.Portal className=" ">
          <AlertDialog.Overlay className="bg-[#3a3a3a]/50 z-20  fixed inset-0" />
          <AlertDialog.Content className=" h-full   fixed top-0 left-0 z-50 w-full  animate-jump">
            <div className="w-full max-w-[400px] z-[999999]  fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-white p-[20px] rounded-[5px] flex flex-col items-center">
              <img
                className="p-4 bg-[#ECFDF3] rounded-[50%]"
                src={check}
                alt="check"
              />
              <h6 className="h6">{modalMessageTitle} 👍🏾</h6>
              <p className="mt-4 text-center text-base font-normal leading-[21.6px]">
                {modalMessageDescription}
              </p>
              <div className=" mt-4 w-[300px]">
                <Button
                  //   disabled={LookupIsLoading}
                  fullWidth={true}
                  onClick={() => setIsWithdraw(false)}
                >
                  Return to dashboard
                </Button>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={pusherLoading}>
        <AlertDialog.Overlay />
        <AlertDialog.Content className="fixed top-0 left-0 z-50 w-screen h-screen ">
          <div className=" fixed top-0 left-0 right-0  bottom-0 bg-white flex items-center justify-center z-40">
            <div className="w-screen h-screen flex items-center justify-center">
              <div className="text-center space-y-2 my-auto">
                <img
                  src={loading}
                  className="animate-spin mx-auto "
                  alt="loading spinner"
                />
                <h1 className="font-medium ">
                  Transaction in progress... Please wait.
                </h1>
              </div>

              <img src={waves} className="absolute bottom-0 w-full" alt="" />
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default Withdraw;
