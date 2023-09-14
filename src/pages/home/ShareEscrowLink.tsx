import React, { useEffect } from "react";
import Header from "../../components/home/Header";
import { Button } from "../../components/reuseable/Button";
import TextField from "../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useTransactionInfo } from "../../hooks/queries";
import { useSearchParams } from "react-router-dom";
import { useRespondTransaction } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";

const ShareEscrowLink = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const {
    data,
    isLoading: transactionLoading,
    isError,
    isSuccess,
  } = useTransactionInfo(ref);

  const { mutate, isLoading } = useRespondTransaction();

  const { handleSubmit, control, reset } = useForm();
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
  return (
    <div className="px-[5%]">
      <Header />
      <div className="w-fit mx-auto relative mt-[50px]">
        {isLoading && <LoadingOverlay />}
        <h6 className="h6">TMusty Shared an Escrow Link With You</h6>
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
                mutate({
                  ref: ref,
                  status: "REJECTED ",
                });
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
                  status: "APPROVED ",
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
