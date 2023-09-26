import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import { Button } from "../../components/reuseable/Button";
import TextField from "../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useTransactionInfo, useUser } from "../../hooks/queries";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useRespondTransaction } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import LoadingLogo from "../../components/reuseable/LoadingLogo";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { toast } from "react-toastify";

const ShareEscrowLink = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const { data: user, isLoading: userLoading } = useUser();
  const [selectedReason, setSelectedReason] = useState("");
  const {
    data,
    isLoading: transactionLoading,
    isError,
    isSuccess,
  } = useTransactionInfo(ref);
    console.log("🚀 ~ file: ShareEscrowLink.tsx:25 ~ ShareEscrowLink ~ data:", data)

  const { mutate, isLoading } = useRespondTransaction();
  const [modal, setModal] = useState(false);
  const { handleSubmit, control, reset } = useForm();
  const location = useLocation();
  useEffect(() => {
    if (isSuccess) {
      reset({
        purpose: data.data.escrowMetadata.purpose,
        type: data.data.escrowMetadata.itemType,
        itemQuantity: data.data.escrowMetadata.itemQuantity,
        amount: data.data.amount,
        timeline: data.data.escrowMetadata.deliveryDate,
        bankName: "",
        accNum: "",
        email: data.data.escrowMetadata.partnerEmail,
        number: data.data.escrowMetadata.partnerEmail,
      });
    }
  }, [reset, isSuccess]);
  const rejectedReason = [
    {
      title: "wrong amount",
      value: "WRONG_AMOUNT",
    },
    {
      title: "wrong description",
      value: "WRONG_DESCRIPTION",
    },
    {
      title: "wrong choice of item(s)",
      value: "WRONG_ITEM_CHOICE",
    },
    {
      title: "wrong quantity",
      value: "WRONG_QUANTITY",
    },
    {
      title: "wrong delivery data",
      value: "WRONG_DELIVERY_DATA",
    },
  ];
  if (userLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingLogo />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{from: location}} />;
  }

  return (
    <div className="px-[5%]">
      <AlertDialog.Root open={modal}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-[#3a3a3a]/50  backdrop-blur-md fixed inset-0 z-50 " />
          <AlertDialog.Content className="animate-jump   fixed top-0 left-0 z-50 w-full h-full  ">
            <div className="w-full max-w-[380px] py-2 px-8  rounded-lg absolute bg-white  top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 ">
              <div className="mt-6 text-center">
                <h1 className="text-2xl font-medium text-center">
                  Reason For Rejecting
                </h1>
                <p className="text-lg font-normal text-[#3A3A3A]">
                  Select your reason for <br /> rejecting this transaction.
                </p>
              </div>{" "}
              <div className="space-y-4 my-6">
                {rejectedReason.map(({ title, value }) => {
                  return (
                    <div className="flex gap-5  capitalize">
                      <input
                        checked={selectedReason === value}
                        onChange={() => setSelectedReason(value)}
                        type="checkbox"
                        className="accent-primary-normal cursor-pointer  text-white"
                        id={value}
                      />
                      <label className="cursor-pointer" htmlFor={value}>
                        {title}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 flex-col">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setModal(false);
                  }}
                  disabled={isLoading}
                >
                  cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedReason) {
                      mutate({
                        ref: ref,
                        status: "REJECTED",

                        rejectedReason: selectedReason, // Pass the selected reason to the API
                      });
                    } else {
                      toast.error("you have to select a reason for rejection");

                      // Handle the case where no reason is selected
                    }
                  }}
                >
                  {isLoading ? "Loading...." : " reject information"}
                </Button>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <Header />

      <div className="w-fit mx-auto relative mt-[50px]">
        {isLoading && <LoadingOverlay />}
        <h1 className="h6">TMusty Shared an Escrow Link With You</h1>
        <h1 className="h6">TMusty Shared an Escrow Link With You</h1>

        <form action="">
          <h1 className="text-[#EDEDED] text-lg font-medium mb-2 ">
            ITEM(S) INFORMATION
          </h1>

          <div className="flex  flex-col gap-4">
            <TextField
              control={control}
              name="purpose"
              rules={{ required: "this field is required" }}
              label="Purpose of escrow"
              placeholder="e.g 20,000"
              readOnly
            />
            <TextField
              control={control}
              name="type"
              rules={{ required: "this field is required" }}
              label="Type of item(s)"
              placeholder="****"
              readOnly
            />
            <TextField
              control={control}
              name="itemQuantity"
              rules={{ required: "this field is required" }}
              label="Number of item(s)"
              placeholder="give a description"
              readOnly
            />
            <TextField
              control={control}
              name="amount"
              rules={{ required: "this field is required" }}
              label="Amount"
              placeholder="give a description"
              readOnly
            />
            <TextField
              control={control}
              name="timeline"
              type="date"
              rules={{ required: "this field is required" }}
              label="Delivery timeline"
              placeholder="Select number of days"
              readOnly
            />
          </div>
          <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
            VENDOR ACCOUNT INFORMATION
          </h1>
          <div className="mt-6 flex flex-col gap-4">
            <TextField
              control={control}
              name="bankName"
              rules={{ required: "this field is required" }}
              label="Bank Name"
              readOnly
              placeholder="Access Bank"
            />
            <TextField
              control={control}
              name="accNum"
              rules={{ required: "this field is required" }}
              label="Enter Account number"
              placeholder="1234567890"
              readOnly
            />
            <TextField
              control={control}
              name="accName"
              rules={{ required: "this field is required" }}
              label="Account Name"
              placeholder="e.g JMusty Feet"
              readOnly
            />
            <TextField
              control={control}
              name="email"
              rules={{ required: "this field is required" }}
              label="Email"
              placeholder="e.g JMustyfeet@gmail.com"
              readOnly
            />
            <TextField
              control={control}
              name="number"
              rules={{ required: "this field is required" }}
              label="Phone number"
              placeholder="090123456789"
              readOnly
            />
          </div>

          <div className="mt-6 space-y-3 mb-16">
            <Button
              fullWidth
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                // mutate({
                //   ref: ref,
                //   status: "REJECTED",
                // });

                setModal(true);
              }}
            >
              {" "}
              reject information{" "}
            </Button>
            <Button
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                mutate({
                  ref: ref,
                  status: "APPROVED",
                });
              }}
            >
              {" "}
              accept information{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareEscrowLink;
