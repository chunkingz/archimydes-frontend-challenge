import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CreateUserStoryComponent } from './components/create-user-story/create-user-story.component';
import { UserStoryListComponent } from './components/user-story-list/user-story-list.component';
import { AdminStoryListComponent } from './components/admin-story-list/admin-story-list.component';
import { AdminStoryReviewComponent } from './components/admin-story-review/admin-story-review.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export const tokenGetter = () => {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    NotfoundComponent,
    CreateUserStoryComponent,
    UserStoryListComponent,
    AdminStoryListComponent,
    AdminStoryReviewComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:3000"],
      }
    })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
