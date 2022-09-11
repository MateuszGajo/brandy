import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Activity } from 'src/app/_models/activity';
import { User } from 'src/app/_models/auth';
import { Vote } from 'src/app/_models/vote';
import { ActivityService } from 'src/app/_services/activity.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-activitieslist',
  templateUrl: './activitieslist.component.html',
  styleUrls: ['./activitieslist.component.scss'],
})
export class ActivitiesListComponent implements OnInit {
  activities: Activity[] = [];
  user: User | null = null;
  constructor(
    private activitySerivce: ActivityService,
    private authSerivce: AuthService
  ) {
    this.activitySerivce.onActivitesGetData.subscribe((data) => {
      this.activities = data;
    });
  }

  ngOnInit(): void {
    this.activitySerivce.getActivities({});
    this.authSerivce.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  changeVote = (vote: Vote, activityId: string) => {
    if (!this.user) return;
    this.activitySerivce.updateVoteOnActivities(vote, activityId);
  };
}
