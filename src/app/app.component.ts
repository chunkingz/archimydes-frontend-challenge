import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'archimydes-frontend';
  isloggedin:any;
  isAdminUser:boolean;
  username:string;
  private _loggedInSubscription: Subscription;

  constructor(private _auth:AuthService){
    this.refreshUserInfo();
  }

  ngOnInit() {
    this.triggerNavbarUpdate();
  }

  triggerNavbarUpdate() {
    this._loggedInSubscription = this._auth.getLoggedInUserSubscription().subscribe(() => {
      this.refreshUserInfo();
    })
  }

  refreshUserInfo () {
    this.isloggedin = this._auth.isLoggedIn();
    // this.getUserName();
    this.getUserRole();
  }

  ngOnDestroy() {
    this._loggedInSubscription.unsubscribe();
  }
  
  logout(){
    this.triggerNavbarUpdate();
    this._auth.logout(); 
  }

  
  // getUserName(){
  //   if(this._auth.username) {
  //     console.log(this._auth.username);
      
  //     this.username = this._auth.username;
  //   }
  // }

  getUserRole(){
    if(this._auth.userRole) {
      this._auth.userRole == 'user' ? this.isAdminUser = false : this.isAdminUser = true;
    }
  }

}
