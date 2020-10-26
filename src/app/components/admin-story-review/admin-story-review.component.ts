import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


interface ITypes {
  value: string;
  viewValue: string;
}

interface IComplexities {
  value: string;
  viewValue: string;
}


interface IStory {
  summary:string;
  description:string;
  type:string;
  complexity:string;
  estimatedHrs:number;
  cost:number;
  status?:string;
}


@Component({
  selector: 'admin-story-review',
  templateUrl: './admin-story-review.component.html',
  styleUrls: ['./admin-story-review.component.css']
})

export class AdminStoryReviewComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }


  ngOnInit(): void {
    this.getStory();
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
  
  story: IStory;

  storyID = localStorage.getItem('storyID');

  getStory(){
    if(this.storyID){
      this._auth.getSingleStory(this.storyID).subscribe( (res:IStory) => {
        this.story = res;
      })
    }

  }

  accept(){
    this._auth.updateSingleStory(parseInt(this.storyID), 'accepted').subscribe(res => {
      if(res) this.reviewAction();
    })
  }

  reject(){
    this._auth.updateSingleStory(parseInt(this.storyID), 'rejected').subscribe(res => {
      if(res) this.reviewAction();
    });
  }

  reviewAction(){
    localStorage.removeItem('storyID');
    this._router.navigate(['admin-story-list']);
  }

}
