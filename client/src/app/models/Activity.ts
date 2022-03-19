import { IUser } from "./Authentication";

export interface IActivity {
  id: string;
  user: IUser;
  title: string;
  photo: string;
  commentCount: number;
  likeCount: number;
  date: Date;
}
