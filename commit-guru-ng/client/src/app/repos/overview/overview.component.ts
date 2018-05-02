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
  data = {
    labels: ["Don't introduce bugs", "May Introduce bugs"],
    datasets: [
      {
        label: "My First dataset",
        data: [80, 20]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  totalCommits: number = 0;

  constructor(private store: StoreService) {
    this.store.repoMetrics$.subscribe(metrics => {
      if (metrics) {
        this.metrics = metrics;

        this.data.datasets[0].data = [(this.metrics.commit_count - this.metrics.commit_contains_bug_count), this.metrics.commit_contains_bug_count];

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
