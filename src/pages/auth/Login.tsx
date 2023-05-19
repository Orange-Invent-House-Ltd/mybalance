import {useState} from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { authApi } from "../../api/authApi";
import { GenericResponse } from "../../api/types";
import { Link, useNavigate  } from "react-router-dom";
import useStore from "../../store";
import { LoadingButton } from "../../components/reuseable/LoadingButton";
import TextField from "../../components/reuseable/TextField";
import phoneImage from "../../assets/images/R-phone.png"
import mphone from "../../assets/images/m-phone.png"
import logo from '../../assets/Icons/logo.svg'
import facebook from '../../assets/Icons/Facebook.svg'
import twitter from '../../assets/Icons/Twitter.svg'
import linkedin from '../../assets/Icons/LinkedIn.svg'

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

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const userEmail = store.authEmail

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const {
    handleSubmit,
  } = methods;

  const loginUser= async (data: LoginInput) => {
    store.setAuthEmail(data.email);
    try {
      console.log(data)
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await authApi.post<GenericResponse>(
        "auth/login",
        data
      );
      //Form submition success notifications
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      store.setRequestLoading(false);
      store.setAuthToken(response.data.data?.token);
      store.setAuthUser(response.data.data?.user);
      store.setTempId(response.data.data?.tempId);
      //navigate to verification page after submition
      response.data.data.user.isVerified === false ? navigate('/email-verification') :
      response.data.data.user.isBuyer === true ? navigate('/buyer/dashboard') : navigate( "/seller/dashboard")
    } catch (error: any) {
      console.log(error)
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const resendVerifyEmail = async (userEmail:any) => {
    try {
      const response = await authApi.post(
        'auth/resend-otp',
        {
          email: userEmail
        }
      );
      //Form submition success notifications
      toast.success(response.data.message as string, {
        toastId: 'success1',
        position: "top-right",
      });
      store.setTempId(response.data.data?.tempId);
    } catch (error:any) {
      console.error(error);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        toastId: 'error1',
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
                    Login as a customer
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
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Login as a seller
                  </a></Link>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    {/* Login as customer */}
                    <div className={openTab === 1 ? "block" : "block"} id="link1">
                      <FormProvider {...methods}>
                      <form 
                        onSubmit={handleSubmit(loginUser)}
                      >
                        <h6 className='mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]'>Log in to your account</h6>
                        <p className='mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal'>Welcome back! Please enter your details and access your dashboard.</p>
                        <div className='grid gap-y-3.5'>
                          <TextField
                            name="email" label = "Email" placeholder='e.g al.bert@gmail.com'/>
                          <TextField
                            name="password"
                            label = "Password" type="password" placeholder='************'/>
                          <div className="flex items-center justify-between py-5">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" name="" id="" />
                              <label htmlFor="">remember me</label>
                            </div>
                            <Link to='/forgot-password' className="font-bold">forget password</Link>
                          </div>
                          <LoadingButton
                            loading={store.requestLoading}
                          > Login</LoadingButton>
                        </div>
                      </form>
                      </FormProvider>
                    </div>
                    {/* Login as seller */}
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className='text-sm font-normal mb-1 w-fit mx-auto'>Don’t have an account? <Link to='/buyer/register' className='text-[#121212] font-bold cursor-pointer'>Create one</Link></p>
            <p className='text-sm font-normal mb-7 w-fit mx-auto'>Have not verify your email? 
              <span className='text-[#121212] font-bold cursor-pointer'
                onClick={e=>{
                  e.preventDefault();
                  navigate('/email-verification')
                  resendVerifyEmail(userEmail)
                }}
              > Verify Email</span></p>
          </div>
        </div>
        <div className="px-[5%] w-fit mx-auto mb-7 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© 2022 MyBalance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={linkedin} alt="" />
          </div>
        </div>
      </div>
    </div>  
  );
};

export default Login;
