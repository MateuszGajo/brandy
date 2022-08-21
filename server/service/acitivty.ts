import APIError from "@/api/Error/APIError";
import votes from "@/data/votes";
import {
  IActivity,
  IActivityFilers,
  ICreateActivity,
  ICreateActivityService,
} from "@/interfaces/IActivity";
import { IVote, IVoteDocument, IVoteType } from "@/interfaces/IVote";
import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class ActivityService {
  constructor(
    @Inject("activityModel") private activityModel: Models.ActivityModel,
    @Inject("voteModel") private voteModel: Models.VoteModel,
    @Inject("logger") private logger: Logger
  ) {}

  private calculateNewVotes(
    upVotes: number,
    downVotes: number,
    yourVote: IVoteType,
    yourPreviousVote: IVoteType | null
  ) {
    if (yourVote === "up") {
      if (yourPreviousVote === "down") downVotes--;
      else if (yourPreviousVote !== "up") upVotes++;
    } else if (yourVote === "down") {
      if (yourPreviousVote === "up") upVotes--;
      else if (yourPreviousVote !== "down") downVotes++;
    }

    const allVotes = upVotes + downVotes;
    const upVoteRatio = upVotes / allVotes;

    return {
      allVotes,
      upVoteRatio,
      upVotes,
      downVotes,
    };
  }

  private async editCreateOrDeleteVote(
    vote: IVoteDocument | null,
    yourVote: IVoteType,
    activityId: string,
    userId: string
  ) {
    if (vote && vote.type !== yourVote) {
      return await this.voteModel.updateOne(
        { _id: vote._id },
        { $set: { type: yourVote } }
      );
    } else if (vote) {
      return await this.voteModel.deleteOne({
        _id: vote._id,
      });
    }

    const newVote: IVote = {
      user: userId,
      activity: activityId,
      type: yourVote,
    };

    return await this.voteModel.create(newVote);
  }

  private async getActivityWithUserVote(activityId: string, userId: string) {
    const activity = await this.activityModel
      .findOne({ _id: activityId })
      .populate({
        path: "userVote",
        match: {
          user: userId,
        },
        select: "type -activity",
      })
      .populate({ path: "user", select: "nick email role" });
    if (!activity) throw new APIError("Activity doesn't exist", 404);
    return activity as any;
  }

  private async addOrUpdateVote(
    activityId: string,
    userId: string,
    voteType: IVoteType
  ) {
    const activity = await this.getActivityWithUserVote(activityId, userId);

    const vote = activity.userVote;

    await this.editCreateOrDeleteVote(vote, voteType, activityId, userId);

    const { allVotes, upVoteRatio, upVotes, downVotes } =
      this.calculateNewVotes(
        activity.upVotesCount,
        activity.downVotesCount,
        voteType,
        vote?.type || null
      );

    await this.activityModel.updateOne(
      {
        _id: activityId,
      },
      {
        $set: {
          votes: allVotes,
          upVotes,
          downVotes,
          upVoteRatio,
        },
      }
    );
  }

  public async list(
    { start, limit, sortBy, search }: IActivityFilers,
    userId: string
  ) {
    const sortObj = {
      hot: { upVoteRatio: -1 },
      new: { date: -1 },
      top: { upVotes: -1 },
    };

    const findParams = {
      ...(search && { $text: { $search: search } }),
    };

    const activities = await this.activityModel
      .find(findParams)
      .populate({
        path: "userVote",
        match: {
          user: userId,
        },
        select: "type -activity",
      })
      .populate({
        path: "user",
        select: "nick email role",
      })
      .sort(sortObj[sortBy])
      .limit(limit)
      .skip(start);

    return activities;
  }

  public async details(activityId: string, userId: string) {
    const activity = await this.getActivityWithUserVote(activityId, userId);

    return activity;
  }
  public async add(
    activity: ICreateActivityService
  ): Promise<{ activity: IActivity }> {
    const newActivity: ICreateActivity = {
      user: activity.userId,
      text: activity.text,
      upVoteRatio: 0,
      upVotesCount: 0,
      downVotesCount: 0,
      votes: 0,
      date: new Date(),
      photo: activity.pictureUrl || undefined,
    };
    const result = await this.activityModel.create(newActivity);
    return { activity: result };
  }

  public async upVote(activityId: string, userId: string) {
    await this.addOrUpdateVote(activityId, userId, "up");
  }

  public async downVote(activityId: string, userId: string) {
    await this.addOrUpdateVote(activityId, userId, "down");
  }
}
