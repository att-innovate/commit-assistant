import { Component, OnInit, Input } from '@angular/core';
import { ICommitDetails } from '../../../-services/store.service';

@Component({
  selector: 'commit-info-details',
  templateUrl: './commit-info-details.component.html',
  styleUrls: ['./commit-info-details.component.css']
})
export class CommitInfoDetailsComponent implements OnInit {
  @Input() data:ICommitDetails;
  
  constructor() { }

  ngOnInit() {
  }

}
