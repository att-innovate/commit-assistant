import { Component, OnInit } from '@angular/core';
import { StoreService, IRepo } from '../../-services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'recent-repos',
  templateUrl: './recent-repos.component.html',
  styleUrls: ['./recent-repos.component.css']
})
export class RecentReposComponent implements OnInit {
  repos: IRepo[] = [];

  constructor(private store: StoreService, private router: Router) 
  { 
    this.store.repos$.subscribe(repos => {
      if (repos) {
        this.repos = repos;
      }
    });
  }

  ngOnInit() {

    
    //this.repos = this.store.repos;

    this.store.getRepos();
  }


  onRepoClick(item: IRepo) {
    this.store.getRepoMterics(item.id);
    this.router.navigateByUrl('repo-overview');
  }

}
