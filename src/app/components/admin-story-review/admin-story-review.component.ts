import { Component, OnInit } from '@angular/core';


interface ITypes {
  value: string;
  viewValue: string;
}

interface IComplexities {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-story-review',
  templateUrl: './admin-story-review.component.html',
  styleUrls: ['./admin-story-review.component.css']
})
export class AdminStoryReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  types: ITypes[] = [
    {value: 'enhancement', viewValue: 'enhancement'},
    {value: 'bugfix', viewValue: 'bugfix'},
    {value: 'development', viewValue: 'development'},
    {value: 'QA', viewValue: 'QA'}
  ];

  complexities: IComplexities[] = [
    {value: 'Low', viewValue: 'Low'},
    {value: 'Mid', viewValue: 'Mid'},
    {value: 'High', viewValue: 'High'}
  ];

}
