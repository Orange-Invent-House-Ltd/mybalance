import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/reuseable/Header";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useTransactions } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import Pagination from "../../../components/reuseable/Pagination";

const TransactionHistory = () => {
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
  return (
    <div>
      <Header
        Heading="Transaction History"
        Text="You can view an endless list of transaction you have transacted over time."
      />
      <div className="px-2 md:px-6 py-3 md:py-10  rounded-lg border border-[#B7B7B7] max-w-[724px] w-full">
        <div className="relative w-full max-w-[676px]">
          <div className="flex mb-0 list-none no-scrollbar whitespace-nowrap overflow-x-auto  pt-1 md:pt-3 pb-2 md:pb-4 flex-row">
            <button
              className="tab "
              data-state={activeButton === "" ? "active" : "inactive"}
              onClick={() => setActiveButton("")}
            >
              All Transaction
            </button>
            <button
              className="tab "
              data-state={activeButton === "DEPOSIT" ? "active" : "inactive"}
              onClick={() => setActiveButton("DEPOSIT")}
            >
              Deposits
            </button>
            <button
              className="tab "
              data-state={activeButton === "ESCROW" ? "active" : "inactive"}
              onClick={() => setActiveButton("ESCROW")}
            >
              Escrows
            </button>
            <button
              className="tab"
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
