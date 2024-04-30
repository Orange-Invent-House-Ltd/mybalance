import { useEffect, useState } from "react";
import info from "../../assets/Icons/InformationCircle.svg";

import { Button } from "../reuseable/Button";
import TextField from "../reuseable/TextField1";
import back from "../../assets/Icons/back.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useBanks, useUser } from "../../hooks/queries";
import Skeleton from "react-loading-skeleton";
import LoadingOverlay from "../reuseable/LoadingOverlay";
import { useCreateEscrow, useLookUpBank } from "../../hooks/mutations";
import moment from "moment";
import infoIcon from "../../assets/Icons/info-icon.svg";

const Header = () => {
  const [isVerify, setIsVerify] = useState(false);
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [accNum, setAccNum] = useState("");

  var today = moment().format("YYYY-MM-DD");

  const { handleSubmit, control, reset } = useForm();
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const { data: user } = useUser();
  const {
    data: LookupData,
    mutate: LookupMutate,
    isLoading: LookupIsLoading,
  } = useLookUpBank();
  const { mutate: createEscrowMutate, isLoading: createEscrowIsLoading } =
    useCreateEscrow();
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const onSubmit = (data: any) => {
    delete data?.accountName;
    delete data?.accountNumber;
    createEscrowMutate({
      ...data,
      bankCode: code,
      bankAccountNumber: accNum,
    });
  };
  useEffect(() => {
    if (accNum.length === 10) {
      LookupMutate({ bankCode: code, accountNumber: accNum });
    }
  }, [accNum, code]);
  const words = user?.fullName.split(" ");
  const firstLetter = words?.[0][0];
  const secondLetter = words?.[1] && words[1].length > 0 ? words[1][0] : "";
  useEffect(() => {
    reset({
      accountNumber: user?.bankAccount.accountNumber,
      accountName: user?.bankAccount.accountName,
    });
    setCode(user?.bankAccount?.bankCode);
    setAccNum(user?.bankAccount.accountNumber);
  }, [reset]);
  return (
    <div className="flex flex-col items-center md:flex-row gap-6 justify-between">
      <div className="flex items-center gap-4">
        <div>
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt=""
              className="w-[60px] cursor-pointer h-[60px] object-cover rounded-full"
            />
          ) : (
            <div className="w-[60px] cursor-pointer h-[60px] bg-[#FFF2E8] border-2 border-[#FECA9F] text-2xl text-[#9A4D0C] rounded-full  flex items-center justify-center uppercase font-bold">
              {firstLetter}
              {secondLetter}
            </div>
          )}
        </div>
        <div>
          <h6 className="h6">{user?.fullName || <Skeleton width={100} />}</h6>
          <p className="mt-[-20px] max-w-[478px] text-[#303030] capitalize font-normal text-sm leading-[18.9px] ">
            your last login was in{" "}
            {user && user.lastLoginDate ? (
              new Date(user.lastLoginDate).toLocaleString()
            ) : (
              <Skeleton width={100} />
            )}
          </p>
          {user?.freeEscrowTransactions !== 0 && (
            <div className="flex find-name gap-1 items-center text-sm w-fit bg-[#EBF4EC] px-2 py-1 font-medium rounded-2xl border border-[#D7EAD9]   mt-2 text-[#2D7738]">
              <p className="">
                You have <b>{user?.freeEscrowTransactions}</b> free escrow
                transaction(s)
              </p>
              <img src={infoIcon} className="inline" alt="information" />
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:flex w-[343px]  md:w-[300px]">
        <Button fullWidth variant="contained" onClick={() => setIsVerify(true)}>
          Create One-time MyBalance Link
        </Button>
      </div>
      {/* Create MyBalance link - mobile view */}
      <div className="md:hidden mt-4 p-2 flex gap-2 justify-between items-center border border-[#FFF2E8]">
        <p className="font-semibold text-sm">
          Create your one-time MyBalance link.
        </p>
        <div className="w-[150px] createlink">
          <Button fullWidth onClick={() => setIsVerify(true)}>
            Create link
          </Button>
        </div>
      </div>

      <Dialog.Root open={isVerify}>
        <Dialog.Portal className="">
          <Dialog.Overlay
            onClick={() => setIsVerify(false)}
            className="bg-[#3a3a3a]/50 z-50 fixed inset-0"
          />

          <Dialog.Content>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-[400px] h-screen z-50 fixed top-0 right-0 animate-fade-left animate-duration-300 animate-ease-out bg-white px-[16px] pb-14 sm:pb-0 overflow-y-scroll"
            >
              <div className="relative">
                {createEscrowIsLoading && <LoadingOverlay />}
                <div className="flex gap-4 items-center mt-10 mb-4">
                  <img
                    src={back}
                    alt="back"
                    onClick={() => setIsVerify(false)}
                  />
                  <h6 className="text-[23px] font-medium">
                    Create MyBalance Link
                  </h6>
                </div>
                <p className="text-[16px] text-[#303030] font-normal mb-8">
                  Create your MyBalance escrow information and share with
                  everyone.
                </p>
                <h1 className="text-[#393737] text-lg font-medium">
                  ITEM(S) INFORMATION
                </h1>
                <div className="mt-6 flex flex-col gap-4">
                  <TextField
                    control={control}
                    rules={{ required: "this field is required" }}
                    name={"purpose"}
                    label="Purpose of creating  escrow"
                    placeholder="Purchase of sneakers"
                  />
                  <TextField
                    control={control}
                    rules={{ required: "this field is required" }}
                    name={"itemType"}
                    label="Type of item(s)"
                    placeholder="Gucci sneakers"
                  />
                  <TextField
                    control={control}
                    rules={{ required: "this field is required" }}
                    name={"itemQuantity"}
                    label="Number of item(s)"
                    placeholder="5"
                    type="number"
                  />
                  <TextField
                    control={control}
                    rules={{ required: "this field is required" }}
                    name={"amount"}
                    label="Amount"
                    placeholder="20000"
                    type="number"
                    min={1}
                  />
                  <TextField
                    control={control}
                    rules={{ required: "this field is required" }}
                    name={"deliveryDate"}
                    label="Delivery timeline"
                    placeholder="Select number of days"
                    type="date"
                    min={today}
                  />
                  <TextField
                    control={control}
                    rules={{
                      required: "this field is required",
                      pattern: {
                        message: "requires a valid email",
                        value: /\S+@\S+\.\S+/,
                      },
                    }}
                    name={"partnerEmail"}
                    label="Buyer’s email address"
                    placeholder="tommy@gmail.com"
                  />
                </div>
                <h1 className="mt-6 text-[#393737] text-lg font-medium">
                  VENDOR ACCOUNT INFORMATION
                </h1>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="w-full mb-3 ">
                    <label htmlFor={"selectBank"} className="block">
                      select bank
                    </label>
                    <select
                      className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
                      disabled
                    >
                      <option value={code}>
                        {user?.bankAccount?.bankName}
                      </option>
                    </select>
                  </div>
                  <TextField
                    control={control}
                    label="Enter Account number"
                    placeholder="1234567890"
                    name={"accountNumber"}
                    value={accNum}
                    disabled
                  />
                  <TextField
                    readOnly={true}
                    control={control}
                    name={"accountName"}
                    label="Account Name"
                    placeholder="JMusty Feet"
                    disabled
                  />

                  {/* <TextField
                  control={control}
                  rules={{
                    required: "this field is required",
                    pattern: {
                      message: "requires a valid email",
                      value: /\S+@\S+\.\S+/,
                    },
                  }}
                  name={"sellerEmail"}
                  label="Email Address"
                  placeholder="e.g JMustyfeet@gmail.com"
                /> */}
                </div>
                <div className="mt-6 mb-5">
                  <Button
                    disabled={createEscrowIsLoading}
                    fullWidth
                    type="submit"
                  >
                    Share Escrow Link
                  </Button>
                </div>
              </div>
            </form>
            {/* </div> */}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Header;
