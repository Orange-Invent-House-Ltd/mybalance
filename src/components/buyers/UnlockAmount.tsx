import { useEffect, useState } from "react";
import back from "../../assets/Icons/back.svg";
import TextField from "../reuseable/TextField1";
import { Button } from "../reuseable/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUnLockFunds } from "../../hooks/mutations";
import loadingImg from "../../assets/Icons/loadingSpinner.svg";
import Spinner from "../reuseable/Spinner";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import * as Dialog from "@radix-ui/react-dialog";
import {formatToNairaCurrency} from "../../util/formatNumber";
import { convertDate } from "../reuseable/ConvertDate";
const UnlockAmount = ({ setUnlock, setSuccessModal, unlock }: any) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useState(false);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const { handleSubmit, control, reset } = useForm();
  const { isLoading, isSuccess, mutate, data: fundsData } = useUnLockFunds();
  let data = localStorage.getItem("transactionInfo") as any;
  data = JSON.parse(data);
  useEffect(() => {
    // you can do async server request and fill up form
    if (data) {
      reset({
        type: data?.meta?.title,
        purpose: data?.meta?.description,
        number: data.escrowMetadata.itemQuantity,
        amt: data?.lockedAmount?.amount?.toLocaleString() || data?.amount?.toLocaleString(),
        time: convertDate(data?.escrowMetadata?.deliveryDate),
        bankName: data?.escrowMetadata.meta?.bankName,
        accNum: data?.escrowMetadata.meta?.accountNumber,
        accName: data?.escrowMetadata.meta?.accountName,
        email: data?.escrowMetadata.partnerEmail,
      });
    }
  }, [reset]);
  useEffect(() => {
    if (isSuccess) {
      setUnlock(false);
      setAlertModal(false);
      setSuccessModal(true);
    }
  }, [isSuccess]);
  return (
    <>
      <Dialog.Root open={unlock}>
        <Dialog.Portal className="">
          <Dialog.Overlay
            onClick={() => setUnlock(false)}
            className="bg-[#3a3a3a]/50 z-50   fixed inset-0"
          />

          <Dialog.Content>
            <div className="w-full max-w-[393px] h-screen z-50 fixed animate-fade-left animate-duration-300 top-0 right-0 animate-ease-out bg-white px-5 md:pl-[16px] md:pr-[34px] overflow-y-scroll">
              <div className="flex gap-4 items-center pt-10 mb-8">
                <img
                  onClick={() => setUnlock(false)}
                  src={back}
                  alt="back"
                  className=" cursor-pointer"
                />
                <h6 className="text-[23px] font-medium">Unlock Amount </h6>
              </div>
              <form action="">
                <h1 className="text-[#393737] text-lg font-medium">
                  ITEM(S) INFORMATION
                </h1>
                <div className="mt-6 flex flex-col gap-4">
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"type"}
                    label="Title"
                    placeholder="i phone"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"purpose"}
                    label="Description"
                    placeholder="e.g 20,000"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"number"}
                    label="Number of item(s)"
                    placeholder="5"
                    type="number"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"amt"}
                    label="amount"
                    placeholder="amount"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"time"}
                    label="Delivery timeline"
                    placeholder="Select number of days"
                    type="date"
                    readOnly
                  />
                </div>
                <h1 className="mt-6 text-[#393737] text-lg font-medium">
                  RECEIVER ACCOUNT INFORMATION
                </h1>
                <div className="mt-6 flex flex-col gap-4">
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"bankName"}
                    label="Bank Name"
                    placeholder="Access Bank"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"accNum"}
                    label="Enter Account number"
                    placeholder="1234567890"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"accName"}
                    label="Account Name"
                    placeholder="e.g JMusty Feet"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"email"}
                    label="Email Address"
                    placeholder="e.g JMustyfeet@gmail.com"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-6 mt-6 mb-16">
                  <Button
                    onClick={() => navigate("/buyer/dispute-resolution/add")}
                    fullWidth
                    variant="outlined"
                    disabled={data?.meta?.escrowAction !== "APPROVED"}
                  >
                    Report a dispute
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setAlertModal(true);
                    }}
                    disabled={data?.meta?.escrowAction !== "APPROVED"}
                    fullWidth
                  >
                    Unlock amount
                  </Button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <AlertDialog.Root open={alertModal}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-[#3a3a3a]/50  backdrop-blur-md fixed inset-0 z-50" />
          <AlertDialog.Content className=" animate-fade-up sm:animate-jump  animate-duration-75  fixed  top-0 left-0 z-50 w-full h-full  ">
            <div className="sm:max-w-[400px] w-full py-6  mr-20 px-6 min-h-[246px] rounded absolute bg-white  bottom-0 sm:bottom-auto sm:top-[50%] sm:left-[50%] sm:-translate-y-1/2 sm:-translate-x-1/2 ">
              <div className="mb-8  ">
                <h1 className="text-lg mb-2 font-medium">Unlock Funds!</h1>
                <p className="text-[#303030] ">
                  Before proceeding, please confirm if you wish to unlock the
                  funds for this transaction
                </p>
              </div>
              <div className="flex mb-8 items-center gap-3 flex-col justify-between">
                <button
                  className="border-[#999999] w-full border rounded-md py-3 px-14 capitalize text-lg font-medium "
                  onClick={() => {
                    setAlertModal(false);
                  }}
                >
                  cancel
                </button>
                <button
                  onClick={() => {
                    mutate(data?.reference);
                  }}
                  className=" rounded-md py-3 px-14 w-full capitalize text-white bg-[#039855] text-lg font-medium "
                  disabled={data?.meta?.escrowAction !== "APPROVED"}
                >
                  {isLoading ? "loading...." : "Proceed"}
                </button>
              </div>
              <p className="text-[10px] text-[#4F4F4F]">
                By unlocking the funds, you are accepting responsibility for
                verifying the quality of the received product. For more details
                on your buyer obligations, we recommend reviewing our “{" "}
                <Link to="/t&c" className="text-primary-normal">
                  Terms and Conditions
                </Link>
                .”
              </p>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
export default UnlockAmount;
