import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoreService, IRepo } from '../-services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  repos: IRepo[] = [];

  constructor(private router:Router ,private store: StoreService) {
    
  }

  ngOnInit() {
    //this.repos = this.store.repos;
    this.store.repos$.subscribe(repos => {
      if (repos) {
        this.repos = repos;
      }
    });
    
    this.store.getRepos();
  }

  onRepoClick(item:IRepo) {
    this.store.getRepoMterics(item.id);
    this.router.navigateByUrl('repo-overview');
  }

}
