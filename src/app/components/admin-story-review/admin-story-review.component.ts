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

@Component({
  selector: 'app-admin-story-review',
  templateUrl: './admin-story-review.component.html',
  styleUrls: ['./admin-story-review.component.css']
})

export class AdminStoryReviewComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  summary:string;
  description:string;
  type:string;
  complexity:string;
  estimatedHrs:number;
  cost:number;
  status?:string;

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
  
  storyID = localStorage.getItem('storyID');

  getStory(){
    if(this.storyID){
      this._auth.getSingleStory(this.storyID).subscribe(res => {
        this.summary = res['summary'];
        this.description = res['description'];
        this.type = res['type'];
        this.complexity = res['complexity'];
        this.estimatedHrs = res['estimatedHrs'];
        this.cost = res['cost'];
        this.status = res['status'] || 'pending';
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
