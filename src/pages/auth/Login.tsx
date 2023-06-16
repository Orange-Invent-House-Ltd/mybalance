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
import { useUser } from "../../hooks/queries";

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
  // tabs
  const [openTab, setOpenTab] = useState(1);
  const { mutate, isLoading } = useLogin();
  const { data } = useUser();
  console.log(data);

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const userEmail = store.authEmail;

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit } = methods;

  const loginUser = async (data: LoginInput) => {
    mutate(data);
  };

  // const resendVerifyEmail = async (userEmail: any) => {
  //   try {
  //     const response = await publicApi.post("auth/resend-otp", {
  //       email: userEmail,
  //     });
  //     //Form submition success notifications
  //     toast.success(response.data.message as string, {
  //       toastId: "success1",
  //       position: "top-right",
  //     });
  //     store.setTempId(response.data.data?.tempId);
  //   } catch (error: any) {
  //     console.error(error);
  //     const resMessage =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString();
  //     //Form submition error notifications
  //     toast.error(resMessage, {
  //       toastId: "error1",
  //       position: "top-right",
  //     });
  //   }
  // };
  return (
    <div className="relative ">
      {isLoading && <LoadingOverlay />}
      {/* tabs */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {/* customer tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-lg font-medium capitalize py-3 block border-b-[2.5px] leading-normal " +
                  (openTab === 1
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Login as a customer
              </a>
            </li>
            {/* seller tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link to="/seller/register">
                <a
                  className={
                    "text-lg font-medium capitalize py-3 border-b-[2.5px] block leading-normal " +
                    (openTab === 2
                      ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                      : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Login as a seller
                </a>
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px- py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* Login as customer */}
                <div className={openTab === 1 ? "block" : "block"} id="link1">
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
                {/* Login as seller */}
                <div
                  className={openTab === 2 ? "block" : "hidden"}
                  id="link2"
                ></div>
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
          <span
            className="text-[#121212] font-bold cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/email-verification");
              // resendVerifyEmail(userEmail);
            }}
          >
            {" "}
            Verify Email
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
