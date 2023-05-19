import {useState} from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { GenericResponse } from "../../../api/types";
import useStore from "../../../store";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import TextField from '../../../components/reuseable/TextField';
import logo from "../../../assets/Icons/logo.svg"
import phoneImage from "../../../assets/images/R-phone.png"
import mphone from "../../../assets/images/m-phone.png"
import { Button } from '../../../components/reuseable/Button';
import facebook from '../../../assets/Icons/Facebook.svg'
import twitter from '../../../assets/Icons/Twitter.svg'
import linkedin from '../../../assets/Icons/LinkedIn.svg'

//type definition with error messages for the form input
const registerSchema = z.object({
  passportNumber: z
    .union([z.string().length(0), z.string()
      .min(9, "passport number should be 9 alphanumeric character")
      .max(9, "passport number must not be more than 11 digits")
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{9}$/, "passport number must be 9 alphanumeric characters - A01234567")
    ])
    .optional(),
  lastName: z
    .union([z.string().length(0), z.string()
      .min(3, "Last name should be at least 3 character")
      .max(12, "Last name must not be more than 12 character")
    ])
    .optional(),
  firstName: z
    .union([z.string().length(0), z.string()
      .min(3, "First name should be at least 3 character")
      .max(12, "First name must not be more than 12 character")
    ])
    .optional(),
  DOB: z
    .union([z.string().length(0), z.string()
      .min(3, "First name should be at least 3 character")
      .max(12, "First name must not be more than 12 character")
    ])
    .optional(),
  NIN: z
    .union([z.string().length(0), z.string()
      .min(11, "NIN should be at least 11 digits")
      .max(11, "NIN must not be more than 11 character")
      .regex(/^([0-9]{11})$/, "NIN must be 11 digits only")
    ])
  .optional(),
  VIN: z
    .union([z.string().length(0), z.string()
      .min(19, "VIN should be at least 19 alphanumeric character")
      .max(19, "VIN must not be more than 19 alphanumeric character")
      .regex(/^([0-9]{19})$/, "VIN must be 19 alphanumeric character")
    ])
    .optional(),
  cardNumber: z
    .union([z.string().length(0), z.string()
      .min(8, "Card number should be at least 8 digits")
      .max(8, "Card number must not be more than 8 digits")
      .regex(/^([0-9]{8})$/, "Card number must be 8-digit")
    ])
    .optional(),
  state: z
    .union([z.string().length(0), z.string()
      .min(3, "state should be at least 3 character")
      .max(12, "State must not be more than 12 character")
    ])
    .optional(),
  lga: z
    .union([z.string().length(0), z.string()
      .min(3, "LGA should be at least 3 character")
    ])
    .optional(),
});

//type definition for form
export type SignupInput = TypeOf<typeof registerSchema>;


const RegisterIdentity = () => {
  // tabs
  const [openTab, setOpenTab] = useState(2);
  const [selectedValue, setSelectedValue] = useState('');

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
  } = methods

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  //onsubmit run registerUser function with the values collected from the form which is used as data in registerUser
  const onSubmitHandler: SubmitHandler<SignupInput> = (values) => {
    const identytyData = {
      kycType: selectedValue,
      kycMeta: values
    }
    store.setAuthUser({...store.authUser, ...identytyData});
    console.log(store.authUser);
    registerUser(values);
  };

  const registerUser= async (data: SignupInput) => {
    try {
      console.log(store.authUser)
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await authApi.post<GenericResponse>(
        "auth/register/seller",
        store.authUser
      );
      //Form submition success notifications
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      store.setRequestLoading(false);
      store.setTempId(response.data.data?.tempId);
      //navigate to verification page after submition
      navigate("/email-verification");
    } catch (error: any) {
      console.log(error)
      store.setRequestLoading(false);
      const resMessage =
        error.response.data.errors.email.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  return ( 
    <div className=' md:flex justify-center flex-row-reverse'>
      {/* mobile header */}
      <header className='md:hidden ml-[5%] mb-4 mt-[5%] '>
        <Link to="/"><img src={logo} alt="my-balance" /></Link>
      </header>
      <div className='md:w-[48%] lg:w-[35%]'>
        <img src={phoneImage} alt="Image of a phone" className="hidden md:flex" />
      </div>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%] "/>
      
      <div className='md:w-[52%] lg:w-[65%]'>
        {/* Desktop header */}
        <header className='hidden md:flex ml-[5%] mt-[5%]'>
          <Link to="/"><img src={logo} alt="my-balance" /></Link>
        </header>
        
        <div className='w-[343px] mx-auto my-6 '>
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
                    onClick={e => {
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
                      "text-xs font-bold uppercase py-3  block leading-normal " +
                      (openTab === 2
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    onClick={e => {
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
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <FormProvider {...methods}>
                        <form 
                          onSubmit={handleSubmit(onSubmitHandler)}
                        >
                          <h6 className='mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]'>We need your identity</h6>
                          <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>Enter your NIN, Int’l passport, Driver’s license or Voter’s card number below.</p>
                          <div className='grid gap-y-3.5'>
                              <label htmlFor="ID" className="text-sm mb-[6px] capitalize block">Means of ID</label>
                              <select name="ids" id="ids" onChange={handleSelectChange} className="border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] mb-6">
                                <option value="select">Select</option>
                                <option value="IP">International Passport</option>
                                <option value="NIN">NIN</option>
                                <option value="VC">Voter’s Card</option>
                                <option value="DL">Driver’s License</option>
                              </select>
                              { 
                                selectedValue === "IP" ? (
                                  <div>
                                    <TextField name="passportNumber" type="phone"  label = "Passport number" placeholder='1234 1234 123'/>
                                    <TextField name="lastName" label = "Last name" placeholder='Saka'/>
                                  </div>
                                ) : selectedValue === "NIN" ? (
                                  <div>
                                    <TextField name="NIN" type="phone" label = "NIN number" placeholder='e.g 1234 1234 123'/>
                                  </div>
                                ) : selectedValue === "VC" ? (
                                  <div>
                                    <TextField name="VIN" type="phone" label = "Voter’s card number" placeholder='e.g 1234 1234 123'/>
                                    <TextField name="firstName" type="text" label = "First name" placeholder='Bukola'/>
                                    <TextField name="lastName" type="text" label = "Last name" placeholder='Saka'/>
                                    <TextField name="DOB" type="phone" label = "Date of birth" placeholder='e.g DD-MM-YYYY'/>
                                    <div className="flex justify-center gap-4">
                                      <TextField name="state" variant = "short" type="text" label = "State" placeholder='Lagos'/>
                                      <TextField name="lga" variant = "short" type="text" label = "LGA" placeholder='Eti-Osa'/>
                                    </div>
                                  </div>
                                ) : selectedValue === "DL" ? (
                                  <div>
                                    <TextField name="cardNumber" label = "Card number" placeholder='e.g 1234 1234 123'/>
                                    <TextField name="DOB" label = "Date of birth" placeholder='DD-MM-YY'/>
                                  </div>
                                ) : ( <></>)
                              }
                              <div className="mt-6">
                                <Button fullWidth = {true}>Next</Button>
                              </div>
                          </div>
                        </form>
                      </FormProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className='text-sm font-normal mb-7 w-fit mx-auto'>Existing user? <a href="/seller/login" className='text-[#121212] font-bold'>Log in here</a></p>
          </div>
        </div>
        <div className="px-[5%] w-fit mx-auto mb-16 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© 2022 My Balance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={linkedin} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default RegisterIdentity
