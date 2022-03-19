export interface IUser {
  _id: string;
  nick: string;
  email: string;
  password: string;
}

export interface IUserRegister {
  nick: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
