export interface ICreateActivityCommentService {
  userId: string;
  activityId: string;
  text: string;
}

export interface ICreateActivityComment {
  user: string;
  activity: string;
  text: string;
  date: Date;
}

export interface IActivityComment extends ICreateActivityComment {
  _id: string;
}
