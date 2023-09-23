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

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, setValue, getValues, watch } = methods;

  const [code, setCode] = useState("");
  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const {
    data: LookupData,
    mutate: LookupMutate,
    isLoading: LookupIsLoading,
  } = useLookUpBank();

  // get user bank name once bank number input filed  === 10 digits
  useEffect(() => {
    const userAccountNumber = watch("accountNumber");
    if (userAccountNumber.length === 10) {
      // LookupMutate({ bankCode: code, accountNumber: userAccountNumber});
      // setValue("accountName", LookupData?.data.accountName);
      // console.log(userAccountNumber);
      getAccountName(code, userAccountNumber);
    }
  }, [watch("accountNumber")]);

  // get the user's account name.
  const getAccountName = async (
    userBankCode: string,
    userAccountNumber: string
  ) => {
    try {
      store.setRequestLoading(true);
      const response = await publicApi.post<GenericResponse>(
        `shared/lookup/nuban`,
        {
          bankCode: userBankCode,
          accountNumber: userAccountNumber,
        }
      );
      setValue("accountName", response.data.data?.accountName);
      setValue("bankCode", userBankCode);
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
    store.setAuthUser({ ...store.authUser, ...data });
    store.setAuthEmail(data.email);
    //navigate to next page
    navigate("identity");
  };
  // const [code, setCode] = useState("");
  // useEffect(() => {
  //   if (userAccountNumber?.length === 10) {
  //     // LookupMutate({ bankCode: code, accountNumber: accNum });
  //     LookupMutate({ bankCode: "035", accountNumber: userAccountNumber });
  //   }
  // }, [userAccountNumber, code]);

  return (
    <div className="relative ">
      {/* tabs */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px- py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* create account as seller */}
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
                        {/* <div className="flex">
                          <TextField
                            name="password"
                            label="Add password"
                            placeholder="************"
                            type={passwordShown ? 'text' : 'password'}
                          />
                          <img src={passwordShown ? hide : eye} alt="show password" className='relative top-9 right-8 hover:cursor-pointer w-[20px] h-5' onClick={()=> setPasswordShown(!passwordShown)}/>
                        </div> */}
                        <div className="w-full mb-3 ">
                          <label htmlFor={"selectBank"} className="block">
                            select bank
                          </label>
                          <select
                            className="block border border-[#B7B7B7] w-[316px] md:w-[343px] rounded-md p-2 outline-none focus:border-[#747373] "
                            value={code}
                            onChange={(e) => {
                              setCode(e.target.value);
                            }}
                          >
                            {banks?.data?.map((bank: any) => (
                              <option key={bank.slug} value={bank.code}>
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
                        <Button fullWidth>Next</Button>
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
