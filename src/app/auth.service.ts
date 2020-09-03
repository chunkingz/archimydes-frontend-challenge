import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  url = `http://localhost:3000/api/v1/`;
  token:string;

  constructor(private _http: HttpClient, public jwtHelper: JwtHelperService) { }

  login(credentials) {
    return this._http.post(`${this.url}/signin`, 
    JSON.stringify(credentials)).pipe(
      map(
        (response) => {
          const {firstName, id, lastName, role, token}:any = response;
          console.log(JSON.parse(JSON.stringify(response)));
          let responseToken = JSON.parse(JSON.stringify(token));
          if(response && responseToken){
            localStorage.setItem('token', responseToken);
            return true;
          }
          return false;
    }))
  }


  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return this.jwtHelper.isTokenExpired()
  }

}
