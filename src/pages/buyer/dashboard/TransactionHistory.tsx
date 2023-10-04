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

  const handlePageChange = useCallback(({ selected }: any) => {
    setPage(selected + 1);
  }, []);
  return (
    <div>
      <Header
        Heading="Transaction History"
        Text="You can view an endless list of transaction you have transacted over time."
      />
      <div className="px-6 py-10  rounded-lg border border-[#B7B7B7] max-w-[724px] w-full">
        <div className="relative max-w-[676px]">
          <div className="flex mb-0 list-none whitespace-nowrap overflow-x-auto pt-3 pb-4 flex-row">
            <button
              className="tab"
              data-state={activeButton === "" ? "active" : "inactive"}
              onClick={() => setActiveButton("")}
            >
              All Transaction
            </button>
            <button
              className="tab"
              data-state={activeButton === "DEPOSIT" ? "active" : "inactive"}
              onClick={() => setActiveButton("DEPOSIT")}
            >
              Deposits
            </button>
            <button
              className="tab"
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
            <div className="flex flex-col gap-3 w-full max-w-[676px]">
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
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          // initialPage={data?.meta?.currentPage - 1}
          initialPage={data?.meta?.currentPage - 1 || 0}
          onPageChange={handlePageChange} // Use the handlePageChange function
          pageRangeDisplayed={5}
          pageCount={data?.meta?.totalPages}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          pageClassName="border border-[#6D6D6D] flex item-center justify-center h-[30px] w-[30px] py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer"
          previousClassName="border border-[#6D6D6D] p-2 py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer"
          nextClassName="border border-[#6D6D6D] p-2 py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer"
          containerClassName="flex gap-3 ml-10 items-center "
          // Adjust for 0-based page numbering
          activeClassName="bg-[#FD7E14] text-white"
          breakClassName="page-item"
        />
      </div>
    </div>
  );
};

export default TransactionHistory;
