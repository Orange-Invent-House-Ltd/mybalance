import React from "react";
import { Button } from "../../reuseable/Button";
import TextField from "../../reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../../../hooks/mutations";

const ChangePasswordForm = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useChangePassword()
  const onSubmit = (data:any) => {
    mutate(data)
  }
  return (
    <div className="w-[350px] ">
      <h2 className="text-[#121212] text-base font-bold capitalize">
        change password
      </h2>
      <p className="text-[#303030] mt-5 text-sm mb-10">
        Use the form below to change your password.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          control={control}
          name="currentPassword"
          rules={{
            required: "this field is required",
          }}
          label={"old password"}
        />
        <TextField
          control={control}
          name="password"
          rules={{
            required: "this field is required",
          }}
          label={"new password"}
        />
        <TextField
          control={control}
          name="confirmPassword"
          rules={{
            required: "this field is required",
          }}
          label={"retype password"}
        />
        <p>
          <strong>NOTE : </strong>
          <span className="text-[#6D6D6D]">
            Clicking on change password will log you out of MyBalance.
          </span>
        </p>
        <Button fullWidth>change password</Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
