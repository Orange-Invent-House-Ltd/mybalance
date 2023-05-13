export interface IUser {
  email: string;
  email_verified?: boolean;
  name?:string;
  phone?:number;
  user_type?: string;
  user_id?: string;

  gender?:string;
  date_of_birth?:string;
  nationality?:string;
  vnin?:number;
  nin_verified?: boolean;
  postal_code?:string;
  address?: string;
  address_verified?:boolean;
  district?: string;
  lga?:string;
  state?:string;
  company_name?: string;
  company_category?:string;
  company_phone_number?:string;
}

export interface GenericResponse {
  status: string;
  message: string;
  email: string;
  token: string;
  user: IUser;
  state: string;
  lga: string;
  district: string
  data?: {
    authorizer_first_name?:string;
    authorizer_last_name?: string;
    verified?: string;
    id?: string;
    state: string;
    lga: string;
    district: string
  } | any
  
  
}

export interface ILoginResponse {
  status: string;
  token: string;
  expires_in:number;
  user: IUser;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface EmailResponse {
  status: string;
  message: string;
  data: {
    user: IUser;
  };
}
