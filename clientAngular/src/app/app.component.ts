import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clientAngular';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.verify().subscribe();
  }
}
