import { useEffect, useState } from "react";
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
import eye from "../../assets/Icons/eye.svg";
import hide from "../../assets/Icons/hide.svg";
import MultilineTextField from "../../components/reuseable/MultilineTextField";

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
  const [passwordShown, setPasswordShown] = useState(false);
  const { mutate, isLoading } = useLogin();
  const [openTab, setOpenTab] = useState(1);
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit } = methods;

  const loginUser = async (data: LoginInput) => {
    mutate(data);
  };

  return (
    <div className="relative mb-20">
      {isLoading && <LoadingOverlay />}
      <div className="flex flex-wrap">
        {/* tabs */}
        <div className="w-full">
          <ul
            className="flex mb-0 text-sm list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {/* customer tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-base lg:text-lg font-medium capitalize py-3 block border-b-[2.5px] leading-normal " +
                  (openTab === 1
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                to="#link1"
                role="tablist"
              >
                Login as a customer
              </Link>
            </li>
            {/* seller tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-base lg:text-lg font-medium capitalize py-3 border-b-[2.5px] block leading-normal " +
                  (openTab === 2
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                to="#link2"
                role="tablist"
              >
                Login as a seller
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className=" py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* Login as customer */}

                <div id="link1">
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(loginUser)}>
                      <h6 className="mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]">
                        Log in to your account
                      </h6>
                      <p className="mt-2 mb-8 text-[#6D6D6D] text-base font-normal">
                        Welcome back! Please enter your details and access your
                        dashboard.
                      </p>

                      <div className="">
                        <TextField
                          name="email"
                          label="Email"
                          placeholder="e.g al.bert@gmail.com"
                        />

                        <div className="relative">
                          <TextField
                            name="password"
                            label="Password"
                            placeholder="************"
                            type={passwordShown ? "text" : "password"}
                          />
                          <img
                            src={passwordShown ? hide : eye}
                            alt="show password"
                            className="absolute top-9 right-3 hover:cursor-pointer w-[20px] h-5"
                            onClick={() => setPasswordShown(!passwordShown)}
                          />
                        </div>
                        <div className="flex items-center justify-between py-5">
                          <div className="flex items-center cursor-pointer gap-2">
                            <input type="checkbox" name="" id="rememberMe" />
                            <label
                              htmlFor="rememberMe"
                              className="cursor-pointer"
                            >
                              Remember me
                            </label>
                          </div>
                          <Link to="/forgot-password" className="font-medium">
                            Forgot password
                          </Link>
                        </div>
                        <Button fullWidth> Login</Button>
                      </div>
                    </form>{" "}
                  </FormProvider>
                </div>
                {/* Login as customer */}
                <div className={openTab === 2 ? "hidden" : "hidden"} id="link1">
                  content 2 is here
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal mb-1 w-fit ">
          Don’t have an account?{" "}
          <Link
            to="/buyer/register"
            className="text-[#121212] font-bold cursor-pointer"
          >
            Create one
          </Link>
        </p>
        <p className="text-sm font-normal mb-1 w-fit ">
          Can’t verify my email?
          <Link
            to="/email-verification"
            className="text-[#121212] font-bold cursor-pointer"
          >
            {" "}
            Verify now
          </Link>
        </p>
        {/* <p className="text-sm font-normal mb-7 w-fit ">
          Don’t have a password?{" "}
          <Link
            to="/passwordless-login"
            className="text-[#121212] font-bold cursor-pointer"
          >
            Passwordless login
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
