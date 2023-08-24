import React from "react";
import { Button } from "../../../components/reuseable/Button";
import TextField from "../../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { handleSubmit, control } =
    useForm();
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
          <TextField
            control={control}
            label="full name"
            name="amount"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            label="email"
            name="amount"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            label="phone"
            name="amount"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            label="password"
            name="amount"
            rules={{ required: "this field is required" }}
          />
        
          <Button fullWidth>update profile</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
