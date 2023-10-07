import React, { useCallback, useState } from "react";
import DisputeCard from "../../../components/buyers/disputeResolution/DisputeCard";
import { Button } from "../../../components/reuseable/Button";
import { useNavigate } from "react-router-dom";
import { useDisputes } from "../../../hooks/queries";
import Skeleton from "react-loading-skeleton";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import ReactPaginate from "react-paginate";

const DisputeResolution = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDisputes();
  const [page, setPage] = useState<number>(1);

  const handlePageChange = useCallback(({ selected }: any) => {
    setPage(selected + 1);
  }, []);

  return (
    <div>
      <header className="mb-10 md:mb-16">
        <h1 className="text-[23px] capitalize font-medium ">
          Dispute resolution
        </h1>
        <p className="text-[#303030] text-sm mt-2 md:mt-4">
          Manage disputes with vendors by creating a dispute thread here.
        </p>
      </header>
      <div>
        {isLoading && (
          <div className="flex flex-col gap-2 md:gap-3 w-full max-w-[676px]">
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
            <Skeleton className="w-full h-[100px] " />
          </div>
        )}
        <div className="flex flex-col gap-4 md:gap-6">
          {data?.data?.map(
            ({ reason, description, createdAt, status }: any) => (
              <DisputeCard
                key={createdAt}
                reason={reason}
                description={description}
                time={createdAt}
                status={status}
              />
            )
          )}
          {data?.data.length === 0 && <EmptyTrans />}
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
      </div>
    </div>
  );
};

export default DisputeResolution;
