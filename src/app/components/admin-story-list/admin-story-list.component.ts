import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'admin-story-list',
  templateUrl: './admin-story-list.component.html',
  styleUrls: ['./admin-story-list.component.css']
})

export class AdminStoryListComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this.getUserStories();
  }

  invalidLogin: boolean;

  id: number;

  userStories:any;

  displayedColumns: string[] = ['id', 'summary', 'description', 'type', 'complexity', 'estimatedHrs', 'cost'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getSingleStory(singleStory){
    this._auth.getSingleStory(singleStory.id).subscribe(res => {
      this.id = res['id'];
      localStorage.setItem('storyID', this.id.toString());
      this._router.navigate(['admin-story-review'])
    })
  }

  getUserStories(){
    const isUserLoggedIn = this._auth.isLoggedIn();
    
    if(isUserLoggedIn) {
      this._auth.getStories().subscribe(res => {
        this.userStories = res;        
        this.userStories.sort = this.sort;
      })
    }
    if(!isUserLoggedIn) {
      this.invalidLogin = true;
      this._router.navigate(['login'])
    }
  }

  doFilter = (value: string) => {    
    return this.userStories.filter = value.trim().toLocaleLowerCase();
  }

}
