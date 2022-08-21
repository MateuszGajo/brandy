import { IComment } from "./Comment";
import { IUser } from "./User";
import { IVote } from "./Vote";

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
  userVote: IVote;
}

export type IActivitySort = "top" | "new" | "hot";

export interface IActivityFilters {
  sort?: IActivitySort;
  search?: string;
}

export interface ICreateActivity {
  text: string;
  image?: File;
}
