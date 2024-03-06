import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/reuseable/Header";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useTransactions } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import Pagination from "../../../components/reuseable/Pagination";
import Joyride from "react-joyride";

const TransactionHistory = () => {
  const [tourFinished, setTourFinished] = useState(false); // State to track whether the tour guide has finished
  const navigate = useNavigate(); // Initialize the navigate function from the useNavigate hook
  const [page, setPage] = useState<number>(1);
  const [activeButton, setActiveButton] = useState("");

  const { isLoading, data } = useTransactions({
    page,
    size: 10,
    type: activeButton,
  });

  useEffect(() => {
    setPage(1);
  }, [activeButton]);

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };
  //
  useEffect(() => {
    // Set run to true to start the tour guide when the component mounts
    setState((prevState) => ({
      ...prevState,
      run: true,
    }));
  }, []);
  // Tour Guide
  const [{ run, steps }, setState] = useState({
    run: true,
    steps: [
      {
        content:
          "You can view an endless list of transaction you have transacted over time.",
        placement: "right" as "right",
        target: ".transaction-history",
        title: "Transaction History",
      },

      {
        content: "See a comprehensive list of all your account activities.",
        placement: "bottom" as "bottom",
        target: ".all-transaction",
        title: "All Transactions",
      },
      {
        content: "Track money added to your account.",
        placement: "bottom" as "bottom",
        target: ".deposit",
        title: "Deposit",
      },
      {
        content: "Monitor transactions currently in progress.",
        placement: "bottom" as "bottom",
        target: ".escrow",
        title: "Escrow",
      },
      {
        content: "Keep tabs on funds leaving your wallet.",
        placement: "bottom" as "bottom",
        target: ".withdraw",
        title: "Withdraw Money",
      },
    ],
  });

  useEffect(() => {
    if (tourFinished) {
      setState((prevState) => ({
        ...prevState,
        run: false,
      }));
      navigate("/buyer/dispute-resolution");
    }
  }, [tourFinished, navigate]);
  //
  return (
    <div>
      <Joyride
        continuous
        // callback={() => {}}
        run={run}
        steps={steps}
        // hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        locale={{
          skip: <strong>Cancel Tour</strong>,
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
        }}
      />
      <Header
        Heading="Transaction History"
        Text="You can view an endless list of transaction you have transacted over time."
      />
      <div className="px-2 md:px-6 py-3 md:py-10  rounded-lg border border-[#B7B7B7] max-w-[724px] w-full">
        <div className="relative w-full max-w-[676px]">
          <div className="flex mb-0 list-none no-scrollbar whitespace-nowrap overflow-x-auto  pt-1 md:pt-3 pb-2 md:pb-4 flex-row">
            <button
              className="tab all-transaction"
              data-state={activeButton === "" ? "active" : "inactive"}
              onClick={() => setActiveButton("")}
            >
              All Transaction
            </button>
            <button
              className="tab deposit"
              data-state={activeButton === "DEPOSIT" ? "active" : "inactive"}
              onClick={() => setActiveButton("DEPOSIT")}
            >
              Deposits
            </button>
            <button
              className="tab escrow"
              data-state={activeButton === "ESCROW" ? "active" : "inactive"}
              onClick={() => setActiveButton("ESCROW")}
            >
              Escrows
            </button>
            <button
              className="tab withdraw"
              data-state={activeButton === "WITHDRAW" ? "active" : "inactive"}
              onClick={() => setActiveButton("WITHDRAW")}
            >
              Withdrawals
            </button>
          </div>
          {isLoading && (
            <div className="flex flex-col gap-2 md:gap-3 w-full max-w-[676px]">
              <Skeleton className="w-full h-[100px] " />
              <Skeleton className="w-full h-[100px] " />
              <Skeleton className="w-full h-[100px] " />
              <Skeleton className="w-full h-[100px] " />
              <Skeleton className="w-full h-[100px] " />
              <Skeleton className="w-full h-[100px] " />
            </div>
          )}

          {data?.data?.map((transaction: any) => (
            <DashboardHistoryBox key={transaction.id} {...transaction} />
          ))}
          {data?.data.length === 0 && <EmptyTrans />}
        </div>
        {!isLoading && data?.data.length > 0 && (
          <Pagination
            initialPage={data?.meta?.currentPage}
            onPageChange={handlePageChange}
            pageCount={data?.meta?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
