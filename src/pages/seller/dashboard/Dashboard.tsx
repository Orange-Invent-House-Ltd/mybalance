import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/reuseable/Button";
import SellerHeader from "../../../components/sellers/SellerHeader";
import SellerDashboardBox from "../../../components/reuseable/SellerDashboardBox";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useTransactions, useUser, useWallets } from "../../../hooks/queries";

import {
  formatToDollarCurrency,
  formatToNairaCurrency,
} from "../../../util/formatNumber";

import { useEffect, useState } from "react";
import Withdraw from "../../../components/sellers/Withdraw";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import Skeleton from "react-loading-skeleton";
import ReactJoyride from "react-joyride";
import { useQueryClient } from "@tanstack/react-query";
import useStore from "../../../store";
import { useEndTourGuide } from "../../../hooks/mutations";

const Dashboard = () => {
  const { data: user, isError } = useUser();
  const { data: wallets, isLoading: loadWallets } = useWallets();
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [tourFinished, setTourFinished] = useState(false); // State to track whether the tour guide has finished
  const { mutate } = useEndTourGuide();
  const [cancleTour, setCancleTour] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function from the useNavigate hook
  const store = useStore();
  const queryClient = useQueryClient(); //To refresh the user data
  const { isLoading, data: transactionData } = useTransactions({
    page: 1,

    size: 2,
  });
  const endTourGuide = async () => {
    mutate({ email: user?.email });
    setCancleTour(true);
  };
  const [{ run, steps }, setState] = useState({
    run: user?.showTourGuide && !store.endTour,
    steps: [
      {
        content: <strong>Let's go for a ride!</strong>,
        placement: "center" as "center",
        target: ".start-tour",
      },
      {
        content:
          "Your dashboard provides a snapshot of your account status and activities.",
        placement: "right" as "right",
        target: ".dashboard",
        title: "Dashboard",
      },
      {
        content:
          "Find your name and check the time of your last login and the date for your account activity. Get to enjoy 10 free escrow also.",
        placement: "bottom" as "bottom",
        target: ".find-name",
      },
      {
        content:
          "Find your available escrow balance, total amount in escrow and charges rate below.",
        placement: "bottom" as "bottom",
        target: ".balance",
      },
      {
        content: "Transfer funds from wallet to your local bank account.",
        placement: "bottom" as "bottom",
        target: ".withdraw",
        title: "Withdraw Money",
      },
      {
        content: "See a comprehensive list of all your account activities.",
        placement: "bottom" as "bottom",
        target: ".transaction",
        title: "Transaction History",
      },
    ],
  });
  useEffect(() => {
    // Check if the tour guide has finished targeting all the classes
    if (tourFinished) {
      //Navigate to the Quick Action page only if cancletour is false
      if (!cancleTour) {
        navigate("/seller/transaction-history");
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
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
      refetchType: "all", // refetch both active and inactive queries
    });
  }, [user]);

  return (
    <div className="overflow-hidden">
      <ReactJoyride
        continuous
        callback={({ action }) => {
          if (action === "reset") {
            setTourFinished(true);
          }
        }}
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
        }}
      />

      <div className="pb-16 start-tour">
        <Withdraw open={withdrawModal} setOpen={setWithdrawModal} />
        <SellerHeader />
        {user?.kyc === null && (
          <div className="flex flex-col gap-2 justify-start items-start max-w-[752px] mt-8 px-4 py-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="w-[285px] text-amber-800 text-sm font-bold">
              ATTENTION:
            </p>
            <div className="w-full border-t border-orange-300" />
            <p className="max-w-[650px] text-amber-700 text-[13px] font-normal">
              Please note that your KYC (Know Your Customer) verification is
              pending. Completing your KYC is essential for a smooth fund
              withdrawal process. Take a moment to complete your KYC to avoid
              any delays.
            </p>
            <Link to="/kyc">
              <button className="px-10 py-2 bg-orange-500 rounded-[40px] text-white text-sm font-bold">
                Complete KYC now
              </button>
            </Link>
          </div>
        )}
        {loadWallets ? (
          // Show a loading indicator
          <div></div>
        ) : (
          <div className="flex  gap-2 mt-16 max-w-full overflow-x-auto no-scrollbar md:overflow-hidden">
            <SellerDashboardBox
              Text="Total amount withdrawn"
              // Amount={formatToNairaCurrency(user?.withdrawnAmount || 0)}
              AmountInDollars={formatToDollarCurrency(
                wallets[0]?.withdrawnAmount || 0
              )}
              AmountInNaira={formatToNairaCurrency(
                wallets[1]?.withdrawnAmount || 0
              )}
              loadWallets={loadWallets}
            />
            <SellerDashboardBox
              Text="Total amount in escrow"
              AmountInDollars={formatToDollarCurrency(
                wallets[0]?.lockedAmountInward || 0
              )}
              AmountInNaira={formatToNairaCurrency(
                wallets[1]?.lockedAmountInward || 0
              )}
              loadWallets={loadWallets}
            />
            <SellerDashboardBox
              Text="Available balance in wallet"
              AmountInDollars={formatToDollarCurrency(wallets[0]?.balance || 0)}
              AmountInNaira={formatToNairaCurrency(wallets[1]?.balance || 0)}
              loadWallets={loadWallets}
            />
          </div>
        )}
        <div className="md:flex justify-between w-full">
          <div>
            <div className="flex flex-col items-center md:flex-row justify-center gap-4 md:gap-8 mt-8 w-full max-w-[710px]">
              <button
                onClick={() => {
                  setWithdrawModal(true);
                }}
                className="bg-[#9A4D0C] capitalize w-[332px] md:w-[220px] text-white rounded-[30px] px-[16px] py-[12px] withdraw"
              >
                withdraw funds
              </button>
              <Link to="/seller/transaction-history">
                <button className="border border-[#9A4D0C] w-[332px] md:w-[220px]  text-[#9A4D0C] rounded-[30px] px-[16px] py-[12px] transaction">
                  Transaction History
                </button>
              </Link>
            </div>

            <h6 className="h6 mt-16">Transaction history</h6>
            {isLoading && (
              <div className="flex flex-col gap-3 w-full max-w-[676px]">
                <Skeleton className="w-full h-[100px] " />
                <Skeleton className="w-full h-[100px] " />
              </div>
            )}
            {transactionData?.data?.map((transaction: any) => (
              <div key={transaction?.id} className="max-w-[676px] w-full">
                <DashboardHistoryBox {...transaction} />
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col gap-3 w-full max-w-[676px]">
                <Skeleton className="w-full h-[100px] " />
                <Skeleton className="w-full h-[100px] " />
              </div>
            )}
            <div className="max-w-[343px]">
              <Link to="/seller/transaction-history">
                <Button fullWidth variant="outlined">
                  View all transactions
                </Button>
              </Link>
            </div>
            {transactionData?.data?.length === 0 && <EmptyTrans />}
          </div>
          <div>
            {/* Right side box - Charges box */}
            <div
              style={{
                boxShadow: " 0px 9px 100px 0px rgba(60, 60, 60, 0.25)",
              }}
              className="border border-#B7B7B7 w-full md:max-w-[297px] rounded-[10px] mt-10 md:mt-16 px-4 py-6"
            >
              <h6 className="text-2xl font-bold  text-[#6D6D6D] ">
                Our charges
              </h6>
              <p className="text-sm mt-2 text-[#6D6D6D]">
                We offer very user friendly charges which are range-based. The
                higher the transaction, the lower the charge percentage.
              </p>
              <div className="flex justify-between mt-8 text-[14px]">
                <div className="flex flex-col gap-5">
                  <p className="text-[#6D6D6D] text-[16px] font-semibold">
                    Range
                  </p>
                  <p>Below N100,000</p>
                  <p>N100,000 - N500,000</p>
                  <p>Above N500,000</p>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-[#6D6D6D] text-[16px] font-semibold">
                    Charges
                  </p>
                  <p>1.5% per party</p>
                  <p>1% per party</p>
                  <p>0.8% per party</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
