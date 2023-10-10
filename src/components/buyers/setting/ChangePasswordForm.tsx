import React, {useState} from "react";
import { Button } from "../../reuseable/Button";
import TextField from "../../reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../../../hooks/mutations";
import LoadingOverlay from "../../reuseable/LoadingOverlay";
import eye from '../../../assets/Icons/eye.svg'
import hide from '../../../assets/Icons/hide.svg'

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const [passwordShown2, setPasswordShown2] = useState(false)
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useChangePassword();
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <div className="w-[350px] ">
      <h2 className="text-[#121212] text-base font-bold capitalize">
        change password
      </h2>
      <p className="text-[#303030] mt-5 text-sm mb-10">
        Use the form below to change your password.
      </p>
      <form className="space-y-4 relative" onSubmit={handleSubmit(onSubmit)}>
        {isLoading && <LoadingOverlay />}
        <div className="flex">
          <TextField
            control={control}
            name="currentPassword"
            rules={{
              required: "this field is required",
            }}
            label={"old password"}
            type={showPassword? 'text' : 'password'}
          />
          <img src={showPassword ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setShowPassword(!showPassword)}/>
        </div>
        <div className="flex">
          <TextField
            control={control}
            name="password"
            rules={{
              required: "this field is required",
            }}
            label={"new password"}
            type={passwordShown? 'text' : 'password'}
          />
          <img src={passwordShown ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setPasswordShown(!passwordShown)}/>
        </div>
        <div className="flex">
          <TextField
            control={control}
            name="confirmPassword"
            rules={{
              required: "this field is required",
            }}
            label={"retype password"}
            type={passwordShown2? 'text' : 'password'}
          />
          <img src={passwordShown2 ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setPasswordShown2(!passwordShown2)}/>
        </div>
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
