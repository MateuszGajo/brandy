import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from 'src/app/_models/auth';
import { ActivityService } from 'src/app/_services/activity.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss'],
})
export class MainlayoutComponent implements OnInit {
  user: User | null = null;
  search = (value: string) => {};
  isDashboard = false;

  constructor(
    private authSerivce: AuthService,
    private activityService: ActivityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pathname = this.router.url;
    this.isDashboard = pathname === '/';
    this.authSerivce.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });

    const searchThrottle = (ms: number) => {
      let timeout: any = null;

      return (value: string) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.activityService.getActivities({});
        }, ms);
      };
    };
    this.search = searchThrottle(500);
  }

  onInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;

    const value = input.value;
    this.search(value);
  };

  logout = () => {
    this.authSerivce.logout();
  };
}
