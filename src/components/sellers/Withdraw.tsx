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
import formatToNairaCurrency from "../../util/formatNumber";

const Withdraw = ({ open, setOpen }: any) => {
  const [accNum, setAccNum] = useState("");
  const [code, setCode] = useState("");
  const [modalMessageTitle, setModalMessageTitle] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [modalMessageDescription, setModalMessageDescription] = useState("");
  const [pusherLoading, setPusherLoading] = useState(false);

  const {
    handleSubmit: handleSubmitWithdraw,
    control: controlWithdraw,
    reset,
  } = useForm();

  const subscribeToChannel = (txReference: any) => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "mt1",
    });

    const channelName = `WALLET_WITHDRAWAL_${txReference}`;
    const channel = pusher.subscribe(channelName);
    setPusherLoading(true);

    channel.bind("WALLET_WITHDRAWAL_SUCCESS", (data: any) => {
      console.log("WALLET_WITHDRAWAL_SUCCESS", data);
      setModalMessageTitle(`${formatToNairaCurrency(data.amount)} Withdrawn!`);
      setModalMessageDescription(
        `Weldone! You have successfully withdrawn ${formatToNairaCurrency(
          data.amount
        )}. You should receive a credit alert in seconds`
      );
      //   setModalMessageAmount(data.amount);
      setPusherLoading(false);
      setIsWithdraw(true);
    });

    channel.bind("WALLET_WITHDRAWAL_FAILURE", (data: any) => {
      console.log("WALLET_WITHDRAWAL_FAILURE", data);
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

  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const { data: user } = useUser();

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
    });
    setAccNum(user?.bankAccount?.accountNumber);
    setCode(user?.bankAccount?.bankCode || "");
  }, [user]);
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
                    label="Reason for withdrawing (description)"
                    defaultValue="I need the money"
                  />
                </div>
                <h1 className="mt-6 text-[#393737] text-lg font-medium">
                  RECEIVER ACCOUNT INFORMATION
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
                        setCode(e?.target?.value);
                      }}
                    >
                      {banks?.data?.map((bank: any) => (
                        <option key={bank?.slug} value={bank?.code}>
                          {bank?.name}
                        </option>
                      ))}
                      {bankIsLoading && <option value="">loading...</option>}
                    </select>
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
