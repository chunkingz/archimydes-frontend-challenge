import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CreateUserStoryComponent } from './components/create-user-story/create-user-story.component';
import { UserStoryListComponent } from './components/user-story-list/user-story-list.component';
import { AdminStoryListComponent } from './components/admin-story-list/admin-story-list.component';
import { AdminStoryReviewComponent } from './components/admin-story-review/admin-story-review.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-user-story', component: CreateUserStoryComponent },
  { path: 'user-story-list', component: UserStoryListComponent },
  { path: 'admin-story-list', component: AdminStoryListComponent },
  { path: 'admin-story-review', component: AdminStoryReviewComponent },

  {path: '**', component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
