import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate() {
    if(this._auth.isLoggedIn() && this._auth.userRole == 'Admin') {
      return true;
    }
    if(this._auth.isLoggedIn() && this._auth.userRole == 'user') {
      this._router.navigate(['user-story-list']);
      return false;
    }
    this._router.navigate(['login']);
    return false;
  }
}
