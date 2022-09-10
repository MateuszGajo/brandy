export interface Comment {
  _id: string;
  user: string;
  activity: string;
  text: string;
  date: Date;
  dateFormatted?: string;
}

export interface CreateComment {
  text: string;
}
