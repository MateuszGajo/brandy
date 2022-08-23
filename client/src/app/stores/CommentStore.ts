import agent from "app/api/agent";
import { IComment, ICommentFilters, ICreateComment } from "app/models/Comment";
import { ConvertToParams } from "app/utils/ConvertToParams";
import { makeAutoObservable } from "mobx";

export default class CommentStore {
  constructor() {
    makeAutoObservable(this);
  }

  comments: IComment[] | null = [];

  addComment = async (newComment: ICreateComment, activityId: string) => {
    try {
      const { data } = await agent.Comment.add(activityId, newComment);
      this.comments = [data, ...(this.comments || [])];
      console.log(this.comments);
    } catch (err) {
      console.log("Problem adding comment" + err);
    }
  };

  loadComments = async (activityId: string, filters?: ICommentFilters) => {
    const params = ConvertToParams(filters);
    try {
      const { data: comments } = await agent.Comment.list(activityId, params);
      this.comments = comments;
    } catch (err) {
      console.log("Problem featching comments" + err);
    }
  };
}
