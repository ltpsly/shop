import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {

  public isCollapsed = true;


  constructor(public afAuth: AngularFireAuth) { }

  logout() {
    this.afAuth.auth.signOut();
  }
}
