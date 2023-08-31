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
          <TextField label="business name" name='business_name'/>
          <TextField label="describe your service" name='description'/>
          <TextField label="address" name='address'/>
          <TextField label="phone" name='phone'/>
          <TextField label="bank name" name='bank_name'/>
          <TextField label="bank account number" name='account_number'/>
          <TextField label="valid id number" name='id'/>
          <Button fullWidth>update profile</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
