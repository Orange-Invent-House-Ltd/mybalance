import { useState } from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { publicApi } from "../../api/axios";
import { GenericResponse } from "../../api/types";
import useStore from "../../store";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "../../components/reuseable/LoadingButton";
import logo from "../../assets/Icons/logo.svg";
import mphone from "../../assets/images/m-phone.png";
import phone from "../../assets/images/R-phone.png";
import key from "../../assets/Icons/key.svg";
import { Button } from "../../components/reuseable/Button";
import TextField from "../../components/reuseable/TextField";

//type definition with error messages for the form input
const ForgotPasswordSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
});

//type definition for login form
export type ForgotPasswordInput = TypeOf<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const userEmail = store.authEmail;

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit } = methods;

  const getUserEmail = async (data: ForgotPasswordInput) => {
    try {
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "auth/forgot-password",
        data
      );
      store.setRequestLoading(false);
      store.setAuthEmail(data.email);
      //Form submition success notifications
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      //navigate to reset password page after submition
      navigate("email-verification");
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="md:flex justify-center flex-row-reverse">
      {/* mobile header */}
      <header className="md:hidden ml-[5%] mb-4 mt-[5%]">
        <Link to="/">
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

        <div className="w-[365px] md::w-[376px] mt-16 mx-auto mb-10 md:mb-0 px-[5%]">
          <img src={key} alt="password" className="mx-auto" />
          <h6 className="mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]">
            Forgot password?
          </h6>
          <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
            No worries, we’ll send you reset instructions.
          </p>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(getUserEmail)}>
              <TextField
                name="email"
                label="Email"
                placeholder="e.g “Musty Feet”"
              />{" "}
              <br />
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

export default ForgotPassword;
