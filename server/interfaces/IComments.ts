export interface ICreateCommentService {
  userId: string;
  activityId: string;
  text: string;
}

export interface ICreateComment {
  user: string;
  activity: string;
  text: string;
  date: Date;
}

export interface IComment extends ICreateComment {
  _id: string;
}
