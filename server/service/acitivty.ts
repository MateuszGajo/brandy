import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class ActivityService {
  constructor(
    @Inject("activityModel") private activityModel: Models.UserModel,
    @Inject("logger") private logger: Logger
  ) {}

  public async list(
    start: number,
    number: number,
    sort: "hot" | "new" | "top"
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
      .limit(number);
  }
}
