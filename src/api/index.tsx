import { z } from "zod";
import { LoginInput } from "../pages/auth/Login";
import { IUserProfile } from "./types";
import { SignupInput as buyerType } from "../pages/buyer/auth/Register";
import { privateApi, publicApi } from "./axios";
import { GetVerificationInput } from "../pages/auth/GetVerificationLink";
import { SignupInput } from "../pages/seller/auth/Register";
import { ResetPasswordInput } from "../pages/auth/SetNewPassword";

export const login = async (data: LoginInput) => {
  const res = await publicApi.post("/auth/login", data);
  return res.data;
};
export const registerBuyer = async (data: buyerType) => {
  const res = await publicApi.post("/auth/register", data);
  return res.data;
};
export const registerSeller = async (data: SignupInput) => {
  const res = await publicApi.post("/auth/register/seller", data);
  return res.data;
};
export const forgotPassword = async (data: { email: string }) => {
  const res = await publicApi.post("/auth/forgot-password", data);
  return res.data;
};
export const resetPassword = async (data: ResetPasswordInput) => {
  const res = await publicApi.put("/auth/reset-password", data);
  return res.data;
};
export const changePassword = async (data: any) => {
  const res = await privateApi.put("/auth/change-password", data);
  return res.data;
};
export const verifyEmail = async (data: { otp: string; tempId: string }) => {
  const res = await publicApi.post("/auth/verify-account", data);
  return res.data;
};
export const resendOtp = async (data: GetVerificationInput) => {
  const res = await publicApi.post("/auth/resend-otp", data);
  return res.data;
}
export const endTourGuide = async (data: any) => {
  const res = await privateApi.put("/auth/end-tour-guide", data);
  return res.data;
};
export const depositMoney = async (data: string) => {
  const res = await privateApi.post("/shared/fund-wallet", {
    amount: data,
  });
  return res.data;
};
export const getBanks = async () => {
  const res = await publicApi.get("/shared/banks");
  return res.data;
};
export const LookUpBank = async (data: any) => {
  const res = await privateApi.post("/shared/lookup/nuban", data);
  return res.data;
};
export const getTransactions = async ({
  search,
  page,
  size,
}: {
  search?: string;
  page?: number;
  size?: number;
}) => {
  const res = await privateApi.get(`/transaction/`, {
    params: {
      search,
      page,
      size,
    },
  });
  return res.data;
};
export const getWithdrawFee = async (data: any) => {
  const res = await privateApi.post("/shared/withdrawal-fee", data);
  return res.data;
};
export const withdraw = async (data: any) => {
  const res = await privateApi.post("/shared/withdraw", data);
  return res.data;
};
export const createEscrow = async (data: any) => {
  const res = await privateApi.post("/transaction/initiate-escrow", {
    ...data,
  });
  return res.data;
};
export const lockFunds = async (transactionReference: string) => {
  const res = await privateApi.post("/transaction/lock-funds", {
    transactionReference,
  });
  return res.data;
};
export const unLockFunds = async (transactionReference: string) => {
  const res = await privateApi.post("/transaction/unlock-funds", {
    transactionReference,
  });
  return res.data;
};
export const getLockedFunds = async (page: number) => {
  const res = await privateApi.get("/transaction/locked-escrows", {
    params: {
      page,
    
    },
  });
  return res.data;
};
export const getTransactionInfo = async (transactionReference: any) => {
  const res = await privateApi.get(`/transaction/link/${transactionReference}`);
  return res.data;
};
export const getTransactionUnauthorized = async (
  transactionReference: string
) => {
  const res = await publicApi.get(
    `console/transactions/${transactionReference}`
  );
  return res.data;
};
export const respondTransaction = async ({
  ref,
  status,
  rejectedReason,
}: any) => {
  const res = await privateApi.patch(`/transaction/link/${ref}`, {
    status,
    rejectedReason,
  });
  return res.data;
};
export const createDispute = async (data: any) => {
  const res = await privateApi.post(`/dispute/`, data);
  return res.data;
};
export const getDisputes = async () => {
  const res = await privateApi.get(`/dispute`);
  return res.data;
};
export const editProfile = async (data: any) => {
  const res = await privateApi.put(`/auth/profile/edit`, data);
  return res.data;
};
export const editBusinessProfile = async (data: any) => {
  const res = await privateApi.put(`/auth/profile/business`, data);
  return res.data;
};
export const uploadAvatar = async (data: any) => {
  const res = await privateApi.post(`/auth/profile/upload`, data);
  return res.data;
};
export const getUser = async (): Promise<IUserProfile> => {
  const res = await privateApi.get("/auth/profile");
  return res.data.data;
};
export const getPaymentRedirect = async ({
  status,
  tx_ref,
  transaction_id,
}: any) => {
  const res = await privateApi.get("/shared/payment-redirect", {
    params: {
      status,
      tx_ref,
      transaction_id,
    },
  });
  return res.data;
};
export const getEscrowPaymentRedirect = async ({
  status,
  tx_ref,
  transaction_id,
}: any) => {
  if (status && tx_ref && transaction_id) {
    const res = await publicApi.get("/shared/escrow-payment-redirect", {
      params: {
        status,
        tx_ref,
        transaction_id,
      },
    });
    return res.data;
  }
  return null;
};
export const fundEscrow = async ({
  transactionReference,
  amountToCharge,
}: any) => {
  const res = await privateApi.post("/transaction/fund-escrow", {
    transactionReference,
    amountToCharge,
  });
  return res.data;
};
export const getNotifications = async ({page, size}: {page?: number; size?: number}) => {
  const res = await privateApi.get(`/notifications`, {
    params: {
      page,
      size,
    },
  });
  return res.data;
};
export const getNotification  = async (id: string) => {
  const res = await privateApi.get(`/notifications/${id}`);
  return res.data;
};