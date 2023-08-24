// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import { useForm, FormProvider } from "react-hook-form";
import key from "../../assets/Icons/key.svg";
import { Button } from "../../components/reuseable/Button";
import TextField from "../../components/reuseable/TextField";
import { useForgotPassword } from "../../hooks/mutations";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";

//type definition with error messages for the form input
const ForgotPasswordSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
});

//type definition for login form
export type ForgotPasswordInput = TypeOf<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const store = useStore();
  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });


  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit } = methods;
const { mutate,isLoading } = useForgotPassword();
  const getUserEmail = async (data: ForgotPasswordInput) => {
     localStorage.setItem("email", data.email);
    mutate(data)
   
  };

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay/>}
      <img src={key} alt="password" className="mx-auto" />
      <h6 className="mt-12 text-[#121212] text-center font-medium text-[23px] leading-[31.05px]">
        Forgot password?
      </h6>
      <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
        No worries, we’ll send you reset instructions.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(getUserEmail)}>
          <TextField
            name="email"
            label="Email"
            placeholder="e.g “musty@gmail.com”"
          />{" "}
          <br />
          <Button fullWidth >
            Reset password
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgotPassword;
