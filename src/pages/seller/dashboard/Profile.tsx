import React from "react";
import { Button } from "../../../components/reuseable/Button";
import TextField from "../../../components/reuseable/TextField1";

const Profile = () => {
  return (
    <div>
      <header className="mb-16">
        <h1 className="text-[23px] capitalize font-medium ">profile</h1>
        <p className="text-[#303030] text-sm mt-4">
          Manage your profile and personal details here.
        </p>
      </header>
      <div>
        <div className="flex items-center gap-5">
          <div className="w-[60px] h-[60px] bg-[#CDD2FD] border-2 border-[#9BA6FA] text-2xl text-white rounded-full  flex items-center justify-center uppercase font-bold">
            ab
          </div>
          <p>Tap to change photo</p>
        </div>
        <form className="space-y-5  w-[350px]">
          <TextField label="business name" />
          <TextField label="describe your service" />
          <TextField label="address" />
          <TextField label="phone" />
          <TextField label="bank name" />
          <TextField label="bank account number" />
          <TextField label="valid id number" />
          <Button fullWidth>update profile</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
