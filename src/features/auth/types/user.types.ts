export enum EnumUserRole {
  REGULAR = "REGULAR",
  ADMIN = "ADMIN",
}

export enum EnumAuthMethod {
  CREDENTIALS = "CREDENTIALS",
  GOOGLE = "GOOGLE",
}

export interface IAccount {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  provider: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  userId: string;
}
export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  provider: string;
  password: string;
  displayName: string;
  picture: string;
  role: EnumUserRole;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  method: EnumAuthMethod;
  accounts: IAccount[];
  name: string;
  is_ict?: boolean;
  company_name?: string;
  surname?: string;
  last_name?: string;
  is_admin?: boolean;
  is_accountant?: boolean;
  is_manager?: boolean;
  is_director?: boolean;
  is_ict_admin?: boolean;
}
