import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpFormData } from 'src/app/_models/auth';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  model: SignUpFormData = {
    email: '',
    password: '',
    nick: '',
    confirmPassword: '',
  };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onModelChange() {
    if (this.error) this.error = '';
  }

  register() {
    this.authService.register(this.model).subscribe({
      next: (response) => {
        // this.router.navigateByUrl('/');
      },
      error: (err) => {
        const error = err.error;
        console.log(error);
        this.error = error;
      },
    });
  }
}
