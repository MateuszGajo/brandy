import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss'],
})
export class AuthlayoutComponent implements OnInit {
  currentRoute = '';
  constructor(public router: Router) {}

  ngOnInit(): void {
    // this.currentRoute = this.router.url;
  }
}
