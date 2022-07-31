import APIError from "@/api/Error/APIError";
import {
  IActivity,
  IActivityFilers,
  ICreateActivity,
  ICreateActivityService,
} from "@/interfaces/IActivity";
import {
  ICreateActivityComment,
  ICreateActivityCommentService,
} from "@/interfaces/IComments";
import { ObjectId } from "mongodb";
import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class ActivityService {
  constructor(
    @Inject("activityModel") private activityModel: Models.ActivityModel,
    @Inject("logger") private logger: Logger
  ) {}

  public async list(
    { start, limit, sortBy, search }: IActivityFilers,
    userId: string
  ) {
    const sortObj = {
      hot: { upVoteRatio: -1 },
      new: { date: -1 },
      top: { upVotes: -1 },
    };

    const activities = await this.activityModel.aggregate([
      {
        $match: {
          ...(search
            ? { $text: { $search: search, $caseSensitive: false } }
            : {}),
        },
      },
      {
        $sort: sortObj[sortBy],
      },
      { $skip: start },
      { $limit: limit },
      {
        $lookup: {
          from: "votes",
          let: {
            activity_id: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$activity", "$$activity_id"],
                    },
                    {
                      $eq: ["$user", new ObjectId(userId)],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                type: 1,
              },
            },
          ],
          as: "voteObj",
        },
      },
      {
        $unwind: {
          path: "$voteObj",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $set: {
          yourVote: {
            $ifNull: ["$voteObj.type", null],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          let: { user_id: "$user" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
            { $project: { nick: 1, email: 1, role: 1 } },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          voteObj: 0,
        },
      },
    ]);

    return activities;
  }

  public async details(activityId: string, userId: string) {
    const activity = await this.activityModel
      .find(
        { _id: new ObjectId(activityId) },

        {
          upVotesCount: { $size: "$upVotes" },
          text: 1,
          photo: 1,
          downVotesCount: { $size: "$downVotes" },
          date: 1,
          upVoteRatio: 1,
          votes: 1,
          yourVote: {
            $switch: {
              branches: [
                {
                  case: {
                    $gt: [
                      { $size: { $setIntersection: ["$upVotes", [userId]] } },
                      0,
                    ],
                  },
                  then: "upvote",
                },
                {
                  case: {
                    $gt: [
                      {
                        $size: { $setIntersection: ["$downVotes", [userId]] },
                      },
                      0,
                    ],
                  },
                  then: "downvote",
                },
              ],
              default: null,
            },
          },
          commentCount: { $size: "$comments" },
          comments: {
            text: 1,
            user: 1,
            date: 1,
          },
        }
      )
      .populate({
        path: "user",
        model: "User",
        select: "nick email role",
      })
      .populate({
        path: "comments",
        populate: { path: "user", model: "User", select: "nick email role" },
      });

    console.log(activity);
    return activity[0];
  }
  public async add(
    activity: ICreateActivityService
  ): Promise<{ activity: IActivity }> {
    const newActivity: ICreateActivity = {
      user: activity.userId,
      text: activity.text,
      upVoteRatio: 0,
      upVotes: [],
      downVotes: [],
      votes: 0,
      date: new Date(),
      photo: activity.pictureUrl || undefined,
    };
    const result = await this.activityModel.create(newActivity);
    return { activity: result };
  }

  public async upVote(id: string, userId: string) {
    const activities = await this.activityModel
      .aggregate()
      .match({ _id: new ObjectId(id) })
      .project({
        upVote: {
          $cond: [
            {
              $gt: [{ $size: { $setIntersection: ["$upVotes", [userId]] } }, 0],
            },
            true,
            false,
          ],
        },
        downVote: {
          $cond: [
            {
              $gt: [
                { $size: { $setIntersection: ["$downVotes", [userId]] } },
                0,
              ],
            },
            true,
            false,
          ],
        },
        upVoteLength: { $size: "$upVotes" },
        downVotesLength: { $size: "$downVotes" },
      });
    const activity = activities[0];
    console.log(typeof activity.upVoteLength);

    if (!activity) throw new APIError("Activity doesn't exist", 404);

    if (activity.upVote) {
      const upVotes = activity.upVoteLength - 1;
      const downVotes = activity.downVotesLength;
      const allVotes = upVotes + downVotes;
      const upVoteRatio = upVotes / allVotes || 0;
      await this.activityModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $pull: { upVotes: userId },
          $set: { upVoteRatio },
        }
      );
      return;
    }

    const upVotes = activity.upVoteLength + 1;

    if (activity.downVote) {
      const downVotes = activity.downVotesLength - 1;
      const allVotes = upVotes + downVotes;
      const upVoteRatio = upVotes / allVotes;
      await this.activityModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $pull: { downVotes: userId },
          $set: { upVoteRatio },
          $push: { upVotes: userId },
        }
      );
      return;
    }
    const downVotes = activity.downVotesLength;
    const allVotes = upVotes + downVotes;
    const upVoteRatio = upVotes / allVotes;

    await this.activityModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { upVoteRatio }, $push: { upVotes: userId } }
    );
  }

  public async downVote(id: string, userId: string) {
    const activities = await this.activityModel
      .aggregate()
      .match({ _id: new ObjectId(id) })
      .project({
        upVote: {
          $cond: [
            {
              $gt: [{ $size: { $setIntersection: ["$upVotes", [userId]] } }, 0],
            },
            true,
            false,
          ],
        },
        downVote: {
          $cond: [
            {
              $gt: [
                { $size: { $setIntersection: ["$downVotes", [userId]] } },
                0,
              ],
            },
            true,
            false,
          ],
        },
        upVoteLength: { $size: "$upVotes" },
        downVotesLength: { $size: "$downVotes" },
      });
    const activity = activities[0];

    if (!activity) throw new APIError("Activity doesn't exist", 404);

    if (activity.downVote) {
      const downVotes = activity.downVotesLength - 1;
      const upVotes = activity.upVoteLength;
      const allVotes = upVotes + downVotes;
      const upVoteRatio = upVotes / allVotes || 0;
      await this.activityModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $pull: { downVotes: userId },
          $set: { upVoteRatio },
        }
      );
      return;
    }

    const downVotes = activity.downVotesLength + 1;

    if (activity.upVote) {
      const upVotes = activity.upVoteLength - 1;
      const allVotes = upVotes + downVotes;
      const upVoteRatio = upVotes / allVotes;
      await this.activityModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $pull: { upVotes: userId },
          $set: { upVoteRatio },
          $push: { downVotes: userId },
        }
      );
      return;
    }
    const upVotes = activity.upVoteLength;
    const allVotes = upVotes + downVotes;
    const upVoteRatio = upVotes / allVotes;

    await this.activityModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { upVoteRatio }, $push: { downVotes: userId } }
    );
  }

  public async addComment(
    comment: ICreateActivityCommentService
  ): Promise<void> {
    const newComment: ICreateActivityComment = {
      activity: comment.activityId,
      user: comment.userId,
      text: comment.text,
      date: new Date(),
    };
    console.log("new comment");
    console.log(newComment);

    await this.activityModel.updateOne(
      { _id: comment.activityId },
      { $push: { comments: { $each: [newComment], $position: 0 } } }
    );
  }
}
