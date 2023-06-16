import { useEffect } from "react";
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
  const { verificationCode } = useParams();
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
    try {
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.put<GenericResponse>(
        "auth/reset-password",
        data
      );
      store.setRequestLoading(false);
      // console.log(token)
      //Form submition success notifications
      toast.success(response.data.message as string, {
        toastId: "success1",
        position: "top-right",
      });
      //navigate to verification page after submition
      navigate("/reset-password/password-reset");
    } catch (error: any) {
      store.setRequestLoading(false);
      // setVerificationMessage('An error occurred while verifying your email.');
      const resMessage = error.response.data.error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        toastId: "error1",
        position: "top-right",
      });
    }
  };

  return (
    <div className="md:flex justify-center flex-row-reverse">
      {/* mobile header */}
      <header className="md:hidden ml-[5%] mb-4 mt-[5%]">
        <Link to="/buyer/register">
          <img src={logo} alt="my-balance" />
        </Link>
      </header>
      <div className="md:w-[40%] lg:w-[30%]">
        <img src={phone} alt="" className="hidden md:flex" />
      </div>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%]" />
      {/* medium size header */}
      <div className="md:w-[60%] lg:w-[70%]">
        {/* Desktop header */}
        <header className="hidden md:flex ml-[5%] mt-[5%]">
          <Link to="/">
            <img src={logo} alt="my-balance" />
          </Link>
        </header>

        <div className="w-[365px] md::w-[376px] mt-16 mx-auto mb-10 md:mb-0 px-[5%] md:px-0">
          <img src={key} alt="password" className="mx-auto" />
          <h6 className="mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]">
            Set new password
          </h6>
          <p className="mt-2 mb-8 text-center text-[#6D6D6D] text-[18px] leading-5 font-normal">
            Enter your new password below. Password must be 8 characters or
            more.
          </p>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(resetUserPassword)}>
              <TextField
                name="password"
                label="New password"
                placeholder="******"
                type="password"
              />
              <TextField
                name="confirmPassword"
                label="Retype new password"
                placeholder="******"
                type="password"
              />{" "}
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
      </div>
    </div>
  );
};

export default SetNewPassword;
