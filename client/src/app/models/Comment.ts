export interface IComment {
  _id: string;
  user: string;
  activity: string;
  text: string;
  date: Date;
}

export interface ICommentFilters {
  limit?: number;
  start?: number;
}

export interface ICreateComment {
  text: string;
}
