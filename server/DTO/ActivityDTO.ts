export interface IActivityDTO {
  userId: string;
  text: string;
  photo: string | undefined;
  upVotes: number;
  downVotes: number;
  votes: number;
  upVoteRatio: number;
  date: Date;
  isLiked: boolean;
}
