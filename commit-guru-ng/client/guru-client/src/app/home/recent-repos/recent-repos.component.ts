import { Component, OnInit } from '@angular/core';
import { StoreService, IRepo } from '../../-services/store.service';

@Component({
  selector: 'recent-repos',
  templateUrl: './recent-repos.component.html',
  styleUrls: ['./recent-repos.component.css']
})
export class RecentReposComponent implements OnInit {
  repos: IRepo[] = [];

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.repos = this.store.repos;
  }

}
