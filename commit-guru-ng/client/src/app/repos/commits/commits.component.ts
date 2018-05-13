import { Component, OnInit } from '@angular/core';
import { StoreService, ICommit, ICommitInfo } from '../../-services/store.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  commits: ICommit[];
  commitInfo:ICommitInfo;
  selected;

  constructor(private store: StoreService) {
    this.store.commitInfo$.subscribe(commitInfo => {
      this.commitInfo = commitInfo;
    });

    this.store.commits$.subscribe(commits => {

      if (commits) {
        this.commits = commits;

      }
    })
  }

  ngOnInit() {


  }

  viewCommit(commit) {
    this.selected = this.selected == commit?null:commit;
    this.store.getCommitInfoById(commit.commit_hash);
  }

}
