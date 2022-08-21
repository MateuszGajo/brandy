export type IVoteType = "up" | "down";

export interface IVote {
  user: string;
  activity: string;
  type: IVoteType;
}

export interface IVoteDocument extends IVote {
  _id: string;
}
