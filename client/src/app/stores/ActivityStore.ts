import agent from "app/api/agent";
import { IActivity, IActivityFilters } from "app/models/Activity";
import { ICreateComment } from "app/models/Comment";
import { IVote } from "app/models/Vote";
import { ConvertToParams } from "app/utils/ConvertToParams";
import { makeAutoObservable } from "mobx";

export default class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }

  activities: IActivity[] | null = [];
  activity: IActivity | null = null;
  filters: IActivityFilters = {
    sort: "hot",
    search: "",
  };

  setFilters = (filters: IActivityFilters) => {
    const newFilters = { ...this.filters, ...filters };
    this.filters = newFilters;

    this.loadActivities(newFilters);
  };

  loadActivities = async (filters: IActivityFilters = this.filters) => {
    const params = ConvertToParams(filters);
    console.log(params.toString());
    try {
      const { data } = await agent.Activity.list(params);
      this.activities = data;
    } catch (err) {
      console.log("Problem loading activites" + err);
    }
  };

  loadActivity = async (id: string) => {
    try {
      const { data } = await agent.Activity.details(id);
      this.activity = data;
    } catch (err) {
      console.log("Problem loading activites" + err);
    }
  };

  updateVoteActivity = (activity: IActivity, newVote: IVote) => {
    const previousVote = activity.userVote;
    if (newVote === "up") {
      if (previousVote == "up") {
        activity.upVotesCount--;
        activity.userVote = null;
        return activity;
      }

      if (previousVote === "down") {
        activity.downVotesCount--;
      }
      activity.userVote = "up";
      activity.upVotesCount++;
    } else if (newVote === "down") {
      if (previousVote == "down") {
        activity.downVotesCount--;
        activity.userVote = null;
        return activity;
      }

      if (previousVote === "up") {
        activity.upVotesCount--;
      }
      activity.userVote = "down";
      activity.downVotesCount++;
    }

    return activity;
  };

  updateVoteOnActivity = async (vote: IVote) => {
    if (!this.activity?._id) throw new Error("There is no activity");
    try {
      vote === "up" && (await agent.Activity.upvote(this.activity._id));
      vote === "down" && (await agent.Activity.downvote(this.activity._id));
      console.log({ ...this.activity }, vote);
      const newActivity = this.updateVoteActivity({ ...this.activity }, vote);
      this.activity = newActivity;
    } catch (err) {
      console.log("Problem upvoting activity" + err);
    }
  };

  updateVoteOnActivities = async (vote: IVote, activityId: string) => {
    const activity = this.activities?.find(
      (activity) => activity._id === activityId
    );
    if (!activity) throw new Error("There is noe activity");
    try {
      vote === "up" && (await agent.Activity.upvote(activity._id));
      vote === "down" && (await agent.Activity.downvote(activity._id));
      this.activities =
        this.activities?.map((item) => {
          if (item._id === activityId) {
            return this.updateVoteActivity({ ...activity }, vote);
          }
          return item;
        }) || [];
    } catch (err) {
      console.log("Problem upvoting activity" + err);
    }
  };

  createActivity = async (newActivity: FormData) => {
    try {
      await agent.Activity.create(newActivity);
    } catch (err) {
      console.log("Error has occured" + err);
    }
  };
}
