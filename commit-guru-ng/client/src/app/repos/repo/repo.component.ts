import { Component, OnInit } from '@angular/core';
import { StoreService, IMetrics, IMetric } from '../../-services/store.service';

@Component({
  selector: 'repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  metrics: IMetrics;
  overItem: IMetric;


  type = 'doughnut';
  data = {
    labels: ["May Introduce bugs", "Don't introduce bugs"],
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



  constructor(private store: StoreService) {
    this.store.repoMetrics$.subscribe(metrics => {
      if (metrics) {
        this.metrics = metrics;
        //this.metrics.metricByRepo
        /* let keys = Object.keys(this.metrics);
        let values = Object.values(this.metrics);

        this.arr = keys.map((a,i)=>{return {key:a,value:values[i]}}); */
        this.data.datasets[0].data = [this.metrics.commit_contains_bug_count, this.metrics.commit_contains]
      }
    })
  }

  ngOnInit() {

  }

  onOver(item:IMetric) {
    this.overItem = item;

  }

  onOut() {
    this.overItem = null;
  }


}
