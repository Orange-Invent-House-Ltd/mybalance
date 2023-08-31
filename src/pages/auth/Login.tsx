import { useState } from "react";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store";
import TextField from "../../components/reuseable/TextField";
import { useLogin } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import { Button } from "../../components/reuseable/Button";


//type definition with error messages for the form input
const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

//type definition for login form
export type LoginInput = TypeOf<typeof loginSchema>;

const Login = () => {

  const { mutate, isLoading } = useLogin();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit } = methods;

  const loginUser = async (data: LoginInput) => {
    mutate(data);
  };

  return (
    <div className="relative ">
      {isLoading && <LoadingOverlay />}
      {/* tabs */}
      <div className="flex flex-wrap">
        <div className="w-full">
        
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className=" py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* Login as customer */}
                <div >
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(loginUser)}>
                      <h6 className="mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]">
                        Log in to your account
                      </h6>
                      <p className="mt-2 mb-8 text-[#6D6D6D] text-base font-normal">
                        Welcome back! Please enter your details and access your
                        dashboard.
                      </p>
                      <div className="grid gap-y-3.5">
                        <TextField
                          name="email"
                          label="Email"
                          placeholder="e.g al.bert@gmail.com"
                        />
                        <TextField
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="************"
                        />
                        <div className="flex items-center justify-between py-5">
                          <div className="flex items-center cursor-pointer gap-2">
                            <input type="checkbox" name="" id="rememberMe" />
                            <label
                              htmlFor="rememberMe"
                              className="cursor-pointer"
                            >
                              remember me
                            </label>
                          </div>
                          <Link to="/forgot-password" className="font-medium">
                            Forget password
                          </Link>
                        </div>
                        <Button fullWidth> Login</Button>
                      </div>
                    </form>{" "}
                  </FormProvider>
                </div>
              
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal mb-1 w-fit mx-auto">
          Don’t have an account?{" "}
          <Link
            to="/buyer/register"
            className="text-[#121212] font-bold cursor-pointer"
          >
            Create one
          </Link>
        </p>
        <p className="text-sm font-normal mb-7 w-fit mx-auto">
          Have not verify your email?
          <Link
            to="/email-verification"
            className="text-[#121212] font-bold cursor-pointer"
          
          >
            {" "}
            Verify Email
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
