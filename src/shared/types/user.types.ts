export interface IUserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  provider: string;
  password: string;
  telegram_id?: number | null

  isVerified: boolean;
  isTwoFactorEnabled: boolean;

  name: string;
  is_ict?: boolean;
  company_name?: string;
  company_name_full?: string;
  surname: string;
  last_name: string;
  is_admin?: boolean;
  is_accountant?: boolean;
  is_manager?: boolean;
  is_director?: boolean;
  is_blocked?: boolean;
  is_ict_admin?: boolean;
}
