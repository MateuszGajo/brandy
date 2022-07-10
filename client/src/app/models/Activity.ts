import { IUser } from "./User";

export interface IActivity {
  id: string;
  user: IUser;
  title: string;
  photo: string;
  commentCount: number;
  likeCount: number;
  date: Date;
}

export interface IActivityComment {
  user: IUser;
  text: string;
}

export interface IActivityDetails extends IActivity {
  comments: IActivityComment[];
}
