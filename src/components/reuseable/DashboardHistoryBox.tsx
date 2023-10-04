import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import back from "../../assets/Icons/back.svg";
import TextField from "./TextField1";
import { Button } from "./Button";
import { toast } from "react-toastify";

import formatToNairaCurrency from "../../util/formatNumber";
import { useUser } from "../../hooks/queries";

// type historyprops = {
//   header: string;
//   text: string;
//   price: string;
//   subtext: string;
//   data.status: string;
// };

const DashboardHistoryBox = (data: any) => {
  const { handleSubmit, control, reset } = useForm();
  const navigate = useNavigate();
  const { data: user } = useUser();

  let transactionInfo = localStorage.getItem("transactionInfo") as any;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (data) {
      reset({
        purpose: data?.escrowMetadata?.purpose,
        type: data?.escrowMetadata?.itemType,
        number: data?.escrowMetadata?.itemQuantity,
        amt: formatToNairaCurrency(data?.amount),
        email: data?.escrowMetadata?.partnerEmail,
        time: data?.escrowMetadata?.deliveryDate,
        accName: data?.escrowMetadata?.meta?.accountName,
        accNum: data?.escrowMetadata?.meta?.accountNumber,
        bankName: data?.escrowMetadata?.meta?.bankName,
      });
    }
  }, [reset, data]);
  return (
    <>
      <div
        onClick={() => {
          if (data.type === "ESCROW" && data.status === "SUCCESSFUL") {
            setOpen(true);
            localStorage.setItem("transactionInfo", JSON.stringify(data));
            console.log("🚀 ~ file: DashboardHistoryBox.tsx:29 ~ data:", data);
          }
        }}
        className="my-4 flex w-full cursor-pointer justify-between items-center gap-2 rounded border shadow-lg shadow-[#E4E4E4] border-white  px-6 md:px-[40px] py-[20px]"
      >
        <div
          className={clsx("", {
            "text-[#B7B7B7]":
              data.status === "SUCCESSFUL" ||
              data.status === "FUFILLED" ||
              data.status === "APPROVED" ||
              data.status === "RESOLVED",
          })}
        >
          <p className="text-lg font-medium">{data.meta.title}</p>
          <p className="text-sm font-normal">{data.meta.description}</p>
        </div>
        <div
          className={clsx("", {
            "text-[#B7B7B7]":
              data.status === "SUCCESSFUL" ||
              data.status === "FUFILLED" ||
              data.status === "APPROVED" ||
              data.status === "RESOLVED",
          })}
        >
          <div
            className={clsx("status_style  ", {
              "bg-[#ECFDF3]  text-[#027A48]":
                data.status === "SUCCESSFUL" ||
                data.status === "FUFILLED" ||
                data.status === "APPROVED" ||
                data.status === "RESOLVED",
              " bg-[#FFF2F1] text-[#DA1E28]": data.status === "PENDING",
              " bg-[#EDEDED] text-[#373737]":
                data.status === "REJECTED" || data.status === "FAILED",
              " bg-[#FFFCF2] text-[#FDB022]": data.status === "PENDING",
            })}
          >
            <p className="capitalize">{data.status.toLowerCase()}</p>
          </div>
          <p className="text-lg font-bold text-right">
            {formatToNairaCurrency(data.amount)}
          </p>
          <p className="text-[#B7B7B7] text-[10px] font-normal text-right">
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <Dialog.Root open={open}>
        <Dialog.Portal className="">
          <Dialog.Overlay
            onClick={() => setOpen(false)}
            className="bg-[#3a3a3a]/50 z-50   fixed inset-0"
          />

          <Dialog.Content>
            <div className="w-[393px]  h-screen z-50 fixed animate-fade-left animate-duration-300 top-0 right-0 animate-ease-out bg-white pl-[16px] pr-[34px] overflow-y-scroll">
              <div className="flex gap-4 items-center pt-10 mb-8">
                <img
                  onClick={() => setOpen(false)}
                  src={back}
                  alt="back"
                  className=" cursor-pointer"
                />
                <h6 className="text-[23px] font-medium">
                  View Transaction Details{" "}
                </h6>
              </div>
              <form action="">
                <h1 className="text-[#EDEDED] text-lg font-medium">
                  ITEM(S) INFORMATION
                </h1>
                <div className="mt-6 flex flex-col gap-4">
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"purpose"}
                    label="Purpose of escrow"
                    placeholder="e.g 20,000"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"type"}
                    label="Type of item(s)"
                    placeholder="i phone"
                    readOnly
                  />
                  <TextField
                    control={control}
                    rules={{ required: false }}
                    name={"number"}
                    label="Number of item(s)"
                    placeholder="give a description"
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
                <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
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
                <div className="flex flex-col gap-6 mt-6 mb-5">
                  {data?.escrowMetadata?.author === user?.userType && (
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://www.mybalanceapp.com/share-escrow-link/share-escrow-link?ref=${data?.reference}`
                        );
                        toast.success("link has been copied to clipboard");
                      }}
                      fullWidth
                      variant="outlined"
                      type="button"
                    >
                      copy escrow link
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      navigate(
                        `/${user?.userType.toLowerCase()}/dispute-resolution/add`
                      )
                    }
                    fullWidth
                  >
                    Report a dispute
                  </Button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default DashboardHistoryBox;
