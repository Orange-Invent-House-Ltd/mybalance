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
        <TextField name="email" placeholder="sanya@gmail.com" label={"old email"} />
        <TextField name="new_email" placeholder="abayomi@gmail.com" label={"new email"} />
        <TextField name="new_email" placeholder="abayomi@gmail.com" label={"retype email"} />
        <TextField
          placeholder="123456"
          name="new_email"
          label={"enter email verification code"}
          type='number'
        />
        <Button fullWidth>update email</Button>
      </form>
    </div>
  );
}

export default ChangeEmailForm