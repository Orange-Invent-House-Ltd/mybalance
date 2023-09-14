import { useCallback, useState } from "react";
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
  const { isLoading, data } = useTransactions({
    page,
    size: 10,
  });

  const handlePageChange = useCallback(({ selected }: any) => {
    setPage(selected + 1);
  }, []);
  return (
    <div>
      <Header
        Heading="Transaction History"
        Text="You can view an endless list of transaction you have transacted over time."
      />
      <div>
        {/* <div className="w-full mb-3 ">
          <label
            htmlFor={"selectBank"}
            className="text-sm mb-[6px] capitalize block"
          >
            filter transactions
          </label>
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#B7B7B7] "
          >
            <option value="DEPOSIT">Deposit</option>
            <option value="WITHDRAW">Withdraw</option>
            <option value="ESCROW">Escrow</option>
          </select>
        </div> */}
      </div>
      <div className="relative max-w-[676px]">
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
        {data?.data?.map(({ amount, status, createdAt, meta, id }: any) => (
          <DashboardHistoryBox
            key={id}
            header={meta.title}
            text={meta.description}
            status={status}
            price={formatToNairaCurrency(amount)}
            subtext={new Date(createdAt).toLocaleString()}
          />
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
        pageClassName="border border-[#6D6D6D] flex item-center justify-center h-[30px] w-[30px] py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer "
        previousClassName="border border-[#6D6D6D] p-2 py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer"
        nextClassName="border border-[#6D6D6D] p-2 py-1 rounded transition-colors duration-300 hover:bg-[#FD7E14] hover:text-white hover:border-[#FD7E14] cursor-pointer"
        containerClassName="flex gap-3 ml-10 items-center "
        // Adjust for 0-based page numbering
        activeClassName="bg-[#FD7E14] text-white"
        breakClassName="page-item"
      />
    </div>
  );
};

export default TransactionHistory;
