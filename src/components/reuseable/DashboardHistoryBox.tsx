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
import { Copy } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {
  useFundEscrow,
  useLockFunds,
  useRespondTransaction,
} from "../../hooks/mutations";

const DashboardHistoryBox = (data: any) => {
  const { handleSubmit, control, reset } = useForm();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [modal, setModal] = useState(false);
  console.log(data);

  let transactionInfo = localStorage.getItem("transactionInfo") as any;
  const [open, setOpen] = useState(false);
  const [openPay, setOpenPay] = useState(false);

  const {
    mutate,
    isLoading,
    isSuccess: respondSuccessful,
  } = useRespondTransaction();

  useEffect(() => {
    if (data) {
      reset({
        buyersEmail: data?.escrowMetadata?.parties?.buyer?.email,
        buyersName: data?.escrowMetadata?.parties?.buyer?.name,
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
      title: "wrong delivery date",
      value: "WRONG_DELIVERY_DATE",
    },
  ];

  const handleReasonSelection = (value: string) => {
    if (selectedReasons.includes(value)) {
      setSelectedReasons(selectedReasons.filter((reason) => reason !== value));
    } else {
      setSelectedReasons([...selectedReasons, value]);
    }
  };

  return (
    <>
      {/* Rejection Moodal */}
      <AlertDialog.Root open={modal}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-[#3a3a3a]/50  backdrop-blur-md fixed inset-0 z-50 " />
          <AlertDialog.Content className="animate-jump   fixed top-0 left-0 z-50 w-full h-full  ">
            <div className="w-full max-w-[380px] py-2 px-8  rounded-lg absolute bg-white  top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 ">
              <div className="mt-6 text-center">
                <h1 className="text-2xl font-medium text-center">
                  Reason[s] For Rejecting
                </h1>
                <p className="text-lg font-normal text-[#3A3A3A]">
                  Select your reason[s] for <br /> rejecting this transaction.
                </p>
              </div>{" "}
              <div className="space-y-4 my-6">
                {rejectedReason.map(({ title, value }) => {
                  return (
                    <div className="flex gap-5  capitalize">
                      <input
                        checked={selectedReasons.includes(value)}
                        onChange={() => handleReasonSelection(value)}
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
                    if (selectedReasons?.length > 0) {
                      mutate(
                        {
                          ref: data?.reference,
                          status: "REJECTED",
                          rejectedReason: selectedReasons, // Pass the selected reason to the API
                        },
                        {
                          onSuccess: () => {
                            navigate("/buyer/dashboard");
                          },
                        }
                      );
                      console.log(selectedReasons);
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
          <div className="text-[#999999] text-[14px] flex items-center gap-x-2">
            {data?.reference}
            <Copy
              className=""
              onClick={() => {
                navigator.clipboard.writeText(data?.reference);
                toast.success("Reference id copied successfully!");
              }}
            />
          </div>
          <p className="text-lg font-medium">{data?.meta?.title}</p>
          {user?.userType === "SELLER" && (
            <p className="mr-2">
              {data?.escrowMetadata?.parties?.buyer?.name}
            </p>
          )}
          <p className="text-sm font-normal w-[150px] truncate ">
            {data?.meta.description}
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
      {/* Transaction Details */}
      <Dialog.Root open={open}>
        <Dialog.Portal className="">
          <Dialog.Overlay
            onClick={() => setOpen(false)}
            className="bg-[#3a3a3a]/50 z-50 fixed inset-0"
          />

          <Dialog.Content>
            <div className="max-w-[393px] w-full h-[100svh] z-50 fixed animate-fade-left animate-duration-300 top-0 right-0 animate-ease-out bg-white md:pl-[16px] px-3 md:pr-[34px] pb-8 overflow-y-scroll">
              <div className="flex gap-4 items-center pt-10 pb-8">
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
                {/* {user?.userType === "SELLER" && (<> */}
                <h1 className="text-[#393737] text-lg font-medium">
                  BUYER INFORMATION
                </h1>
                <div className="mt-6 flex flex-col gap-4 mb-4">
                  <TextField
                    name="buyerName"
                    label="Buyer's name"
                    placeholder="Aremu Jamiu"
                    readOnly={true}
                    value={data?.escrowMetadata?.parties?.buyer?.name}
                    control={control}
                  />
                  <TextField
                    name="buyerEmail"
                    label="Buyer's email"
                    placeholder="jaremu@oinvent.com"
                    readOnly={true}
                    value={data?.escrowMetadata?.parties?.buyer?.email}
                    control={control}
                  />
                </div>
                {/* </>)} */}
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
                <div className="flex flex-col gap-y-4 mt-6">
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
                {/* Accept and Reject Button */}
                {data?.meta?.escrowAction === undefined &&
                  user?.userType !== data?.escrowMetadata?.author && (
                    <div className="mt-4 space-y-3">
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={(e) => {
                          e.preventDefault();
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
                          mutate(
                            {
                              ref: data?.reference,
                              status: "APPROVED",
                            },
                            {
                              onSuccess: () => {
                                if (
                                  data.data.escrowMetadata.author === "SELLER"
                                ) {
                                  setOpenPay(true);
                                  setOpen(false)
                                } else {
                                  // navigate("/seller/dashboard");
                                  setOpen(false)
                                }
                              },
                            }
                          );
                          setOpen(false)
                        }}
                      >

                        {" "}
                        accept information{" "}
                      </Button>
                    </div>
                  )}
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default DashboardHistoryBox;
