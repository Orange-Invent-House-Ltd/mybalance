import React, { useEffect } from "react";
import { Button } from "../../../components/reuseable/Button";
import MultilineTextField from "../../../components/reuseable/MultilineTextField";
import TextField from "../../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useCreateDispute } from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";

const AddNewDispute = () => {
  const { handleSubmit, control, reset, register } = useForm();
  const { mutate, isLoading } = useCreateDispute();
  const onSubmit = (data: any) => {
    mutate(data);
  };
  let data = localStorage.getItem("transactionInfo") as any;
  data = JSON.parse(data);
  useEffect(() => {
    if (data) {
      reset({
        transaction: data.id,
      });
    }
  }, [reset]);
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
        <div className="flex gap-5 w-full items-center flex-col lg:flex-row ">
          <TextField
            control={control}
            label="Reference code/ Transaction ID"
            name="transaction"
            rules={{ required: "this field is required" }}
          />
      
          <div className="w-full mb-3 ">
            <label
              htmlFor={"selectBank"}
              className="text-sm mb-[6px] capitalize block"
            >
              select bank
            </label>
            <select
              className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#B7B7B7] "
              {...register("priority", {
                required: "this field is required",
              })}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
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
