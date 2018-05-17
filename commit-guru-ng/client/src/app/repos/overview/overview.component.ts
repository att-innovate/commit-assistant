import { Component, OnInit } from '@angular/core';
import { IMetrics, IMetric, StoreService } from '../../-services/store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  metrics: IMetrics;
  overItem: IMetric;

  type = 'doughnut';
  data:any;
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  totalCommits: number = 0;

  constructor(private store: StoreService) {
    this.store.repoMetrics$.subscribe(metrics => {
      if (metrics) {
        this.metrics = metrics;

        this.data = {
          labels: ["Don't introduce bugs", "May Introduce bugs"],
          datasets: [{
            data: [(this.metrics.commit_count - this.metrics.commit_contains_bug_count), this.metrics.commit_contains_bug_count],
            backgroundColor: ["#DFF0D9", "#F2DEDE"]
          }]
        }
      }
    })
  }

  ngOnInit() {

  }

  onOver(item: IMetric) {
    this.overItem = item;

  }

  onOut() {
    this.overItem = null;
  }
}
