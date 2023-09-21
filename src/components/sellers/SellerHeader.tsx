import { useState } from "react";
import bell from "../../assets/Icons/notification.svg";
import { Button } from "../reuseable/Button";
import TextField from "../reuseable/TextField1";
import back from "../../assets/Icons/back.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useBanks, useUser } from "../../hooks/queries";
import Skeleton from "react-loading-skeleton";

type HeaderProps = {
  Heading: string;
  Text: string;
};
const Header = ({ Heading, Text }: HeaderProps) => {
  const [isVerify, setIsVerify] = useState(false);
  const [value, setValue] = useState("");
  const { handleSubmit, control, register } = useForm();
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const { data: user } = useUser();

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const onSubmit = (data: any) => {
    delete data?.accountName;
    delete data?.accountNumber;
    // createEscrowMutate({
    //   ...data,
    //   bankCode: "035",
    //   bankAccountNumber: accNum,
    // });
  };
  const words = user?.fullName.split(" ");
  const firstLetter = words?.[0][0]; // Get the first letter of the first word
  const secondLetter = words?.[1] && words[1].length > 0 ? words[1][0] : "";
  return (
    <div className="flex flex-col items-center md:flex-row gap-6 justify-between mb-8">
      <div className="flex gap-4">
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
          <p className="max-w-[478px] text-[#303030] capitalize font-normal text-sm leading-[18.9px] ">
            your last login was in{" "}
            {user && user.lastLoginDate ? (
              new Date(user.lastLoginDate).toLocaleString()
            ) : (
              <Skeleton width={100} />
            )}
          </p>
        </div>
      </div>
      <img src={bell} alt="notification bell" className="hidden md:flex ml-auto mr-4"/>
      <div className="hidden md:flex w-[343px] md:w-[300px]">
        <Button fullWidth variant="contained" onClick={() => setIsVerify(true)}>Create One-time MyBalance Link</Button>
      </div>
      {/* Create MyBalance link - mobile view */}
      <div className="md:hidden mt-4 p-2 flex gap-2 justify-between items-center border border-[#FFF2E8]">
        <p className="font-semibold text-sm">
          Create your one-time MyBalance link.
        </p>
        <div className="w-[150px]">
          <Button fullWidth onClick={() => setIsVerify(true)}>
            Create link
          </Button>
        </div>
      </div>
      {/* {isVerify && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-rgba flex justify-end z-50">
          <div className="w-[400px] bg-white pl-[16px] pr-[34px] overflow-y-scroll">
            <div className="flex items-start gap-4 mt-10 mb-4">
              <img
                src={back}
                alt="back"
                onClick={() => setIsVerify(false)}
                className="mt-2 cursor-pointer"
              />
              <h6 className="text-[23px] font-medium">
                Create One-Time MyBalance Link
              </h6>
            </div>
            <p className="text-[16px] text-[#303030] font-normal mb-8">
              The Item(s) Information should be filled by your prospective
              buyers/customers.
            </p>
            <h1 className="text-[#EDEDED] text-lg font-medium">
              ITEM(S) INFORMATION
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <TextField
                label="Purpose of escrow"
                name="purpose"
                placeholder="e.g 20,000"
              />
              <TextField
                label="Type of item(s)"
                name="item_type"
                placeholder="****"
              />
              <TextField
                label="Number of item(s)"
                name="quantity"
                placeholder="give a description"
              />
              <TextField
                label="Amount"
                name="amount"
                placeholder="give a description"
              />
              <TextField
                label="Delivery timeline"
                name="timeline"
                placeholder="Select number of days"
              />
            </div>
            <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
              VENDOR ACCOUNT INFORMATION
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <TextField
                label="Bank Name"
                name="bank_name"
                placeholder="Access Bank"
              />
              <TextField
                label="Enter Account number"
                name="account_number"
                placeholder="1234567890"
              />
              <TextField
                label="Account Name"
                name="account_name"
                placeholder="e.g JMusty Feet"
              />
              <TextField
                label="Email"
                name="email"
                placeholder="e.g JMustyfeet@gmail.com"
              />
              <TextField
                label="Phone number"
                name="phone_number"
                placeholder="090123456789"
                value={value}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6 mb-16">
              <Button
                disabled={value ? false : true}
                fullWidth
                onClick={() => setIsVerify(false)}
              >
                Share escrow link
              </Button>
            </div>
          </div>
        </div>
      )} */}
      <Dialog.Root open={isVerify}>
        <Dialog.Portal className="">
          <Dialog.Overlay
            onClick={() => setIsVerify(false)}
            className="bg-[#3a3a3a]/50 z-50   fixed inset-0"
          />

          <Dialog.Content>
            {/* <div className="  w-[393px] h-screen z-50 fixed animate-fade-left animate-duration-300 top-0 right-0 animate-ease-out bg-white pl-[16px] pr-[34px] overflow-y-scroll "> */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[400px] h-screen z-50 fixed top-0 right-0 animate-fade-left animate-duration-300 animate-ease-out bg-white pl-[16px] overflow-y-scroll pr-[34px] "
            >
              {/* {(createEscrowIsLoading || lockFundsLoading) && (
                <LoadingOverlay />
              )} */}

              <div className="flex gap-4 items-center mt-10 mb-4">
                <img src={back} alt="back" onClick={() => setIsVerify(false)} />
                <h6 className="text-[23px] font-medium">
                  Create MyBalance Link
                </h6>
              </div>
              <p className="text-[16px] text-[#303030] font-normal mb-8">
                Create your MyBalance escrow information and share with
                everyone.
              </p>
              <h1 className="text-[#EDEDED] text-lg font-medium">
                ITEM(S) INFORMATION
              </h1>
              <div className="mt-6 flex flex-col gap-4">
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"purpose"}
                  label="Purpose of creating  escrow"
                  placeholder="e.g 20,000"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"itemType"}
                  label="Type of item(s)"
                  placeholder="****"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"itemQuantity"}
                  label="Number of item(s)"
                  placeholder="give a description"
                  type="number"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"amount"}
                  label="Amount"
                  placeholder="give a description"
                  type="number"
                />
                <TextField
                  control={control}
                  rules={{ required: "this field is required" }}
                  name={"deliveryDate"}
                  label="Delivery timeline"
                  placeholder="Select number of days"
                  type="date"
                />
              </div>
              <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
                VENDOR ACCOUNT INFORMATION
              </h1>
              <div className="mt-6 flex flex-col gap-4">
                <div className="w-full mb-3 ">
                  <label htmlFor={"selectBank"} className="block">
                    select bank
                  </label>
                  <select
                    className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
                    // value={code}
                    // onChange={(e) => {
                    //   setCode(e.target.value);
                    // }}
                  >
                    {banks?.data?.map((bank: any) => (
                      <option key={bank.slug} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                    {bankIsLoading && <option value="">loading...</option>}
                  </select>
                </div>
                <TextField
                  control={control}
                  label="Enter Account number"
                  placeholder="1234567890"
                  name={"accountNumber"}
                  // onChange={(e) => {
                  //   setAccNum(e.target.value);
                  // }}
                  // value={accNum}
                />
                <div className="relative">
                  {/* {LookupIsLoading && <LoadingOverlay />} */}
                  <TextField
                    readOnly={true}
                    control={control}
                    name={"accountName"}
                    label="Account Name"
                    // value={LookupData?.data.accountName}
                    placeholder="e.g JMusty Feet"
                  />
                </div>
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
                  label="Email Address"
                  placeholder="e.g JMustyfeet@gmail.com"
                />
              </div>
              <div className="mt-6 mb-16">
                <Button
                  // disabled={createEscrowIsLoading || lockFundsLoading}
                  fullWidth
                  // onClick={() => {
                  //   setIsVerify(false);

                  //   // setOpen(true);
                  // }}
                  type="submit"
                >
                  pay now
                </Button>
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
