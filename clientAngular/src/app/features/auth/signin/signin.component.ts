import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Creds } from 'src/app/_models/auth';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  model: Creds = { email: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onModelChange() {
    console.log('on change');
    if (this.error) this.error = '';
  }

  login() {
    console.log('login?');
    this.authService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        const error = err.error;
        console.log(error);
        this.error = error;
      }
    );
  }
}
