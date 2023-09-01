import React from "react";
import { Button } from "../../../components/reuseable/Button";
import MultilineTextField from "../../../components/reuseable/MultilineTextField";
import TextField from "../../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";
import SelectField from "../../../components/reuseable/SelectField";
import { useCreateDispute } from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";

const AddNewDispute = () => {
  const { handleSubmit, control } = useForm();
  const { mutate, isLoading } = useCreateDispute();
  const onSubmit = (data: any) => {
    mutate(data);
  };
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
      <form
        className="max-w-[720px] space-y-8 relative "
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && <LoadingOverlay />}
        <div className="flex gap-5 w-full flex-col lg:flex-row ">
          <TextField
            control={control}
            label="Reference code/ Transaction ID"
            name="transaction"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            label="priority"
            name="priority"
            rules={{ required: "this field is required" }}
          />
        </div>
        <TextField
          control={control}
          label="Reason for filing your dispute"
          name="reason"
          rules={{ required: "this field is required" }}
        />
        <MultilineTextField
          control={control}
          name="description"
          rules={{ required: "this field is required" }}
          label="Type in the box below"
        />
        {/* <SelectField /> */}
        <div className="flex justify-end">
          <div className="w-[350px]">
            <Button disabled={isLoading} fullWidth>
              submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewDispute;
