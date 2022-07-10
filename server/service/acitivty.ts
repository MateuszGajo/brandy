import {
  IActivity,
  ICreateActivity,
  ICreateActivityService,
} from "@/interfaces/IActivity";
import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class ActivityService {
  constructor(
    @Inject("activityModel") private activityModel: Models.UserModel,
    @Inject("logger") private logger: Logger
  ) {}

  public async list(
    start: number = 0,
    limit: number = 10,
    sort: "hot" | "new" | "top" = "hot"
  ) {
    const sortObj = {
      hot: () => {
        return { upVotesRatio: 1 };
      },
      new: () => {
        return { date: 1 };
      },
      top: () => {
        return { votes: 1 };
      },
    };

    return this.activityModel
      .find({})
      .sort(sortObj[sort as keyof typeof sortObj])
      .skip(start)
      .limit(limit);
  }

  public async add(
    activity: ICreateActivityService
  ): Promise<{ activity: IActivity }> {
    const newActivity: ICreateActivity = {
      userId: activity.userId,
      text: activity.text,
      upVoteRatio: 0,
      upVotes: 0,
      downVotes: 0,
      votes: 0,
      date: new Date(),
      photo: activity.pictureUrl || undefined,
    };
    const result = await this.activityModel.create(newActivity);
    return { activity: result };
  }

  public async like(id: string) {
    const activity: IActivity = await this.activityModel.findOne({ _id: id });
    // const isLiked = activity.
  }
}
