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
  onGetData: EventEmitter<any> = new EventEmitter();
  activityParams: ActivityFilters = {};
  activities: Activity[] = [];

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
      this.onGetData.emit(newActivities);
    } catch (err) {
      console.log('Problem upvoting activity' + err);
    }
  };

  changeVote = (vote: Vote) => {};

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
          this.onGetData.emit(activitesWithFormattedDate);
          this.activities = activities;
        }
      },
    });
    this.onGetData.emit('we are emitting' + Math.random());
  };
}
