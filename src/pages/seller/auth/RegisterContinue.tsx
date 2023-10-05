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
import { useLookUpBank } from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { Button } from "../../../components/reuseable/Button";
import TextField from "../../../components/reuseable/TextField";
import facebook from "../../../assets/Icons/Facebook.svg";
import twitter from "../../../assets/Icons/Twitter.svg";
import linkedin from "../../../assets/Icons/LinkedIn.svg";
import Instagram from "../../../assets/Icons/Instagram.svg";
import { useBanks } from "../../../hooks/queries";
import eye from "../../../assets/Icons/eye.svg";
import hide from "../../../assets/Icons/hide.svg";

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
  const [passwordShown, setPasswordShown] = useState(false);
  // tabs
  const [openTab, setOpenTab] = useState(2);
  const [banksAndCodes, setBanksAndCodes] = useState([]);
  const [bankCode, setBankCode] = useState('');
  const [bankName, setBankName] = useState('')
  const { data: banks, isLoading: bankIsLoading } = useBanks();

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, setValue, getValues, watch } = methods;

  // get user bank name once bank number input filed  === 10 digits
  useEffect(() => {
    
    const userAccountNumber = watch("accountNumber");
    if (userAccountNumber.length === 10) {
      const bank = banks.data?.find((bank:any) => bank.name === bankName)
      setBankCode(bank.code)
      console.log(bankCode)
      if(bankCode!=='')getAccountName(bankCode, userAccountNumber);
    }
  }, [bankCode, watch("accountNumber")]);

  // get the user's account name.
  const getAccountName = async (bankCode:string, userAccountNumber:string) => {
    try {
      store.setRequestLoading(true);
      const response = await publicApi.post<GenericResponse>(
        `shared/lookup/nuban`,
        {
          bankCode: bankCode,
          accountNumber: userAccountNumber,
        }
      );
      setValue("accountName", response.data.data?.accountName);
      setValue("bankCode", bankCode);
      setValue("bankName", bankName);
      store.setRequestLoading(false);
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
    console.log('I got clicked')
    console.log(data)
    store.setAuthUser({ ...store.authUser, ...data });
    store.setAuthEmail(data.email);
    localStorage.setItem('email', data.email);
    //navigate to next page
    navigate("identity");
  };

  return (
    <div className="relative ">
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
                  "text-base lg:text-lg font-bold py-3 block leading-normal " +
                  (openTab === 1
                    ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
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
                  "text-base lg:text-lg font-bold py-3  block leading-normal " +
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
            <div className="px- py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* create account as seller. */}
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
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
                        <div className="w-[343px] text-[13px] mt-[-20px]">
                          <span className="text-neutral-600 font-bold leading-tight">NOTE:</span>
                          <span className="text-neutral-500 font-normal "> Use the email address that was shared with the buyer IF ANY.</span>
                        </div>
                        <div className="flex">
                          <TextField
                            name="password"
                            label="Add password"
                            placeholder="************"
                            type={passwordShown ? 'text' : 'password'}
                          />
                          <img src={passwordShown ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setPasswordShown(!passwordShown)}/>
                        </div>
                        <div className="w-full mb-3 ">
                          <label htmlFor={"selectBank"} className="block">
                            Select Bank
                          </label>
                          <select
                            className="block border border-[#B7B7B7] w-[316px] md:w-[343px] rounded-md p-2 outline-none focus:border-[#747373]"
                            value={bankName}
                            name="bankName"
                            onChange={(e) => {
                              setBankName(e.target.value)
                            }}
                          >
                            {banks?.data?.map((bank: any) =>(
                              <option key={bank.name} value={bank.name}>
                                {bank.name}
                              </option>
                            ))}
                            {bankIsLoading && (
                              <option value="">loading...</option>
                            )}
                          </select>
                        </div>
                        <TextField
                          name="accountNumber"
                          label="Bank account number"
                          type="phone"
                          placeholder="e.g 0000000000"
                        />
                        <div className="relative">
                          {store.requestLoading && <LoadingOverlay />}
                          <TextField
                            name="accountName"
                            label="Account name"
                            placeholder=""
                            disabled
                          />
                        </div>
                        <Button fullWidth >Next</Button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal mb-7 w-fit mx-auto">
          Existing user?{" "}
          <a href="/login" className="text-[#121212] font-bold">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterContinue;
