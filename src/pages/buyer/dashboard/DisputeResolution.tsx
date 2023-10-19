import React, { useCallback, useState } from "react";
import DisputeCard from "../../../components/buyers/disputeResolution/DisputeCard";
import { Button } from "../../../components/reuseable/Button";
import { useNavigate } from "react-router-dom";
import { useDisputes } from "../../../hooks/queries";
import Skeleton from "react-loading-skeleton";
import EmptyTrans from "../../../components/reuseable/EmptyTrans";
import ReactPaginate from "react-paginate";
import Pagination from "../../../components/reuseable/Pagination";

const DisputeResolution = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDisputes();
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };


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
        <div className="flex flex-col gap-4 md:gap-6  w-full max-w-[676px]">
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
          {!isLoading && data?.data.length > 0 && (
            <Pagination
              initialPage={data?.meta?.currentPage}
              onPageChange={handlePageChange}
              pageCount={data?.meta?.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;
