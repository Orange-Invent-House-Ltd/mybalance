import React from 'react'
import { Button } from '../../../components/reuseable/Button';
import MultilineTextField from '../../../components/reuseable/MultilineTextField';
import TextField from '../../../components/reuseable/TextField';

const DisputeResolution = () => {
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
      <form className="max-w-[720px]  space-y-8  ">
        <div className="flex gap-5 w-full flex-col lg:flex-row ">
          <TextField label="Reference code/ Transaction ID" />
          <TextField label="priority" />
        </div>
        <TextField label="Reason for filing your dispute" />

        <MultilineTextField label="Type in the box below" />

        <div className="flex justify-end">
          <div className="w-[350px]">
            <Button disabled fullWidth>
              submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DisputeResolution