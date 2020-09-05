import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() { }

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

  createUserStory(story){
    console.log(story);
    
    this._auth.postStory(story)
    .subscribe(res => {
      console.log(res);
    })
  }
}
