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
    
    return localStorage.getItem('token')
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
        (response) => {
          const {firstName, id, lastName, role, token}:any = response;
          // console.log(firstName, lastName, role, token);
          
          
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
    const bearerToken:string = this.getLoggedInUserToken();    
    return this._http.get(`${this._url}/stories`, 
    {headers: new HttpHeaders({
      'X-Auth-Token': bearerToken      
    })}
    )
  }


  /**
   * Create a user story
   * @returns user stories
   * @param {object} userStory - the users submitted story
   * @var {object} story - the user story object 
   */
  postStory(userStory){
    const bearerToken:string = this.getLoggedInUserToken();
    return this._http.post(`${this._url}/stories`, JSON.stringify(userStory), 
    {headers: new HttpHeaders({
      'X-Auth-Token': bearerToken     
    })})
  }


  /**
   * Get the selected Story that belongs to the current User
   * @returns user stories
   */
  getSingleStory(){
    return this._http.get(`${this._url}/stories/{id}`)
  }


  /**
   * Update a user Story
   * @returns user stories
   */
  updateSingleStory(story){
    return this._http.patch(`${this._url}/stories/{id}/{status}`, 
    JSON.stringify(story)).pipe(
      map(
        (response) => {
          console.log(response)
        }
      ))
  }
}

