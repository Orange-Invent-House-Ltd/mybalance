import { useState } from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../store";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "../../../components/reuseable/TextField";
import { useRegisterBuyer } from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { Button } from "../../../components/reuseable/Button";
import eye from '../../../assets/Icons/eye.svg'
import hide from '../../../assets/Icons/hide.svg'

//type definition with error messages for the form input
const registerSchema = object({
  name: string()
    .min(1, "Full name is required")
    .max(32, "Full name must be less than 50 characters"),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  phone: string()
    .min(1, "Phone number is required - numbers only")
    .max(11, "Phone number must not be more than 11 digits")
    .regex(/^([0-9]{11})$/, "Phone number must be 11 digits"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
      "Password must contain at least one special character, one Upper case, and one number,"
    ),
});

//type definition for form
export type SignupInput = TypeOf<typeof registerSchema>;

const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  // tabs
  const { mutate, isLoading } = useRegisterBuyer();
  const [openTab, setOpenTab] = useState(1);
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit } = methods;

  const registerUser = async (data: SignupInput) => {
    mutate(data);
  };

  return (
    <div className="relative  ">
      {isLoading && <LoadingOverlay />}
      {/* tabs */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 text-sm list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {/* customer tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "lg:text-lg font-medium capitalize py-3 block border-b-[2.5px] leading-normal " +
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
                Create as a customer
              </Link>
            </li>
            {/* seller tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                to="/seller/register"
                className={
                  "lg:text-lg font-medium capitalize py-3 border-b-[2.5px] block leading-normal " +
                  (openTab === 2
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  // e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                role="tablist"
              >
                Create as a seller
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px- py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* create account as customer */}
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(registerUser)}>
                      <h6 className="mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]">
                        Create your account now
                      </h6>
                      <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
                        Create your account in seconds and enjoy the full
                        features of MyBalance.
                      </p>
                      <div className="grid gap-y-3.5">
                        <TextField
                          name="name"
                          label="Full name"
                          placeholder="e.g Albert"
                        />
                        <TextField
                          name="email"
                          label="Email"
                          placeholder="e.g al.bert@gmail.com"
                        />
                        <TextField
                          name="phone"
                          label="Phone"
                          placeholder="+234 000 0000 000"
                        />
                        <div className="flex">
                          <TextField
                            name="password"
                            label="Password"
                            placeholder="************"
                            type={passwordShown ? 'text' : 'password'}
                          />
                          <img src={passwordShown ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setPasswordShown(!passwordShown)}/>
                        </div>
                        <Button> Next</Button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
                {/* create account as seller */}
                <div
                  className={openTab === 2 ? "block" : "hidden"}
                  id="link2"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal mb-7 w-fit mx-auto">
          Existing user?{" "}
          <Link to="/login" className="text-[#121212] font-bold cursor-pointer">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
