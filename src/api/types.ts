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
  bankAccount: any;
  lastLoginDate: string;
  lockedAmount: number;
  unlockedAmount: number;
  walletBalance: number | string;
  userId: string;
  userType: string;
  avatar: string;
  profileLink: string;
  bankAccountId: string;
  kyc: any;
  fullName: string;
  email: string;
  phoneNumber: string;
  withdrawnAmount: string;
  business: any;
  freeEscrowTransactions: number;
  showTourGuide: boolean;
}

export interface GenericResponse {
  message: string;
  email: string;
  data: {
    id: string;
    tempId: string;
    token: string;
    accountName: string;
    firstname: string;
    surname: string;
    firstName: string;
    middleName: string;
    lastName: string;
    meta: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
    user: IUser;
  };
}
export interface IUserResponse {
  status: string;
  data: IUserProfile;
}

export interface ILoginResponse {
  status: string;
  token: string;
  expires_in: number;
  user: IUser;
}

export interface BankResponse {
  status: string;
  message: string;
  data: [];
}
