import {EventHandler, SyntheticEvent, useState} from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { GenericResponse } from "../../../api/types";
import useStore from "../../../store";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from '../../../components/reuseable/Button';
import { LoadingButton } from "../../../components/reuseable/LoadingButton";
import TextField from '../../../components/reuseable/TextField';
import logo from "../../../assets/Icons/logo.svg"
import phoneImage from "../../../assets/images/R-phone.png"
import mphone from "../../../assets/images/m-phone.png"
import facebook from '../../../assets/Icons/Facebook.svg'
import twitter from '../../../assets/Icons/Twitter.svg'
import linkedin from '../../../assets/Icons/LinkedIn.svg'

//type definition with error messages for the form input
const registerSchema = object({
  name: string()
    .min(1, "Full name is required")
    .min(8, "Full name must be more than 8 characters")
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
      'Password must contain at least one special character, one Upper case, and one number,'
    ),
});

//type definition for form
export type SignupInput = TypeOf<typeof registerSchema>;

const Register = ({ setActiveTab}:any) => {
  // tabs
  const [openTab, setOpenTab] = useState(1);
  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState:{errors},
  } = methods

  // const registerUser = (data: SignupInput) => console.log(data)
  const registerUser= async (data: SignupInput) => {
    try {
      console.log(data)
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await authApi.post<GenericResponse>(
        "auth/register",
        data
      );
      //Form submition success notifications
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      store.setRequestLoading(false);
      store.setAuthEmail(response?.data?.email);
      //navigate to verification page after submition
      navigate("verification");
    } catch (error: any) {
      console.log(error)
      store.setRequestLoading(false);
      const resMessage =
      error.response.data.message.toString();
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
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%] "/>
      {/* Desktop Image */}
      <div className=''>
        <img src={phoneImage} alt="Image of a phone" className="hidden md:flex" />
      </div>
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
                      setOpenTab(1);
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
                  <Link
                    to ='/seller/register'
                  ><a
                    className={
                      "text-xs font-bold uppercase py-3  block leading-normal " +
                      (openTab === 2
                        ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                        : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                    }
                    // onClick={e => {
                    //   e.preventDefault();
                    //   setOpenTab(2);
                    // }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Create as a seller
                  </a></Link>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    {/* create account as customer */}
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      <FormProvider {...methods}>
                      <form 
                        onSubmit={handleSubmit(registerUser)}
                      >
                        <h6 className='mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]'>Create your account now</h6>
                        <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>Create your account in seconds and enjoy the full features of MyBalance.</p>
                        <div className='grid gap-y-3.5'>
                          <TextField 
                            name="name" label = "Full name" placeholder='e.g Albert'/>
                          <TextField
                            name="email" label = "Email" placeholder='e.g al.bert@gmail.com'/>
                          <TextField 
                            name="phone"
                            label = "Phone" placeholder='+234 000 0000 000'/>
                          <TextField
                            name="password"
                            label = "Password" type="password" placeholder='************'/>
                          <LoadingButton
                            loading={store.requestLoading}
                          > Next</LoadingButton>
                        </div>
                      </form>
                      </FormProvider>
                    </div>
                    {/* create account as seller */}
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className='text-sm font-normal mb-7 w-fit mx-auto'>Existing user? <a href="/buyer/login" className='text-[#121212] font-bold cursor-pointer'>Log in here</a></p>
          </div>
        </div>
        <div className="px-[5%] w-fit mx-auto mb-7 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
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

export default Register
