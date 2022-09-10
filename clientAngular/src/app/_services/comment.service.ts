import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatActivityDate } from '../_utils/date';
import { Comment } from '../_models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  onCommentsGetData: EventEmitter<any> = new EventEmitter();
  comments: Comment[] = [];

  constructor(private HttpClient: HttpClient) {}

  addComment = (text: string, activityId: string) => {
    this.HttpClient.post<Comment>(`activity/${activityId}/comments/add`, {
      text,
    }).subscribe({
      next: (comment) => {
        if (!comment) return;
        const commentWithFormattedDate = {
          ...comment,
          dateFormatted: formatActivityDate(new Date(comment.date)),
        };
        const newComments = [commentWithFormattedDate, ...this.comments];

        this.comments = newComments;
        this.onCommentsGetData.emit(newComments);
      },
    });
  };

  fetchComments = (activityId: string) => {
    this.HttpClient.get<Comment[]>(`activity/${activityId}/comments`).subscribe(
      {
        next: (comments) => {
          if (!comments) return;

          const commentsWithFormattedDate = comments.map((comment) => {
            return {
              ...comment,
              dateFormatted: formatActivityDate(new Date(comment.date)),
            };
          });
          this.comments = commentsWithFormattedDate;
          this.onCommentsGetData.emit(commentsWithFormattedDate);
        },
      }
    );
  };
}
