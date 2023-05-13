import React from "react";
import { Button } from "../../reuseable/Button";
import TextField from "../../reuseable/TextField1";

const ChangePasswordForm = () => {
  return (
    <div className="w-[350px] ">
      <h2 className="text-[#121212] text-base font-bold capitalize">
        change password
      </h2>
      <p className="text-[#303030] text-sm mb-10">
        Use the form below to change your password.
      </p>
      <form className="space-y-4">
        <TextField label={"old password"} />
        <TextField label={"new password"} />
        <TextField label={"retype password"} />
        <TextField label={"enter email verification code"} />
        <Button fullWidth>update password</Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
