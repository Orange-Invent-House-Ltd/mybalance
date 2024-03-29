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
          if (data?.type === "ESCROW" && data?.status === "SUCCESSFUL") {
            setOpen(true);
            localStorage.setItem("transactionInfo", JSON.stringify(data));
          }
        }}
        className="  my-4 flex w-full cursor-pointer justify-between items-center gap-2 rounded border shadow-lg shadow-[#E4E4E4] border-white  px-6 md:px-[40px] py-[20px]"
      >
        <div
          className={clsx("", {
            "text-[#B7B7B7]": !(
              data?.status === "SUCCESSFUL" && data?.type === "ESCROW"
            ),
          })}
        >
          <p className="text-lg font-medium">{data.meta.title}</p>
          <p className="text-sm font-normal  w-[150px] truncate ">
            {data.meta.description}
          </p>
        </div>
        <div
          className={clsx("", {
            "text-[#B7B7B7]": !(
              data?.status === "SUCCESSFUL" && data?.type === "ESCROW"
            ),
          })}
        >
          <div
            className={clsx("status_style", {
              "bg-[#ECFDF3]  text-[#027A48]":
                data.status === "SUCCESSFUL" ||
                data.status === "FUFILLED" ||
                data.status === "APPROVED" ||
                data.status === "RESOLVED",
              " bg-[#FFF2F1] text-[#DA1E28]": data.status === "PENDING",
              " bg-[#EDEDED] text-[#373737]":
                data.status === "REJECTED" ||
                data.status === "FAILED" ||
                data.status === "CANCELLED",
              " bg-[#FFFCF2] text-[#FDB022]": data.status === "PAUSED",
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
            <div className="max-w-[393px]  w-full  h-[100svh] z-50 fixed animate-fade-left animate-duration-300 top-0 right-0 animate-ease-out bg-white md:pl-[16px] px-3 md:pr-[34px] overflow-y-scroll">
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
                <h1 className="text-[#393737] text-lg font-medium">
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
                <div className="flex flex-col gap-6 mt-6 mb-10">
                  <Button
                    disabled={data?.meta?.escrowAction !== "APPROVED"}
                    onClick={() =>
                      navigate(
                        `/${user?.userType.toLowerCase()}/dispute-resolution/add`
                      )
                    }
                    fullWidth
                    variant="outlined"
                  >
                    Raise a dispute
                  </Button>
                  {data?.escrowMetadata?.author === user?.userType && (
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${
                            import.meta.env.VITE_DOMAIN_URL
                          }/share-escrow-link?ref=${data?.reference}`
                        );
                        toast.success("link has been copied to clipboard");
                      }}
                      fullWidth
                      type="button"
                    >
                      copy escrow link
                    </Button>
                  )}
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
