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
  onPage: number = 0;
  metrics;

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
        this.pages = [];

        let total = Math.floor(this.totalCommits / 13);

        for (let i = 0; i < total; i++) {
          this.pages.push(i + 1);

        }
      }
    })
  }

  ngOnInit() {


  }

  viewCommit(commit) {
    this.selected = this.selected == commit ? null : commit;
    this.store.getCommitInfoById(commit.commit_hash);
  }

  pageClick(num) {

    this.onPage = num-1;
    this.store.getCommitsByRepo(this.metrics.id, num);
  }
}
