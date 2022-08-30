import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/_models/auth';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss'],
})
export class MainlayoutComponent implements OnInit {
  user: User | null = null;

  constructor(private authSerivce: AuthService) {}

  ngOnInit(): void {
    console.log('halo init?');
    this.authSerivce.currentUser$.subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });
  }
}
