export type TUser = {
  id: string;
  created_at: Date;
  username: string;
  password: string;
};

export type TUserLoginData = {
  username: string;
  password: string;
};
