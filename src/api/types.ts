export interface IUser {
  email?: string;
  email_verified?: boolean;
  name?: string;
  phone?: string;
  isVerified?: boolean;
  id?: string;
  isBuyer?: boolean;
  isSeller?: boolean;
  businessName?: string;
  businessDescription?: string;
  address?: string;
  password?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  bankCode?: string;
  lastLoginDate?: string;
}

export interface IUserProfile {
  id: string;
  bankAccount: {};
  lastLoginDate: string;
  lockedAmount: number;
  unlockedAmount: number;
  walletBalance: number;
  userId: string;
  userType: string;
  avatar: string;
  profileLink: string;
  bankAccountId: string;
  kycId: string;
  fullName: string;
}

export interface GenericResponse {
  message: string;
  email: string;
  data: {
    tempId : string;
    token: string;
    accountName:string;
    lastName: string;
    surname: string;
    firstName: string;
    firstname: string;
    user: IUser;
  } 
}
export interface IUserResponse {
  status: string;
  data: IUserProfile;
}

export interface ILoginResponse {
  status: string;
  token: string;
  expires_in:number;
  user: IUser;
}

export interface BankResponse {
  status: string;
  message: string;
  data: [];
}
