
import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { publicApi } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store";
import phoneImage from "../../assets/images/R-phone.png";
import mphone from "../../assets/images/m-phone.png";
import logo from "../../assets/Icons/logo.svg";
import facebook from "../../assets/Icons/Facebook.svg";
import twitter from "../../assets/Icons/Twitter.svg";
import linkedin from "../../assets/Icons/LinkedIn.svg";
import Instagram from "../../assets/Icons/Instagram.svg";
import { usePasswordlessLogin, useResendOtp } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import { Button } from "../../components/reuseable/Button";
import TextField from "../../components/reuseable/TextField1";


const PasswordlessLogin = () => {
  const store = useStore();
  const navigate = useNavigate();
  const { mutate, isLoading } = usePasswordlessLogin();

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const {control, handleSubmit } = useForm();

  const passwordless = async (data: any) => {
    mutate(data);
  };

  return (
    <div className="relative mb-20">
      {isLoading && <LoadingOverlay />}
      <h1 className="text-headingColor md:text-center text-[23px] md:text-[32px] mb-4 font-medium md:font-bold">
        Passwordless Login
      </h1>
      <p className="mb-6 md:text-center text-[15px] md:text-[18px]">
        Enter your registered email address o login.
      </p>
      <form onSubmit={handleSubmit(passwordless)}>
        <TextField 
          name="email" 
          label="Email" 
          control={control}
          rules={{
            required: 'This field is required',
            pattern: {
              message: 'Enter a valid email',
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            }
          }}
        />
        <Button fullWidth> Login</Button>
      </form>
    </div>
  );
};

export default PasswordlessLogin;
