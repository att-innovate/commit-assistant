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
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular2-chartjs';
import { SubToolbarComponent } from './toolbar/sub-toolbar/sub-toolbar.component';
import { OverviewComponent } from './repos/overview/overview.component';
import { CommitsComponent } from './repos/commits/commits.component';
import { OptionsComponent } from './repos/options/options.component';
import { CommitInfoCatComponent } from './repos/commits/commit-info-cat/commit-info-cat.component';

const appRoutes: Route[] = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "about", component: AboutComponent },
  { path: "home", component: HomeComponent },
  { path: "repos", component: ReposComponent },
  { path: "repo-overview", component: OverviewComponent },
  { path: "repo-commits", component: CommitsComponent },
  { path: "repo-options", component: OptionsComponent },


]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AboutComponent,
    ReposComponent,
    RecentReposComponent,
    RepoComponent,
    SubToolbarComponent,
    OverviewComponent,
    CommitsComponent,
    OptionsComponent,
    CommitInfoCatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    ChartModule
    // AngularFontAwesomeModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
