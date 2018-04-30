import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AboutComponent } from './about/about.component';
import { ReposComponent } from './repos/repos.component';
import { RouterModule, Route } from '@angular/router';
import { RecentReposComponent } from './home/recent-repos/recent-repos.component';
import { StoreService } from './-services/store.service';
import { RepoComponent } from './repos/repo/repo.component';

const appRoutes: Route[] = [

  { path: '',  redirectTo: '/home', pathMatch: 'full' },
  { path: "about", component: AboutComponent },
  { path: "home", component: HomeComponent },
  { path: "repos", component: ReposComponent },
  { path: "repo", component: RepoComponent },
  

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AboutComponent,
    ReposComponent,
    RecentReposComponent,
    RepoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true}),
    // AngularFontAwesomeModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
