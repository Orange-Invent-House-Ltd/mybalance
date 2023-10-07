import Header from "../../../components/reuseable/Header";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import { useTransactions } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";

const TransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [activeButton, setActiveButton] = useState("");
  const { isLoading, data } = useTransactions({
    page,
    size: 10,
    type: activeButton,
  });

  const handlePageChange = useCallback(({ selected }: any) => {
    setPage(selected + 1);
  }, []);
  useEffect(() => {
    setPage(1);
  }, [activeButton]);
  return (
    <div>
      <Header
        Heading="Transaction History"
        Text="You can view an endless list of transaction you have transacted over time."
      />
      <div className="px-6 py-10  rounded-lg border border-[#B7B7B7] max-w-[724px] w-full">
        <div className="w-full relative">
          <div className="flex mb-0  no-scrollbar whitespace-nowrap overflow-x-auto pt-3 pb-4 flex-row">
            <button
              className="tab"
              data-state={activeButton === "" ? "active" : "inactive"}
              onClick={() => setActiveButton("")}
            >
              All Transaction
            </button>
            <button
              className="tab"
              data-state={activeButton === "ESCROW" ? "active" : "inactive"}
              onClick={() => setActiveButton("ESCROW")}
            >
              Escrow
            </button>
            <button
              className="tab"
              data-state={activeButton === "WITHDRAW" ? "active" : "inactive"}
              onClick={() => setActiveButton("WITHDRAW")}
            >
              Withdrawals
            </button>
          </div>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className=" py-5 flex-auto">
              <div className="tab-content tab-space">
                {data?.data?.map((transaction: any) => (
                  <DashboardHistoryBox key={transaction.id} {...transaction} />
                ))}
                {data?.data.length === 0 && <EmptyTrans />}
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
              </div>
            </div>
          </div>
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          initialPage={data?.meta?.currentPage - 1 || 0}
          onPageChange={handlePageChange} // Use the handlePageChange function
          pageRangeDisplayed={5}
          pageCount={data?.meta?.totalPages}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          pageClassName="border border-[#6D6D6D] p-2 py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer "
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
