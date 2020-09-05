import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'archimydes-frontend';
  isloggedin:any;

  constructor(private _auth:AuthService){
    this.isloggedin = this._auth.isLoggedIn();
  }
  
  logout(){ this._auth.logout(); }

}
