import { useState, useEffect } from "react";

import { Button } from "../../../components/reuseable/Button";
import Header from "../../../components/reuseable/Header";
import TextField from "../../../components/reuseable/TextField1";
import * as Tabs from "@radix-ui/react-tabs";
import check from "../../../assets/Icons/check.svg";
import * as Dialog from "@radix-ui/react-dialog";

import LockMoneyBox from "../../../components/reuseable/LockMoneyBox";
import UnlockAmount from "../../../components/buyers/UnlockAmount";
import { useDepositMoney, useEndTourGuide } from "../../../hooks/mutations";
import { useForm } from "react-hook-form";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { useLockedFunds, useUser } from "../../../hooks/queries";
import useStore, { useTabStore } from "../../../store";
import WithdrawMoney from "../../../components/buyers/quickActions/WithdrawMoney";
import { useNavigate } from "react-router-dom";
import EmptyMoney from "../../../components/reuseable/EmptyMoney";
import Skeleton from "react-loading-skeleton";
import formatToNairaCurrency from "../../../util/formatNumber";
import Pagination from "../../../components/reuseable/Pagination";
import { Link } from "react-router-dom";
import Joyride from "react-joyride";
import { useQueryClient } from "@tanstack/react-query";

const QuickAction = () => {
  const [tourFinished, setTourFinished] = useState(false); // State to track whether the tour guide has finished
  const { mutate } = useEndTourGuide();
  const store = useStore();
  const [cancleTour, setCancleTour] = useState(false);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const queryClient = useQueryClient(); //To refresh the user data

  const [successModal, setSuccessModal] = useState(false);

  //lock

  const [unlock, setUnlock] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
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

  const endTourGuide = async () => {
    mutate({ email: user?.email });
    setCancleTour(true);
  };

  // Tour Guide
  const [{ run, steps }, setState] = useState({
    run: user?.showTourGuide,
    steps: [
      {
        content: (
          <strong>
            You can either deposit, lock, unlock and/or withdraw your money here
          </strong>
        ),
        placement: "right" as "right",
        target: ".quick-action",
        title: "Quick Action",
      },
      {
        content: "Top up your wallet from your local bank securely.",
        placement: "bottom" as "bottom",
        target: ".deposit",
        title: "Deposit",
      },
      {
        content:
          "Use this feature to unlock funds, ensuring a seamless and trustworthy experience.",
        placement: "bottom" as "bottom",
        target: ".unlock",
        title: "Unlock Money",
      },
      {
        content: "Transfer funds from wallet to your local bank account.",
        placement: "bottom" as "bottom",
        target: ".withdraw",
        title: "Withdraw Money",
      },
    ],
  });
  useEffect(() => {
    // Check if the tour guide has finished targeting all the classes
    if (tourFinished) {
      // Navigate to the Quick Action page only if cancletour is false
      if (!cancleTour) {
        navigate("/buyer/transaction-history");
      }

      // Set run to false when the tour finishes
      setState((prevState) => ({
        ...prevState,
        run: false,
      }));
    }
  }, [cancleTour, tourFinished, navigate]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
      refetchType: "all", // refetch both active and inactive queries
    });
  }, [store.endTour]);

  //
  return (
    <>
      <Joyride
        continuous
        run={run}
        steps={steps}
        // hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        locale={{
          skip: (
            <button
              onClick={() => {
                endTourGuide();
                store.setEndTour(true);
              }}
            >
              <strong>Cancel Tour</strong>
            </button>
          ),
          last: "Next",
        }}
        callback={({ action }) => {
          if (action === "reset") {
            setTourFinished(true);
          }
        }}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            textDecoration: "underline",
            fontWeight: 600,
          },
          buttonBack: {
            marginRight: 10,
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            textDecoration: "underline",
            fontWeight: 600,
          },
          buttonSkip: {
            color: "#DA1E28",
          },
          spotlight: {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
      />
      <Header
        Heading="Quick Actions"
        Text="You can either deposit, lock, unlock and/or withdraw your money here."
      />
      <Tabs.Root defaultValue={defaultTab}>
        <Tabs.List
          className="flex mb-0 list-none no-scrollbar whitespace-nowrap overflow-x-auto pt-3 pb-4 flex-row"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="tab deposit"
            value="depositMoney"
            onSelect={() =>
              setState((prevState) => ({ ...prevState, run: false }))
            } // Add this line
          >
            Deposit money
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tab unlock"
            value="unlockMoney"
            onSelect={() =>
              setState((prevState) => ({ ...prevState, run: false }))
            } // Add this line
          >
            Unlock money
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tab withdraw"
            value="withdrawMoney"
            onSelect={() =>
              setState((prevState) => ({ ...prevState, run: false }))
            } // Add this line
          >
            Withdraw money
          </Tabs.Trigger>
        </Tabs.List>

        <div className="mt-5 md:mt-10 ">
          <Tabs.Content className="w-full max-w-[350px]" value="depositMoney">
            <div className="relative">
              {depositLoading && <LoadingOverlay />}

              <form
                onSubmit={handleSubmitDeposit((data) => {
                  setAlertModal(true);
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
                <Dialog.Root open={alertModal}>
                  <Dialog.Portal>
                    <Dialog.Overlay className="bg-[#3a3a3a]/50  backdrop-blur-md fixed inset-0 z-50" />
                    <Dialog.Content className="animate-fade-up sm:animate-jump  animate-duration-75  fixed  top-0 left-0 z-50 w-full h-full">
                      <div className="sm:max-w-[400px] w-full py-6 px-6 min-h-[246px] rounded absolute bg-white  bottom-0 sm:bottom-auto sm:top-[50%] sm:left-[50%] sm:-translate-y-1/2 sm:-translate-x-1/2 ">
                        <h2 className="text-lg font-medium mb-2">
                          Dear Valued Buyer,
                        </h2>
                        <h3>
                          When depositing funds using <em>bank transfer</em> ,
                          note that our third-party platform displays
                          "MyBalance," while your bank app shows "Orange Invent
                          House Limited"—both represent the same entity.
                          <p className="my-2">
                            For concerns, contact{" "}
                            <Link to="/contact" className="text-primary-normal">
                              customer support.
                            </Link>
                          </p>
                          <p className="mb-2">
                            Thank you for your understanding and trust.
                          </p>
                        </h3>
                        <Button
                          type="submit"
                          onClick={handleSubmitDeposit((data) => {
                            depositMutate(data.amount);
                            setAlertModal(false);
                          })}
                        >
                          continue
                        </Button>
                        {/* <Dialog.Close asChild>
                          <button className="IconButton" aria-label="Close">
                            dcsd
                          </button>
                        </Dialog.Close> */}
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </form>
            </div>
          </Tabs.Content>
          <Tabs.Content className="w-full max-w-[449px] " value="unlockMoney">
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
