export interface ICreds {
  email: string;
  password: string;
}

export interface INewUser extends ICreds {
  nick: string;
}

export interface IUser {
  nick: string;
}
