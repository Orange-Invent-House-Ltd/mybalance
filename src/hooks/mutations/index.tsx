import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LookUpBank,
  createEscrow,
  depositMoney,
  forgotPassword,
  getWithdrawFee,
  lockFunds,
  login,
  registerBuyer,
  registerSeller,
  resendOtp,
  resetPassword,
  verifyEmail,
  withdraw,
} from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("session_token", data.data.token);
      if (data.data.user.isBuyer) {
        localStorage.setItem("userType", "buyer");
        navigate("/buyer/dashboard");
      } else {
        localStorage.setItem("userType", "seller");
        navigate("/seller/dashboard");
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
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("tempId", data.data.tempId);
      navigate("/email-verification");
    },
    onError: (error: any) => {
      for (const key in error.response.data.errors) {
        const value = error.response.data.errors[key][0];
        console.log(
          "🚀 ~ file: index.tsx:36 ~ useRegisterBuyer ~ value:",
          value
        );
        toast.error(value);
      }
    },
  });
};
export const useRegisterSeller = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerSeller,
    onSuccess: (data) => {
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("tempId", data.data.tempId);
      navigate("/email-verification");
    },
    onError: (error: any) => {
      for (const key in error.response.data.errors) {
        const value = error.response.data.errors[key][0];
        console.log(
          "🚀 ~ file: index.tsx:36 ~ useRegisterBuyer ~ value:",
          value
        );
        toast.error(value);
      }
    },
  });
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {},
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useResendOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (data) => {
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("tempId", data.data.tempId);
      navigate("/email-verification");
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.tsx:99 ~ useForgotPassword ~ data:", data);

      navigate("/forgot-password/email-verification");
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      navigate("/reset-password/password-reset");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useDepositMoney = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: depositMoney,
    onSuccess: (data) => {
      window.open(data.data.link, "_blank");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useCreateEscrow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEscrow,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.tsx:152 ~ useCreateEscrow ~ data:", data);
      queryClient.invalidateQueries(["transactions"]);
      localStorage.setItem("escrowAmt", data.data.amount);
    },
    onError: (error: any) => {
      toast.error("an error occurred");
    },
  });
};
export const useLockFunds = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: lockFunds,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.tsx:152 ~ useCreateEscrow ~ data:", data);
      const amt = localStorage.getItem("escrowAmt");
      queryClient.invalidateQueries(["transactions"]);
      navigate(
        `/Payment-successful?amt=${amt}&ref=${data.data.transactionReference}`
      );
    },
    onError: (error: any) => {
      toast.error("an error occurred");
    },
  });
};
export const useLookUpBank = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: LookUpBank,
    onSuccess: (data) => {},
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useWithdrawFee = () => {
  return useMutation({
    mutationFn: getWithdrawFee,
    onSuccess: (data) => {},
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdraw,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["transactions"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
