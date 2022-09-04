import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivitySort } from 'src/app/_models/activity';
import { Vote } from 'src/app/_models/vote';
import { ActivityService } from 'src/app/_services/activity.service';

@Component({
  selector: 'app-activitiestoolbar',
  templateUrl: './activitiestoolbar.component.html',
  styleUrls: ['./activitiestoolbar.component.scss'],
})
export class ActivitiestoolbarComponent implements OnInit {
  active: ActivitySort = 'hot';
  constructor(private activitySerivce: ActivityService) {}

  ngOnInit(): void {}

  changeActiveEl = (newActiveEl: ActivitySort) => {
    this.active = newActiveEl;
    this.activitySerivce.getActivities({ sort: newActiveEl });
  };
}
