import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import { Button } from "../../components/reuseable/Button";
import TextField from "../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useTransactionInfo, useUser } from "../../hooks/queries";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  useFundEscrow,
  useLockFunds,
  useRespondTransaction,
} from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import LoadingLogo from "../../components/reuseable/LoadingLogo";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { toast } from "react-toastify";
import wallet from "../../assets/Icons/alertWallet.svg";
import formatToNairaCurrency from "../../util/formatNumber";

const ShareEscrowLink = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const { data: user, isLoading: userLoading } = useUser();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [fundEscrow, setFundEscrow] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const {
    data: fundEscrowData,
    mutate: fundEscrowMutate,
    isLoading: fundEscrowIsLoading,
  } = useFundEscrow();

  const {
    data,
    isLoading: transactionLoading,
    isError,
    isSuccess,
  } = useTransactionInfo(ref);

  const {
    mutate,
    isLoading,
    isSuccess: respondSuccessful,
  } = useRespondTransaction();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { handleSubmit, control, reset } = useForm();
  const location = useLocation();
  useEffect(() => {
    if (isSuccess) {
      reset({
        purpose: data.data.escrowMetadata.purpose,
        type: data.data.escrowMetadata.itemType,
        itemQuantity: data.data.escrowMetadata.itemQuantity,
        amount: formatToNairaCurrency(data.data?.amount),
        timeline: data.data.escrowMetadata?.deliveryDate,
        bankName: data.data?.escrowMetadata.meta?.bankName,
        accNum: data.data?.escrowMetadata.meta?.accountNumber,
        accName: data.data?.escrowMetadata.meta?.accountName,
        email: data.data.escrowMetadata.partnerEmail,
      });
    }
  }, [reset, isSuccess]);
  const {
    data: lockFundsData,
    mutate: lockFundsMutate,
    isLoading: lockFundsLoading,
    error,
  } = useLockFunds();
  const deficit = error?.response?.data?.errors?.deficit;

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
  if (userLoading || transactionLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingLogo />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
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
                    if (selectedReasons.length > 0) {
                      mutate(
                        {
                          ref: ref,
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
      <Header />
      <h1 className="h6 mt-[100px] text-center">
        <span className="capitalize">
          {data.data.escrowMetadata.authorName}
        </span>{" "}
        Shared an Escrow Link With You
      </h1>
      <div className="w-fit mx-auto relative bg-[#FFF2E8] ">
        {isLoading && <LoadingOverlay />}

        <form action="">
          <h1 className="text-[#393737] text-lg font-medium mb-2 ">
            ITEM(S) INFORMATION
          </h1>

          <div className="flex  flex-col gap-4">
            <TextField
              control={control}
              name="purpose"
              rules={{ required: "this field is required" }}
              label="Purpose of escrow"
              placeholder="Payment for Yellow Wool Beanie"
              readOnly
            />
            <TextField
              control={control}
              name="type"
              rules={{ required: "this field is required" }}
              label="Type of item(s)"
              placeholder="Beanie"
              readOnly
            />
            <TextField
              control={control}
              name="itemQuantity"
              rules={{ required: "this field is required" }}
              label="Number of item(s)"
              placeholder="3"
              readOnly
            />
            <TextField
              control={control}
              name="amount"
              rules={{ required: "this field is required" }}
              label="Amount"
              placeholder="5,000"
              readOnly
            />
            <TextField
              control={control}
              name="timeline"
              type="date"
              rules={{ required: "this field is required" }}
              label="Delivery timeline"
              placeholder="24/08/2023"
              readOnly
            />
          </div>
          <h1 className="mt-6 text-[#393737] text-lg font-medium">
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
          </div>

          <div className="mt-6 space-y-3 mb-16">
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
                    ref: ref,
                    status: "APPROVED",
                  },
                  {
                    onSuccess: () => {
                      if (data.data.escrowMetadata.author === "SELLER") {
                        setOpenPay(true);
                      } else {
                        navigate("/seller/dashboard");
                      }
                    },
                  }
                );
              }}
            >
              {" "}
              accept information{" "}
            </Button>
          </div>
        </form>
      </div>
      <AlertDialog.Root open={fundEscrow} onOpenChange={setFundEscrow}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black/10 backdrop-blur  z-50 fixed inset-0" />
          <AlertDialog.Content className="z-50  fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[24px] ">
            <img src={wallet} className="mb-[20px]" alt="" />
            <AlertDialog.Title className=" text-[18px] font-medium">
              Insufficient Balance!
            </AlertDialog.Title>
            <AlertDialog.Description className=" mt-4 mb-5 text-[15px] leading-normal">
              <p>
                Please top up your wallet with{" "}
                <strong>{formatToNairaCurrency(deficit)}</strong> to complete
                this transaction, as the charges are inclusive.
              </p>
            </AlertDialog.Description>

            <Button
              fullWidth
              onClick={() => {
                fundEscrowMutate(
                  {
                    transactionReference: ref,
                    amountToCharge: deficit,
                  },
                  {
                    onSuccess: (data) => {
                      window.open(data?.data?.link, "_blank");
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
      <AlertDialog.Root open={openPay} onOpenChange={setOpenPay}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black/10 backdrop-blur  z-50 fixed inset-0" />
          <AlertDialog.Content className="z-50  fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[24px] ">
            <AlertDialog.Title className=" text-[18px] font-medium">
              <img src={wallet} className="mb-[20px]" alt="" />
              Pay Amount
            </AlertDialog.Title>
            <AlertDialog.Description className=" mt-4 mb-5 text-[15px] leading-normal">
              <p>
                You are about to lock{" "}
                <strong>{formatToNairaCurrency(data?.data?.amount)}</strong> for
                this transaction, as the charges are inclusive.
              </p>
            </AlertDialog.Description>

            <Button
              fullWidth
              onClick={() => {
                lockFundsMutate(ref || "", {
                  onSettled: () => {
                    setOpenPay(false);
                  },
                  onError: (data) => {
                    if (
                      data?.response?.data?.errors?.message ===
                      "Insufficient funds in wallet."
                    ) {
                      setFundEscrow(true);
                    }
                  },
                  onSuccess: () => {
                    navigate("/buyer/dashboard");
                  },
                });
              }}
            >
              {lockFundsLoading ? "loading..." : " Pay now"}
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default ShareEscrowLink;
