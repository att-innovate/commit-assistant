import { Component, OnInit, Input } from '@angular/core';
import { ICommitInfoCat } from '../../../-services/store.service';

@Component({
  selector: 'commit-info-cat',
  templateUrl: './commit-info-cat.component.html',
  styleUrls: ['./commit-info-cat.component.css']
})
export class CommitInfoCatComponent implements OnInit {
  @Input() data:ICommitInfoCat[];
  @Input() title:string;
  constructor() { }

  ngOnInit() {

  }

}
