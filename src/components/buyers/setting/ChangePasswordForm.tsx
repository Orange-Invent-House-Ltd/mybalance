import React from "react";
import { Button } from "../../reuseable/Button";
import TextField from "../../reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return (
    <div className="w-[350px] ">
      <h2 className="text-[#121212] text-base font-bold capitalize">
        change password
      </h2>
      <p className="text-[#303030] mt-5 text-sm mb-10">
        To change your password{" "}
        <strong
          className="text-primary-normal cursor-pointer"
          onClick={() => {
            localStorage.clear();
            // queryClient.invalidateQueries({ queryKey: ["user"] });
            navigate("/forgot-password");
          }}
        >
          Click here
        </strong>
      </p>
      {/* <form className="space-y-4">
        <TextField
          control={control}
          name="amount"
          rules={{
            required: "this field is required",
          }}
          label={"old password"}
        />
        <TextField
          control={control}
          name="amount"
          rules={{
            required: "this field is required",
          }}
          label={"new password"}
        />
        <TextField
          control={control}
          name="amount"
          rules={{
            required: "this field is required",
          }}
          label={"retype password"}
        />
        <TextField
          control={control}
          name="amount"
          rules={{
            required: "this field is required",
          }}
          label={"enter email verification code"}
        />
        <Button fullWidth>update password</Button>
      </form> */}
    </div>
  );
};

export default ChangePasswordForm;
