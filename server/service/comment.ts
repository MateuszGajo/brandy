import { ICreateComment, ICreateCommentService } from "@/interfaces/IComments";
import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class CommentService {
  constructor(
    @Inject("commentModel") private commentModel: Models.CommentModel,
    @Inject("logger") private logger: Logger
  ) {}

  public async addComment(data: ICreateCommentService) {
    const newComment: ICreateComment = {
      user: data.userId,
      activity: data.activityId,
      text: data.text,
      date: new Date(),
    };

    this.commentModel.create(newComment);
  }
}
