import React from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { publicApi } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store";
import { LoadingButton } from "../../components/reuseable/LoadingButton";
import TextField from "../../components/reuseable/TextField";
import phoneImage from "../../assets/images/R-phone.png";
import mphone from "../../assets/images/m-phone.png";
import logo from "../../assets/Icons/logo.svg";
import facebook from "../../assets/Icons/Facebook.svg";
import twitter from "../../assets/Icons/Twitter.svg";
import linkedin from "../../assets/Icons/LinkedIn.svg";
import Instagram from "../../assets/Icons/Instagram.svg";
import { useResendOtp } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import { Button } from "../../components/reuseable/Button";

//type definition with error messages for the form input
const GetVerificationSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
});

//type definition for get verification link form
export type GetVerificationInput = TypeOf<typeof GetVerificationSchema>;

const GetVerificationLink = () => {
  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<GetVerificationInput>({
    resolver: zodResolver(GetVerificationSchema),
  });
  const { mutate, isLoading } = useResendOtp();

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit } = methods;

  const resendVerifyEmail = async (data: GetVerificationInput) => {
    mutate(data);
  };

  return (
    <div className="relative mb-20">
      {isLoading && <LoadingOverlay />}
      <h1 className="text-headingColor md:text-center text-[23px] md:text-[32px] mb-4 font-medium md:font-bold">
        Get Verification Link
      </h1>
      <p className="mb-6 md:text-center text-[15px] md:text-[18px]">
        Enter the information below to get your verification link.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(resendVerifyEmail)}>
          <TextField name="email" label="Email" />
          <Button fullWidth> Get verification link</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default GetVerificationLink;
