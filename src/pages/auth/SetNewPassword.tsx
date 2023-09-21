import {useState, useEffect } from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicApi } from "../../api/axios";
import { GenericResponse } from "../../api/types";
import useStore from "../../store";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "../../components/reuseable/LoadingButton";
import logo from "../../assets/Icons/logo.svg";
import mphone from "../../assets/images/m-phone.png";
import phone from "../../assets/images/R-phone.png";
import key from "../../assets/Icons/key.svg";
import TextField from "../../components/reuseable/TextField";
import { useResetPassword } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import eye from '../../assets/Icons/eye.svg'
import hide from '../../assets/Icons/hide.svg'

//type definition with error messages for the form input
const ResetPasswordSchema = object({
  hash: string().min(1, "Email address is required"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

//type definition for login form
export type ResetPasswordInput = TypeOf<typeof ResetPasswordSchema>;

const SetNewPassword = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { verificationCode } = useParams();
  const { mutate, isLoading } = useResetPassword();
  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const userEmail = store.authEmail;

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (verificationCode) {
      setValue("hash", verificationCode);
    }
  }, []);

  const resetUserPassword = async (data: ResetPasswordInput) => {
    mutate(data);
  };

  return (
    <div className="relative mb-20">
      {isLoading && <LoadingOverlay />}
      <img src={key} alt="password" className="mx-auto" />
      <h6 className="mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]">
        Set new password
      </h6>
      <p className="mt-2 mb-8 text-center text-[#6D6D6D] text-[18px] leading-5 font-normal">
        Enter your new password below. Password must be 8 characters or more.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(resetUserPassword)}>
          <div className="flex">
            <TextField
              name="password"
              label="New password"
              placeholder="******"
              type={showPassword? 'text' : 'password'}
            />
            <img src={showPassword ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setShowPassword(!showPassword)}/>
          </div>
          <div className="flex">
            <TextField
              name="confirmPassword"
              label="Retype new password"
              placeholder="******"
              type={passwordShown? 'text' : 'password'}
            />
            <img src={passwordShown ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setPasswordShown(!passwordShown)}/>
          </div>
          {" "}
          <br />
          <div className="hidden">
            <TextField name="hash" label="hash" />
          </div>
          <LoadingButton fullWidth loading={store.requestLoading}>
            Reset password
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default SetNewPassword;
