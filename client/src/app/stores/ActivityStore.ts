import agent from "app/api/agent";
import {
  IActivity,
  IActivityDetails,
  IActivityFilters,
} from "app/models/Activity";
import { ICreateComment } from "app/models/Comment";
import { ConvertToParams } from "features/Activities/utils/ConvertToParams";
import { makeAutoObservable } from "mobx";

export default class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }

  activities: IActivity[] | null = [];
  activity: IActivityDetails | null = null;
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

  addComment = async (newComment: ICreateComment, activityId: string) => {
    try {
      await agent.Comment.add(activityId, newComment);
    } catch (err) {
      console.log("Problem adding comment" + err);
    }
  };
}
