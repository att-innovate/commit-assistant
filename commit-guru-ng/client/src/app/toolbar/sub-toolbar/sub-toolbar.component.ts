import { Component, OnInit } from '@angular/core';
import { StoreService, IMetrics } from '../../-services/store.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sub-toolbar',
  templateUrl: './sub-toolbar.component.html',
  styleUrls: ['./sub-toolbar.component.css']
})
export class SubToolbarComponent implements OnInit {
  metrics:IMetrics;

  constructor(private router:Router,private route:ActivatedRoute, private store: StoreService) {
    this.store.repoMetrics$.subscribe(metrics => {
      this.metrics = metrics
    })

    
  }

  ngOnInit() {
  }

  onCommitsClick() {
    this.store.getCommitsByRepo(this.metrics.id);
  }
}
