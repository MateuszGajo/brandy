import { User } from './auth';
import { Vote } from './vote';

export interface Activity {
  _id: string;
  user: User;
  text: string;
  photo: string;
  commentCount: number;
  downVotesCount: number;
  upVotesCount: number;
  date: Date;
  dateFormatted?: string;
  commentsCount: number;
  userVote: Vote;
}

export type ActivitySort = 'top' | 'new' | 'hot';

export interface ActivityFilters {
  sort?: ActivitySort;
  search?: string;
}
