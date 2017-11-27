import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {

  public isCollapsed = true;

  constructor(public auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
