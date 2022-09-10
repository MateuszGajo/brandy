import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity, ActivityFilters } from '../_models/activity';
import { Vote } from '../_models/vote';
import { formatActivityDate } from '../_utils/date';
import { convertToParams } from '../_utils/params';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  onActivitesGetData: EventEmitter<any> = new EventEmitter();
  onActivityGetData: EventEmitter<any> = new EventEmitter();
  activityParams: ActivityFilters = {};
  activities: Activity[] = [];
  activity: Activity | null = null;

  constructor(
    private HttpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private updateVoteActivity = (activity: Activity, newVote: Vote) => {
    const previousVote = activity.userVote;
    if (newVote === 'up') {
      if (previousVote == 'up') {
        activity.upVotesCount--;
        activity.userVote = null;
        return activity;
      }

      if (previousVote === 'down') {
        activity.downVotesCount--;
      }
      activity.userVote = 'up';
      activity.upVotesCount++;
    } else if (newVote === 'down') {
      if (previousVote == 'down') {
        activity.downVotesCount--;
        activity.userVote = null;
        return activity;
      }

      if (previousVote === 'up') {
        activity.upVotesCount--;
      }
      activity.userVote = 'down';
      activity.downVotesCount++;
    }

    return activity;
  };

  updateVoteOnActivities = async (vote: Vote, activityId: string) => {
    const activity = this.activities?.find(
      (activity) => activity._id === activityId
    );
    if (!activity) throw new Error('There is noe activity');
    try {
      vote === 'up' &&
        (await this.HttpClient.put(
          `activity/${activityId}/upvote`,
          {}
        ).subscribe({}));
      vote === 'down' &&
        (await this.HttpClient.put(
          `activity/${activityId}/downvote`,
          {}
        ).subscribe({}));
      const newActivities =
        this.activities?.map((item) => {
          if (item._id === activityId) {
            return this.updateVoteActivity({ ...activity }, vote);
          }
          return item;
        }) || [];
      this.activities = newActivities;
      this.onActivitesGetData.emit(newActivities);
    } catch (err) {
      console.log('Problem upvoting activity' + err);
    }
  };

  updateVoteOnActivity = async (vote: Vote) => {
    if (!this.activity?._id) throw new Error('There is no activity');
    try {
      vote === 'up' &&
        (await this.HttpClient.put(
          `activity/${this.activity._id}/upvote`,
          {}
        ).subscribe({}));
      vote === 'down' &&
        (await this.HttpClient.put(
          `activity/${this.activity._id}/downvote`,
          {}
        ).subscribe({}));
      const newActivity = this.updateVoteActivity({ ...this.activity }, vote);
      this.activity = newActivity;
      this.onActivityGetData.emit(newActivity);
    } catch (err) {
      console.log('Problem upvoting activity' + err);
    }
  };

  getActivities = (filters: ActivityFilters) => {
    const params = {
      ...this.activityParams,
      ...filters,
    };

    this.activityParams = params;

    this.HttpClient.get<Activity[]>('activity', {
      params,
    }).subscribe({
      next: (activities) => {
        const activitesWithFormattedDate = activities.map((item) => ({
          ...item,
          dateFormatted: formatActivityDate(new Date(item.date)),
        }));
        if (activities) {
          this.onActivitesGetData.emit(activitesWithFormattedDate);
          this.activities = activities;
        }
      },
    });
  };

  getActivity = (id: string) => {
    this.HttpClient.get<Activity>(`activity/${id}`).subscribe({
      next: (activity) => {
        const activityWithFormattedDate = {
          ...activity,
          dateFormatted: formatActivityDate(new Date(activity.date)),
        };
        if (activity) {
          this.onActivityGetData.emit(activityWithFormattedDate);
          this.activity = activity;
        }
      },
    });
  };
}
