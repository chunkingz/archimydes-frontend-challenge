import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private _url = `http://localhost:3000/api/v1`;
  token:string;
  username:string;
  userRole:string;

  constructor(
    private _http: HttpClient, 
    public jwtHelper: JwtHelperService, 
    private _router: Router
    ) { }


  /**
   * Get current logged in users token
   * @returns a bearer token
   */
  getLoggedInUserToken():string{
    const userToken = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(userToken);
    // console.log(decodedToken);
    const {firstName, id, lastName, role, token}:any = decodedToken;
    this.username = `${firstName} ${lastName}`;
    this.userRole = role;
    
    return userToken;
  }

  /**
   * Get Headers
   * @returns a header for auth
   */
  getHeaders(){
    const userToken = localStorage.getItem('token');
    return userToken ? new HttpHeaders().set('Authorization', userToken) : null;
  }


  /**
   * Logs the user in
   * @returns an observable to be subscribed to.
   * @param {object} credentials - the users submitted credentials
   */
  login(credentials) {
    
    return this._http.post(`${this._url}/signin`, 
    JSON.stringify(credentials)).pipe(
      map(
        response => {
          const {token}:any = response;
          let responseToken = JSON.parse(JSON.stringify(token));
          if(response && responseToken){
            localStorage.setItem('token', responseToken);
            return true;
          }
          return false;
    }))
  }


  /**
   * Logs the user out
   */
  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['login'])
  }


  /**
   * Checks if the user is logged in
   * @returns a truthy value if the users token is expired
   */
  isLoggedIn():boolean {
    try{
      // check if there's a valid token and also if the token is not expired => true
      if(this.getLoggedInUserToken() && !this.jwtHelper.isTokenExpired()) {
        return true;
      }
      // if there's no valid token OR if the token is expired => return false
      if(!this.getLoggedInUserToken() || this.jwtHelper.isTokenExpired()){
        return false;
      }
    } catch(e){
      this._router.navigate(['login'])
      return false;
    }
  }


  /**
   * User: Get all stories that belongs to the current User
   * Admin: Get all stories
   * @returns user stories
   */
  getStories(){
    if(this.isLoggedIn()){ 
      return this._http.get(
        `${this._url}/stories`, { headers: this.getHeaders() }
      )
    }
  }

  
  /**
   * Get a selected Story
   * @returns a single user story
   */
  getSingleStory(story){
    if(this.isLoggedIn()){ 
      return this._http.get(
        `${this._url}/stories/${story}`, { headers: this.getHeaders() }
        )
    }
  }


  /**
   * Create a user story
   * @returns user stories
   * @param {object} userStory - the users submitted story
   */
  postStory(story){
    if(this.isLoggedIn()){       
      return this._http.post(
        `${this._url}/stories`, story, {headers: this.getHeaders()}
      )
    }
  }


  /**
   * Update a user Story
   * @returns user stories
   */
  updateSingleStory(story:number, status:string){
    
    if(this.isLoggedIn()){       
      return this._http.put(
        `${this._url}/stories/${story}/${status}`, JSON.stringify(story), {headers: this.getHeaders()}
      ).pipe(
        map(res => {
          if(res) return true;
        })
      )
    }
  }
}

