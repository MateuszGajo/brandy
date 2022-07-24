import { IUser } from "./User";

export interface ICreateComment {
  comment: string;
}

export interface IComment {
  user: IUser;
  text: string;
}
