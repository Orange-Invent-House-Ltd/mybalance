import { useState } from "react";
import ChangeEmailForm from "../../../components/buyers/setting/ChangeEmailForm";
import ChangePasswordForm from "../../../components/buyers/setting/ChangePasswordForm";
import Joyride from "react-joyride";

const Settings = () => {
  return (
    <div>
      <header className="mb-16">
        <h1 className="text-[23px] capitalize font-medium ">Settings</h1>
        <p className="text-[#303030] text-sm mt-4">
          Make changes to your email, password and so on.
        </p>
      </header>
      <div className="flex gap-20 flex-wrap">
        {/* <ChangeEmailForm /> */}
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default Settings;
