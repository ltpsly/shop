import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  public isCollapsed = true;
  public isAdmin;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.auth.appUser;
  }

  logout() {
    this.auth.logout();
  }
}
