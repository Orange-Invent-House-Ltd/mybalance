import { z } from "zod";
import { LoginInput } from "../pages/auth/Login";
import { IUser, IUserProfile } from "./types";
import { SignupInput as buyerType } from "../pages/buyer/auth/Register";
import { privateApi, publicApi } from "./axios";

export const login = async (data: LoginInput) => {
  const res = await publicApi.post("/auth/login", data);
  return res.data;
};
export const registerBuyer = async (data: buyerType) => {
  const res = await publicApi.post("/auth/register", data);
  return res.data;
};
export const verifyEmail = async (data: { otp: string; tempId: string }) => {
  const res = await publicApi.post("/auth/verify-account", data);
  return res.data;
};
// export const registerSeller = async (data: SignupInput) => {
//   const res = await publicApi.post("/auth/register/seller", data);
//   return res.data;
// };
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export const getUser = async (): Promise<IUser> => {
  const res = await privateApi.get("/auth/profile");
  return res.data.data;

  // userSchema.parse(res)
};
