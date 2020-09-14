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
    {value: 'enhancement', viewValue: 'Enhancement'},
    {value: 'bugfix', viewValue: 'Bugfix'},
    {value: 'development', viewValue: 'Development'},
    {value: 'qa', viewValue: 'QA'}
  ];

  complexities: IComplexities[] = [
    {value: 'low', viewValue: 'Low'},
    {value: 'mid', viewValue: 'Mid'},
    {value: 'high', viewValue: 'High'}
  ];

  createUserStory(story){
    const { summary, description, type, complexity } = story;
    if(summary && description && type && complexity){
      this._auth.postStory(story).subscribe()
      this._router.navigate(['user-story-list']);
    } else {
      console.log('fill out the form');
    }
  }
}
