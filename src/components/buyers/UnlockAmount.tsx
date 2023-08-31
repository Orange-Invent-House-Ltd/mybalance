import { useEffect, useState } from "react";
import back from "../../assets/Icons/back.svg";
import TextField from "../reuseable/TextField1";
import { Button } from "../reuseable/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUnLockFunds } from "../../hooks/mutations";
import check from "../../assets/Icons/check.svg";
import loadingImg from "../../assets/Icons/loadingSpinner.svg";
import Spinner from "../reuseable/Spinner";

const UnlockAmount = ({ setUnlock, description, timeline, amount }: any) => {
  const [value, setValue] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const { handleSubmit, control, reset } = useForm();
  const { isLoading, isSuccess, mutate, data: fundsData } = useUnLockFunds();
  let data = localStorage.getItem("unlockAmountData") as any;
  data = JSON.parse(data);
  useEffect(() => {
    // you can do async server request and fill up form
    if (data) {
      console.log("🚀 ~ file: UnlockAmount.tsx:21 ~ useEffect ~ data:", data);
      reset({
        purpose: data?.meta?.title,
        type: data?.escrowMetadata.itemType,
        number: data.escrowMetadata.itemQuantity,
        amt: data?.lockedAmount?.amount,
        time: new Date(data.escrowMetadata.createdAt),
        bankNumber: "",
        accNum: "",
        accName: "",
        email: data.escrowMetadata.partnerEmail,
      });
    }
  }, [reset]);
  useEffect(() => {
    if (isSuccess) {
      console.log(fundsData);
      setUnlock(false);
      setSuccessModal(true);
    }
  }, [isSuccess]);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
      <div className="w-[393px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
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
              type="number"
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
          <div className="flex flex-col gap-6 mt-6 mb-16">
            <Link to="/buyer/dispute-resolution">
              <Button
                onClick={() => navigate("/buyer/dispute-resolution")}
                fullWidth
                variant="outlined"
              >
                Report a dispute
              </Button>
            </Link>
            <Button
              onClick={(e) => {
                e.preventDefault()
                mutate(data?.reference);
              }}
              fullWidth
            >
              {isLoading ? "loading...." : "Unlock amount"}
            </Button>
          </div>
        </form>
      </div>
      {successModal && (
        <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-1  ">
          <div className="w-[400px] bg-white p-[20px] rounded-[5px] flex flex-col ">
            <div className="flex items-center w-fit rounded-full bg-[#ECFDF3] justify-center">
              <img className="   " src={check} alt="check" />
            </div>

            <h6 className="font-semibold text-lg">New Amount Unlocked! 👍🏾</h6>
            <p className="mt-2   text-base font-normal leading-[21.6px]">
              Weldone! You have successfully unlocked [amount]. It will reflect
              in your unlocked amount on your dashboard.
            </p>
            <div className="w-full space-y-2 mt-2">
              <Button
                fullWidth={true}
                success
                variant="black-outlined"
                onClick={() => setSuccessModal(false)}
              >
                Unlock another amount
              </Button>
              <Button
                fullWidth={true}
                onClick={() => navigate("/buyer/dashboard")}
                success
              >
                Return to dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnlockAmount;
