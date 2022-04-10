export interface ICreateActivityService {
  userId: string;
  pictureUrl: string;
  text: string;
}

export interface ICreateActivity {
  userId: string;
  text: string;
  photo: string | undefined;
  upVotes: number;
  downVotes: number;
  votes: number;
  upVoteRatio: number;
  date: Date;
}

export interface IActivity extends ICreateActivity {
  _id: string;
}
