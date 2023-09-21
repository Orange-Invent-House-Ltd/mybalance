import key from "../../assets/Icons/key.svg";
import useStore from "../../store";
import { Button } from "../../components/reuseable/Button";
import { useForgotPassword } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";

const ForgotPasswordVerification = () => {
  const store = useStore();
  const userEmail = store.authEmail;
  const email = localStorage.getItem('email')
const { mutate, isLoading } = useForgotPassword();
  

  return (
    <div className="relative mb-20">
      {isLoading && <LoadingOverlay />}

      <img src={key} alt="password" className="mx-auto" />
      <h6 className="mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]">
        Check your email
      </h6>
      <p className="mt-2 mb-8 text-[#6D6D6D] text-center text-base leading-5 font-normal">
        We sent a password reset link to{" "}
        <span className="font-bold">{email}</span>
      </p>
      <a href="mailto:">
        <Button fullWidth>Open email app</Button>
      </a>
      <p className="mt-6 text-sm font-normal w-fit mx-auto">
        Didn’t receive the email?{" "}
        <span
          className="text-primary-normal cursor-pointer"
          onClick={() => mutate({ email: email! })}
        >
          Click to resend
        </span>
      </p>
    </div>
  );
};

export default ForgotPasswordVerification;
