import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/reuseable/Header";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useTransactions } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
const TransactionHistory = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useTransactions({ search: "", page, size: 10 });
  console.log(
    "🚀 ~ file: TransactionHistory.tsx:11 ~ TransactionHistory ~ data:",
    data
  );
  const handlePageChange = useCallback(({ selected }: any) => {
    setPage(selected + 1); // Pages usually start from 1, not 0
  }, []);
  return (
    <div>
      <Header
        Heading="Transaction History"
        Text="You can view an endless list of transaction you have transacted over time."
      />
      <div className="relative max-w-[676px]">
        {isLoading && (
          <div className="flex flex-col gap-3">
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
          </div>
        )}
        {data?.data?.results?.map(
          ({ amount, status, createdAt, meta, id }: any) => (
            <DashboardHistoryBox
              key={id}
              header={meta.title}
              text={meta.description}
              status={status}
              price={formatToNairaCurrency(amount)}
              subtext={new Date(createdAt).toLocaleString()}
            />
          )
        )}
        {data?.data.results.length === 0 && (
          <div className="h-[500px] w-full max-w-[600px] flex items-center justify-center capitalize font-bold text-gray-600 text-2xl">
            no transaction history
          </div>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        initialPage={page}
        onPageChange={handlePageChange} // Use the handlePageChange function
        pageRangeDisplayed={5}
        pageCount={data?.data?.count}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="border border-[#6D6D6D] p-2 py-1 rounded "
        containerClassName="flex gap-3 ml-10 items-center "
        // Adjust for 0-based page numbering
        activeClassName="bg-[#FD7E14] text-white"
      />
    </div>
  );
};

export default TransactionHistory;
