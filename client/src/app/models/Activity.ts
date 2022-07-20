import { IUser } from "./User";

export interface IActivity {
  _id: string;
  user: IUser;
  text: string;
  photo: string;
  commentCount: number;
  downVotesCount: number;
  upVotesCount: number;
  date: Date;
  commentsCount: number;
}

export interface IActivityComment {
  user: IUser;
  text: string;
}

export interface IActivityDetails extends IActivity {
  comments: IActivityComment[];
}

export type IActivitySort = "top" | "new" | "hot";

export interface IActivityFilters {
  sort: IActivitySort;
}
