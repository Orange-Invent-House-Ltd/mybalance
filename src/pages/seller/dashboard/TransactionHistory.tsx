import Header from "../../../components/reuseable/Header";
import DashboardHistoryBox from "../../../components/reuseable/DashboardHistoryBox";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import { useTransactions } from "../../../hooks/queries";
import formatToNairaCurrency from "../../../util/formatNumber";

const TransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [openTab, setOpenTab] = useState(1);
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
        {/* tabs Starts*/}
        <div className="w-full">
          <ul
            className="flex mb-0 text-sm list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {/* All transactions tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "lg:text-lg font-medium capitalize py-3 block border-b-[2.5px] leading-normal " +
                  (openTab === 1
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                to="#link1"
                role="tablist"
              >
                All transactions
              </Link>
            </li>
            {/* Deposits tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "lg:text-lg font-medium capitalize py-3 border-b-[2.5px] block leading-normal " +
                  (openTab === 2
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                to="#link2"
                role="tablist"
              >
                Deposits
              </Link>
            </li>
            {/* Escrows tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "lg:text-lg font-medium capitalize py-3 border-b-[2.5px] block leading-normal " +
                  (openTab === 3
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                to="#link3"
                role="tablist"
              >
                Escrows
              </Link>
            </li>
            {/* Withdrawals tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "lg:text-lg font-medium capitalize py-3 border-b-[2.5px] block leading-normal " +
                  (openTab === 4
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                to="#link4"
                role="tablist"
              >
                Withdrawals
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className=" py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* All transactions Contents */}
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {data?.data?.map((transaction: any) => (
                    <DashboardHistoryBox {...transaction} />
                  ))}
                  {data?.data.length === 0 && <EmptyTrans />}      
                </div>
                {/* Deposits Contents */}
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  Deposits Contents
                </div>
                {/* Escrows Contents */}
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  Escrows Contents
                </div>
                {/* Withdrawals Contents */}
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  Withdrawals Contents
                </div>
              </div>
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
  );
};

export default TransactionHistory;
