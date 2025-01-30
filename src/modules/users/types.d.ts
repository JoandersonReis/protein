export type TUser = {
  id: string;
  created_at: Date;
  username: string;
  password: string;
  rule: number;
  premium: number;
};

export type TUserLoginData = {
  username: string;
  password: string;
};
