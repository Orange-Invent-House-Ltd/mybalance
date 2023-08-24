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
export const verifyEmail = async (data: { otp: string; tempId: string }) => {
  const res = await publicApi.post("/auth/verify-account", data);
  return res.data;
};
export const resendOtp = async (data: GetVerificationInput) => {
  const res = await publicApi.post("/auth/resend-otp", data);
  return res.data;
};
export const depositMoney = async (data: string) => {
  const res = await privateApi.post("/shared/fund-wallet", {
    amount: data,
  });
  return res.data;
};
export const getBanks = async () => {
  const res = await privateApi.get("/shared/banks");
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
export const getTransactionInfo = async (transactionReference: any) => {
  const res = await privateApi.get(
    `/transaction/lock-funds/${transactionReference}`
  );
  return res.data;
};

export const getUser = async (): Promise<IUserProfile> => {
  const res = await privateApi.get("/auth/profile");
  return res.data.data;
};
