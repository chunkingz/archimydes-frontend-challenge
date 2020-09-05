import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  invalidLogin: boolean;

  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }

  signIn(credentials){

    credentials.isAdmin == "" || credentials.isAdmin == false ? 
    credentials.isAdmin = false : 
    credentials.isAdmin = true;

    // console.log(credentials);

    this._auth.login(credentials)
    .subscribe(res => {
      if(res) this._router.navigate(['create-user-story']);
      if(!res) {
        this.invalidLogin = true;
        this._router.navigate(['login'])
      }
    })

  }

}
