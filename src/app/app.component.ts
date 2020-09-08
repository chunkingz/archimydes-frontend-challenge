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
  isAdminUser:boolean;
  username:string;

  constructor(private _auth:AuthService){
    this.isloggedin = this._auth.isLoggedIn();
    // this.getUserName();
    this.getUserRole();
  }
  
  logout(){ this._auth.logout(); }

  
  // getUserName(){
  //   if(this._auth.username) {
  //     console.log(this._auth.username);
      
  //     this.username = this._auth.username;
  //   }
  // }

  getUserRole(){
    if(this._auth.userRole) {
      console.log(this._auth.userRole);
      this._auth.userRole == 'user' ? this.isAdminUser = false : this.isAdminUser = true;
    }
  }

}
