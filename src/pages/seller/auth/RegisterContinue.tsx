import { useState, useEffect } from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../store";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { publicApi } from "../../../api/axios";
import { GenericResponse } from "../../../api/types";
import { BankResponse } from "../../../api/types";
import logo from "../../../assets/Icons/logo.svg";
import phoneImage from "../../../assets/images/R-phone.png";
import mphone from "../../../assets/images/m-phone.png";
import { Button } from "../../../components/reuseable/Button";
import TextField from "../../../components/reuseable/TextField";
import facebook from "../../../assets/Icons/Facebook.svg";
import twitter from "../../../assets/Icons/Twitter.svg";
import linkedin from "../../../assets/Icons/LinkedIn.svg";
import Instagram from "../../../assets/Icons/Instagram.svg";

//type definition with error messages for the form input
const registerSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  bankName: string().min(1, "Bank name is required"),
  accountNumber: string()
    .min(1, "Account number is required - numbers only")
    .max(10, "Account number must not be more than 10 digits")
    .regex(/^([0-9]{10})$/, "Account number must be 10 digits"),
  accountName: string().min(1, "Account name is required"),
  bankCode: string().min(1, "Account name is required"),
});

//type definition for form
export type SignupInput = TypeOf<typeof registerSchema>;

const RegisterContinue = () => {
  // tabs
  const [openTab, setOpenTab] = useState(2);
  const [banksAndCodes, setBanksAndCodes] = useState([]);
  // const [userBankCode, setuserBankCode] = useState("")

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, setValue, getValues, watch } = methods;

  useEffect(() => {
    getBankCode();
  }, []);

  // get user bank code from bank name once bank number input filed  === 10 digits
  useEffect(() => {
    const userAccountNumber = watch("accountNumber");
    let userBankCode = "";
    if (userAccountNumber.length === 10) {
      console.log(userAccountNumber);
      // get user bank code
      const bankName = getValues("bankName");
      console.log(bankName);
      banksAndCodes.map((bankAndCode: any, key) => {
        bankAndCode.name === bankName ? (userBankCode = bankAndCode.code) : "";
      });
      console.log(userBankCode);
      getAccountName(userBankCode, userAccountNumber);
    }
  }, [watch("accountNumber")]);

  // get all bankcode.
  const getBankCode = async () => {
    try {
      const response = await publicApi.get<BankResponse>(`/shared/banks`);
      setBanksAndCodes(response.data?.data);
      //Form submition success notifications
      // toast.success(response.data.status as string, {
      //   toastId: 'success1',
      //   position: "top-right",
      // });
    } catch (error: any) {
      console.log(error);
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        toastId: "error1",
        position: "top-right",
      });
    }
  };

  // get the user's account name.
  const getAccountName = async (
    userBankCode: string,
    userAccountNumber: string
  ) => {
    try {
      const response = await publicApi.post<GenericResponse>(
        `shared/lookup/nuban`,
        {
          bankCode: userBankCode,
          accountNumber: userAccountNumber,
        }
      );
      setValue("accountName", response.data.data?.accountName);
      setValue("bankCode", userBankCode);
      //Form submition success notifications
      // toast.success(response.data.status as string, {
      //   toastId: 'success1',
      //   position: "top-right",
      // });
    } catch (error: any) {
      console.log(error);
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        toastId: "error1",
        position: "top-right",
      });
    }
  };

  const registerUser = (data: SignupInput) => {
    store.setAuthUser({ ...store.authUser, ...data });
    store.setAuthEmail(data.email);
    //navigate to next page
    navigate("identity");
  };

  return (
    <div className=" md:flex justify-center flex-row-reverse">
      {/* mobile header */}
      <header className="md:hidden ml-[5%] mb-4 mt-[5%] ">
        <Link to="/">
          <img src={logo} alt="my-balance" />
        </Link>
      </header>
      <div className="md:w-[48%] lg:w-[50%]">
        <img
          src={phoneImage}
          alt="Image of a phone"
          className="hidden md:flex"
        />
      </div>
      {/* mobile phone Image */}
      <img
        src={mphone}
        alt="Image of a phone"
        className="md:hidden w-[100%] "
      />

      <div className="md:w-[52%] lg:w-[65%]">
        {/* Desktop header */}
        <header className="hidden md:flex ml-[5%] mt-[5%]">
          <Link to="/">
            <img src={logo} alt="my-balance" />
          </Link>
        </header>

        <div className="w-[343px] mx-auto my-6 ">
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
                      "text-xs font-bold uppercase py-3 block leading-normal " +
                      (openTab === 1
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Create as a customer
                  </a>
                </li>
                {/* seller tab */}
                <li className="-mb-px last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase py-3  block leading-normal " +
                      (openTab === 2
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Create as a seller
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    {/* create account as seller */}
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
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
                              name="email"
                              label="Email"
                              placeholder="e.g tmusty@gmail.com"
                            />
                            <TextField
                              name="password"
                              label="Add password"
                              type="password"
                              placeholder="************"
                            />
                            <TextField
                              name="bankName"
                              label="Bank name"
                              placeholder="e.g UBA"
                            />
                            <TextField
                              name="accountNumber"
                              label="Bank account number"
                              type="phone"
                              placeholder="e.g 0000000000"
                            />
                            <TextField
                              name="accountName"
                              label="Account name"
                              placeholder=""
                            />
                            <div className="hidden">
                              <TextField
                                name="bankCode"
                                label="bankCode"
                                placeholder=""
                              />
                            </div>
                            <Button fullWidth>Next</Button>
                          </div>
                        </form>
                      </FormProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className='text-sm font-normal mb-7 w-fit mx-auto'>Existing user? <a href="/login" className='text-[#121212] font-bold'>Log in here</a></p>
          </div>
        </div>
        <div className="px-[5%] w-fit mx-auto mb-16 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© 2022 My Balance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com/mybalance_app" target="_blank">
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="" target="_blank">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="https://www.facebook.com/themybalanceapp" target="_blank">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/mybalance_app" target="_blank">
              <img src={Instagram} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterContinue;
