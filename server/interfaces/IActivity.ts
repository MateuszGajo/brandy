export interface ICreateActivityService {
  userId: string;
  pictureUrl: string;
  text: string;
}

export interface ICreateActivity {
  user: string;
  text: string;
  photo: string | undefined;
  upVotes: string[];
  downVotes: string[];
  votes: number;
  upVoteRatio: number;
  date: Date;
}

export interface IActivity extends ICreateActivity {
  _id: string;
}

export interface IActivityFilers {
  sortBy: "hot" | "top" | "new";
  limit: number;
  start: number;
  search: string;
}
