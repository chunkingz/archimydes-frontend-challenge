import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-story-list',
  templateUrl: './admin-story-list.component.html',
  styleUrls: ['./admin-story-list.component.css']
})

export class AdminStoryListComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this.getUserStories();
  }


  invalidLogin: boolean;

  userStories:any;

  displayedColumns: string[] = ['id', 'summary', 'description', 'type', 'complexity', 'estimatedHrs', 'cost'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
