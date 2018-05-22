import { Component, OnInit } from '@angular/core';
import { StoreService, ICommit, ICommitInfo } from '../../-services/store.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  commits: ICommit[];
  totalCommits: number;
  commitInfo: ICommitInfo;
  selected;
  pages: number[];
  showPages: number[];
  onPage: number = 0;
  metrics;
  allPages
  constructor(private store: StoreService) {

    this.store.repoMetrics$.subscribe(metrics => {
      this.metrics = metrics;
    })
    this.store.commitInfo$.subscribe(commitInfo => {

      this.commitInfo = commitInfo;
    });

    this.store.commits$.subscribe(commitsData => {

      if (commitsData) {
        this.commits = commitsData.commits;
        this.totalCommits = commitsData.numOfCommits;
        /* this.pages = [];

        let total = Math.floor(this.totalCommits / 13);

        for (let i = 0; i < total; i++) {
          this.pages.push(i + 1);

        } */
        this.allPages = Math.floor(this.totalCommits / 13);
        this.handleShowPagenation();
      }
    })
  }

  ngOnInit() {


  }

  viewCommit(commit) {
    this.selected = this.selected == commit ? null : commit;
    this.store.getCommitInfoById(commit.commit_hash);
  }

  handleShowPagenation() {
    this.showPages = [];
    
    let total = Math.min(15, this.allPages);
    let from = 0;//Math.max(this.onPage - 5, 0);
    let to = this.allPages;//Math.min(from + total, this.allPages);

    for (let i = from; i < to; i++) {
      this.showPages.push(i);
    }

    //debugger;
  }

  pageClick(num) {
    this.onPage = num;
    this.handleShowPagenation();


    this.store.getCommitsByRepo(this.metrics.id, this.onPage);
  }

  onpreviousClick() {
    if (this.onPage) {
      this.onPage--;
      this.handleShowPagenation();
      this.store.getCommitsByRepo(this.metrics.id, this.onPage);
    }

  }

  onpnextClick() {
    if (this.onPage < (this.allPages-1)) {
      this.onPage++;
      this.handleShowPagenation();
      this.store.getCommitsByRepo(this.metrics.id, this.onPage);
    }
  }
}
