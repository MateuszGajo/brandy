export interface IUser {
  _id: string;
  nick: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  user: IUser;
}
