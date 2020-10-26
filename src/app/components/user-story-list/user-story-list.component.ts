import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-story-list',
  templateUrl: './user-story-list.component.html',
  styleUrls: ['./user-story-list.component.css']
})


export class UserStoryListComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    const isUserLoggedIn = this._auth.isLoggedIn();
    if(!isUserLoggedIn) this._router.navigate(['login'])
    if(isUserLoggedIn) this.getUserStories();
  }

  userStories:any;

  displayedColumns: string[] = ['id', 'summary', 'description', 'type', 'complexity', 'estimatedHrs', 'cost'];


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getUserStories(){
      this._auth.getStories().subscribe(res => {
        this.userStories = res;
        this.userStories.sort = this.sort;
      })    
  }

  doFilter = (value: string) => {    
    return this.userStories.filter = value.trim().toLocaleLowerCase();
  }

}
