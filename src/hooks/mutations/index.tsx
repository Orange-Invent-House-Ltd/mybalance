import { useMutation } from "@tanstack/react-query";
import { login, registerBuyer, verifyEmail } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("session_token", data.data.token);
      if (data.data.user.isBuyer) {
        localStorage.setItem("userType", "buyer");
      } else {
        localStorage.setItem("userType", "seller");
      }
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export const useRegisterBuyer = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerBuyer,
      onSuccess: (data) => {
        // localStorage.setItem('email',data.)
      navigate("/email-verification");
    },
    onError: (error: any) => {
      for (const key in error.response.data.errors) {
        const value = error.response.data.errors[key][0];
        console.log("🚀 ~ file: index.tsx:36 ~ useRegisterBuyer ~ value:", value)
        toast.error(value);
      }
    },
  });
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.tsx:36 ~ useRegisterBuyer ~ data:", data);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
