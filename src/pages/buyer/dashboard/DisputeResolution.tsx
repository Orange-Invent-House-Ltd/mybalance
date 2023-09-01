import React from "react";
import DisputeCard from "../../../components/buyers/disputeResolution/DisputeCard";
import { Button } from "../../../components/reuseable/Button";
import Modal from "../../../components/reuseable/Modal";
import { useNavigate } from "react-router-dom";
import { useDisputes } from "../../../hooks/queries";
import Skeleton from "react-loading-skeleton";

const DisputeResolution = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDisputes();
  console.log("🚀 ~ file: DisputeResolution.tsx:12 ~ DisputeResolution ~ data:", data)
  return (
    <div>
      <header className="mb-16">
        <h1 className="text-[23px] capitalize font-medium ">
          Dispute resolution
        </h1>
        <p className="text-[#303030] text-sm mt-4">
          Manage disputes with vendors by creating a dispute thread here.
        </p>
      </header>
      <div>
        {isLoading && (
          <div className="flex flex-col gap-3">
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
            <Skeleton width={676} height={100} />
          </div>
        )}
        <div className="space-y-10">
          {data?.results?.map(
            ({ reason, description, createdAt, status }: any) => (
              <DisputeCard
                reason={reason}
                description={description}
                time={createdAt}
                status={status}
              />
            )
          )}

          <div className="max-w-[343px]">
            <Button
              fullWidth
              onClick={() => {
                navigate("add");
              }}
            >
              Add new dispute
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;
