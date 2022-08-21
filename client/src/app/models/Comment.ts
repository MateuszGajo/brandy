import { IUser } from "./User";

export interface ICreateComment {
  text: string;
}

export interface IComment {
  user: IUser;
  text: string;
  date: Date;
}
