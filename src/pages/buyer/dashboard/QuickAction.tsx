import { useState } from "react";
import { Button } from "../../../components/reuseable/Button";
import Header from "../../../components/reuseable/Header";
import TextField from "../../../components/reuseable/TextField1";
import * as Tabs from "@radix-ui/react-tabs";
import check from "../../../assets/Icons/check.svg";

import LockMoneyBox from "../../../components/reuseable/LockMoneyBox";
import UnlockAmount from "../../../components/buyers/UnlockAmount";
import { useDepositMoney } from "../../../hooks/mutations";
import { useForm } from "react-hook-form";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { useLockedFunds } from "../../../hooks/queries";
import { useTabStore } from "../../../store";
import WithdrawMoney from "../../../components/buyers/quickActions/WithdrawMoney";
import { useNavigate } from "react-router-dom";
import EmptyMoney from "../../../components/reuseable/EmptyMoney";
import Skeleton from "react-loading-skeleton";
import formatToNairaCurrency from "../../../util/formatNumber";
import Pagination from "../../../components/reuseable/Pagination";

const QuickAction = () => {
  const navigate = useNavigate();

  const [successModal, setSuccessModal] = useState(false);

  //lock

  const [unlock, setUnlock] = useState(false);
  //

  const { handleSubmit: handleSubmitDeposit, control: controlDeposit } =
    useForm();

  const { mutate: depositMutate, isLoading: depositLoading } =
    useDepositMoney();

  const { defaultTab } = useTabStore();
  const [page, setPage] = useState<number>(1);

  const { data: lockedFunds, isLoading: lockedFundsLoading } =
    useLockedFunds(page);

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };
  let data = localStorage.getItem("transactionInfo") as any;
  data = JSON.parse(data);

  return (
    <>
      <Header
        Heading="Quick Actions"
        Text="You can either deposit, lock, unlock and/or withdraw your money here."
      />
      <Tabs.Root defaultValue={defaultTab}>
        <Tabs.List
          className="flex mb-0 list-none no-scrollbar whitespace-nowrap overflow-x-auto pt-3 pb-4 flex-row"
          aria-label="Manage your account"
        >
          <Tabs.Trigger className="tab deposit" value="depositMoney">
            Deposit money
          </Tabs.Trigger>
          <Tabs.Trigger className="tab" value="unlockMoney">
            unlock money
          </Tabs.Trigger>
          <Tabs.Trigger className="tab" value="withdrawMoney">
            withdraw money
          </Tabs.Trigger>
        </Tabs.List>

        <div className="mt-5 md:mt-10 ">
          <Tabs.Content className="w-full max-w-[350px]" value="depositMoney">
            <div className="relative">
              {depositLoading && <LoadingOverlay />}

              <form
                onSubmit={handleSubmitDeposit((data) => {
                  depositMutate(data.amount);
                })}
                className="mb-4 flex flex-col gap-4 "
              >
                <TextField
                  control={controlDeposit}
                  placeholder="10000"
                  label="Enter amount to deposit"
                  name="amount"
                  rules={{
                    required: "this field is required",
                  }}
                  type="number"
                  min={1}
                  pattern="[0-9]*"
                />
                <Button>Continue</Button>
              </form>
            </div>
          </Tabs.Content>
          <Tabs.Content className="w-full max-w-[449px]" value="unlockMoney">
            <p className=" text-base font-normal">
              Click on the card with the information of the item you want to
              unlock and click on the unlock button. That’s it.
            </p>
            <div className=" ">
              {lockedFunds?.data?.map((data: any) => (
                <div
                  onClick={() => {
                    setUnlock(true);

                    localStorage.setItem(
                      "transactionInfo",
                      JSON.stringify(data)
                    );
                  }}
                  key={data.id}
                >
                  <LockMoneyBox
                    date={new Date(data.createdAt).toLocaleString()}
                    heading={data.meta.title}
                    text={data.meta.description}
                  />
                </div>
              ))}
              {lockedFunds?.data.length === 0 && <EmptyMoney />}

              {unlock && (
                <UnlockAmount
                  setSuccessModal={setSuccessModal}
                  setUnlock={setUnlock}
                  unlock={unlock}
                />
              )}
              {lockedFundsLoading && (
                <div className="flex flex-col gap-2 md:gap-3 w-full max-w-[676px]">
                  <Skeleton className="w-full h-[100px] " />
                  <Skeleton className="w-full h-[100px] " />
                  <Skeleton className="w-full h-[100px] " />
                  <Skeleton className="w-full h-[100px] " />
                  <Skeleton className="w-full h-[100px] " />
                </div>
              )}

              {!lockedFundsLoading && lockedFunds?.data.length > 0 && (
                <Pagination
                  initialPage={lockedFunds?.meta?.currentPage}
                  onPageChange={handlePageChange}
                  pageCount={lockedFunds?.meta?.totalPages}
                />
              )}
            </div>
            {successModal && (
              <div className=" fixed  top-0 left-0 right-0 bottom-0 bg-black-rgba flex items-center justify-center z-50  ">
                <div className="w-full max-w-[400px] mx-2 md:mx-0  animate-jump bg-white p-[20px] rounded-[5px] flex flex-col ">
                  <div className="flex items-center w-fit rounded-full bg-[#ECFDF3] justify-center">
                    <img className="   " src={check} alt="check" />
                  </div>

                  <h6 className="font-semibold text-lg">
                    New Amount Unlocked! 👍🏾
                  </h6>
                  <p className="mt-2   text-base font-normal leading-[21.6px]">
                    Weldone! You have successfully unlocked{" "}
                    <strong>
                      {formatToNairaCurrency(
                        data?.lockedAmount?.amount || data?.amount
                      )}
                    </strong>
                    . It will reflect as <strong>Fulfilled</strong> in your
                    transaction history and escrow.
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
          </Tabs.Content>
          <WithdrawMoney />
        </div>
      </Tabs.Root>
    </>
  );
};

export default QuickAction;
