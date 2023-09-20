import React, { useEffect, useState } from "react";
import TextField from "../../../components/reuseable/TextField1";
import * as Tabs from "@radix-ui/react-tabs";
import check from "../../../assets/Icons/check.svg";
import waves from "../../../assets/Icons/waves.svg";
import loading from "../../../assets/Icons/loadingSpinner.svg";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { useForm } from "react-hook-form";
import {
  useLookUpBank,
  useWithdraw,
  useWithdrawFee,
} from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { useBanks } from "../../../components/../hooks/queries";
import { Button } from "../../../components/reuseable/Button";
import Pusher from "pusher-js";

const Withdraw = () => {
  const [accNum, setAccNum] = useState("");
  const [code, setCode] = useState("");
  const [modalMessageTitle, setModalMessageTitle] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [modalMessageDescription, setModalMessageDescription] = useState("");
  const [pusherLoading, setPusherLoading] = useState(false);

  const { handleSubmit: handleSubmitWithdraw, control: controlWithdraw } =
    useForm();
  const subscribeToChannel = (txReference: any) => {
    const pusher = new Pusher("9121686402a8e63845f3", {
      cluster: "mt1",
    });

    const channelName = `WALLET_WITHDRAWAL_${txReference}`;
    const channel = pusher.subscribe(channelName);
    setPusherLoading(true);
    console.log("STARTING CONNECTION", channelName);

    channel.bind("WALLET_WITHDRAWAL_SUCCESS", (data: any) => {
      console.log("WALLET_WITHDRAWAL_SUCCESS", data);
      setModalMessageTitle(`${data.amount} Withdrawn!`);
      setModalMessageDescription(
        `Weldone! You have successfully withdrawn ${data.amount}. You should receive a credit alert in seconds`
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
  const {
    data: LookupData,
    mutate: LookupMutate,
    isLoading: LookupIsLoading,
  } = useLookUpBank();

  useEffect(() => {
    if (withdrawSuccess) {
      console.log(
        "🚀 ~ file: Withdraw.tsx:77 ~ useEffect ~ withdrawData:",
        withdrawData
      );
      subscribeToChannel(withdrawData?.data?.transactionReference);
      //   setIsWithdraw(true);
    }
  }, [withdrawSuccess]);
  useEffect(() => {
    if (accNum.length === 10) {
      // LookupMutate({ bankCode: code, accountNumber: accNum });
      LookupMutate({ bankCode: "044", accountNumber: accNum });
    }
  }, [accNum, code]);
  return (
    <form
      onSubmit={handleSubmitWithdraw((data) => {
        delete data.accountName;
        delete data.accountNumber;
        withdrawMutate({
          ...data,
          accountNumber: accNum,
          bankCode: "044",
        });
      })}
      className="relative w-full mx-auto max-w-[350px]"
    >
      {withdrawLoading && <LoadingOverlay />}
      <h1 className="text-lg font-bold">Withdraw Funds</h1>
      <p className="max-w-[449px] text-base font-normal">
        After your transaction with a buyer is successful, withdraw your funds
        with the form below.
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

      <AlertDialog.Root open={isWithdraw}>
        <AlertDialog.Portal className=" ">
          <AlertDialog.Overlay className="bg-[#3a3a3a]/50  fixed inset-0" />

          <AlertDialog.Content className=" h-full   fixed top-0 left-0 z-50 w-full  animate-jump">
            <div className="   w-[400px] z-[999999]  fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-white p-[20px] rounded-[5px] flex flex-col items-center">
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

        <AlertDialog.Content className="   fixed top-0 left-0 z-50 w-full h-full ">
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
    </form>
  );
};

export default Withdraw;
