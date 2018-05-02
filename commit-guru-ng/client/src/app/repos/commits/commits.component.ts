import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../-services/store.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  commits: any[];

  constructor(private store: StoreService) {
    this.store.commits$.subscribe(commits => {

      if (commits) {
        this.commits = commits;
        
      }
    })
  }

  ngOnInit() {

    
  }

}
