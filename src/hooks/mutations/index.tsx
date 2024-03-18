import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LookUpBank,
  changePassword,
  createDispute,
  createEscrow,
  depositMoney,
  editBusinessProfile,
  editProfile,
  endTourGuide,
  forgotPassword,
  fundEscrow,
  getWithdrawFee,
  lockFunds,
  login,
  registerBuyer,
  registerSeller,
  resendOtp,
  resetPassword,
  respondTransaction,
  unLockFunds,
  uploadAvatar,
  verifyEmail,
  withdraw,
} from "../../api";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../queries";
import useStore from "../../store";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("session_token", data.data.token);
      if (data.data.user.isBuyer) {
        localStorage.setItem("userType", "buyer");
      }
      if (data.data.user.isSeller) {
        localStorage.setItem("userType", "seller");
      }
      toast.success(data.message);

      if (location.state?.from) {
        navigate(location.state.from);
        return;
      }

      navigate("/buyer/dashboard");
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.errors === null ? resMessage = error.response.data.message : 
      resMessage = error.response.data.errors.email[0]
      toast.error(resMessage);
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
      localStorage.setItem("userType", "buyer");
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
      localStorage.setItem("userType", "seller");
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
  const store = useStore();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      store.setAuthToken(data.data.token);
    },
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
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success("your password has been updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response.data.errors.password[0]);
    },
  });
};
export const useEndTourGuide= () => {
  return useMutation({
    mutationFn: endTourGuide,
    onSuccess: (data) => {
      // toast.success("your password has been updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response.data.errors.message);
    },
  });
};
export const useDepositMoney = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: depositMoney,
    onSuccess: (data) => {
      window.open(data.data.link);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useCreateEscrow = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createEscrow,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.tsx:152 ~ useCreateEscrow ~ data:", data);
      queryClient.invalidateQueries(["transactions"]);
      localStorage.setItem("escrowAmt", data.data.amount);
      localStorage.setItem("transactionRef", data.data.reference);
      if (user?.userType === "SELLER") {
        navigate(
          `/escrow-payment?amt=${data.data.amount}&ref=${data.data.reference}`
        );
      }
    },
    onError: (error: any) => {
      const resMessage =
        error.response.data.errors.partnerEmail[0].toString() ||
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      toast.error(resMessage);
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

      localStorage.removeItem("transactionRef");

      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["lockedFunds"]);
      queryClient.invalidateQueries(["user"]);
      navigate(
        `/escrow-payment?amt=${data.data.amount}&ref=${data.data.transactionReference}`
      );
    },
    onError: (error: any) => {},
  });
};
export const useUnLockFunds = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: unLockFunds,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.refetchQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["lockedFunds"]);
    },
    onError: (error: any) => {
      console.log("🚀 ~ file: index.tsx:232 ~ useUnLockFunds ~ error:", error);
      toast.error(
        // error.response.data.errors.transactionReference?.seller ||
        error.response.data.message  
      );
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
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export const useRespondTransaction = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: respondTransaction,
    onSuccess: (data) => {
      // navigate("/buyer/dashboard");
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useCreateDispute = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createDispute,
    onSuccess: (data) => {
      toast.success("Dispute Created Successfully");
      queryClient.invalidateQueries(["disputes"]);
      queryClient.refetchQueries({
        queryKey: ["disputes"],
      });
      navigate("../dispute-resolution");
    },
    onError: (error: any) => {
      toast.error(error.response.data.errors.transaction[0]);
    },
  });
};
export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      toast.success("Profile Edited Successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useEditBusinessProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editBusinessProfile,
    onSuccess: (data) => {
      toast.success("Profile Edited Successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      toast.success("photo updated Successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
export const useFundEscrow = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: fundEscrow,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.tsx:323 ~ useFundEscrow ~ data:", data);
      //  navigate(
      //    `/escrow-payment?amt=${amt}&ref=${data.data.transactionReference}`
      //  );
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};
