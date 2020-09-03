import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface IUserStory {
  id: number;
  summary: string;
  description: string;
  type: string;
  complexity: string;
  time: string;
  cost: string;

}

const UserStoryData: IUserStory[] = [
  {id: 1, summary: 'summary1', description: 'description1', type: 'enhancement', complexity: 'Mid', time: 'time1', cost: '$10'},
  {id: 2, summary: 'summary2', description: 'description2', type: 'bugfix', complexity: 'High', time: 'time2', cost: '$20'},
  {id: 3, summary: 'summary3', description: 'description3', type: 'development', complexity: 'Low', time: 'time3', cost: '$30'},
  {id: 4, summary: 'summary4', description: 'description4', type: 'development', complexity: 'Mid', time: 'time4', cost: '$40'},

];

@Component({
  selector: 'app-user-story-list',
  templateUrl: './user-story-list.component.html',
  styleUrls: ['./user-story-list.component.css']
})
export class UserStoryListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['id', 'summary', 'description', 'type', 'complexity', 'time', 'cost'];
  dataSource = new MatTableDataSource(UserStoryData);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
