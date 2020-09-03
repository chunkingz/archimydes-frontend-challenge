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
  selector: 'app-create-user-story',
  templateUrl: './create-user-story.component.html',
  styleUrls: ['./create-user-story.component.css']
})
export class CreateUserStoryComponent implements OnInit {

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
