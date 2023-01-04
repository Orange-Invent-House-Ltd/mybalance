import React from "react";
import DisputeCard from "../../../components/buyers/disputeResolution/DisputeCard";
import { Button } from "../../../components/reuseable/Button";
import Modal from "../../../components/reuseable/Modal";

const AddNewDispute = () => {
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
        <div className="space-y-10">
          <DisputeCard />
          <DisputeCard />
          <DisputeCard />
          <div className="max-w-[343px]">
            <Button fullWidth>Add new dispute</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewDispute;
