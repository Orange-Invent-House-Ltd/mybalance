import React from 'react'
import { Button } from '../../reuseable/Button';
import TextField from '../../reuseable/TextField1';

const ChangeEmailForm = () => {
  return (
    <div className="w-[350px] ">
      <h2 className="text-[#121212] text-base font-bold capitalize">
        change email
      </h2>
      <p className="text-[#303030] text-sm mb-10">
        Use the form below to change your email address.
      </p>
      <form className="space-y-4">
        <TextField placeholder="sanya@gmail.com" label={"old email"} />
        <TextField placeholder="abayomi@gmail.com" label={"new email"} />
        <TextField placeholder="abayomi@gmail.com" label={"retype email"} />
        <TextField
          placeholder="123456"
          label={"enter email verification code"}
          type='number'
        />
        <Button fullWidth>update email</Button>
      </form>
    </div>
  );
}

export default ChangeEmailForm