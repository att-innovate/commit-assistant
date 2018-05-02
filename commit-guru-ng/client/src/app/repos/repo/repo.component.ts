import { Component, OnInit } from '@angular/core';
import { StoreService, IMetrics, IMetric } from '../../-services/store.service';

const alpha = 1;
@Component({
  selector: 'repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  backgroundColors = [
    `rgba(19,149,186,${alpha})`, `rgba(192,46,29,${alpha})`, `rgba(236,170,56,${alpha})`,
    `rgba(17,120,153,${alpha})`, `rgba(217,78,31,${alpha})`, `rgba(235,200,68,${alpha})`,
    `rgba(15,91,120,${alpha})`, `rgba(239,139,44,${alpha})`, `rgba(162,184,108,${alpha})`,
    `rgba(13,60,85),${alpha})`, `rgba(241,108,32,${alpha})`, `rgba(92,167,147,${alpha})`,

    `rgba(19,149,186,${alpha})`, `rgba(192,46,29,${alpha})`, `rgba(236,170,56,${alpha})`,
    `rgba(17,120,153,${alpha})`, `rgba(217,78,31,${alpha})`, `rgba(235,200,68,${alpha})`,
    `rgba(15,91,120,${alpha})`, `rgba(239,139,44,${alpha})`, `rgba(162,184,108,${alpha})`,
    `rgba(13,60,85),${alpha})`, `rgba(241,108,32,${alpha})`, `rgba(92,167,147,${alpha})`,

    `rgba(19,149,186,${alpha})`, `rgba(192,46,29,${alpha})`, `rgba(236,170,56,${alpha})`,
    `rgba(17,120,153,${alpha})`, `rgba(217,78,31,${alpha})`, `rgba(235,200,68,${alpha})`,
    `rgba(15,91,120,${alpha})`, `rgba(239,139,44,${alpha})`, `rgba(162,184,108,${alpha})`,
    `rgba(13,60,85),${alpha})`, `rgba(241,108,32,${alpha})`, `rgba(92,167,147,${alpha})`,
  ]

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
        this.data.datasets[0].data = [this.metrics.commit_contains_bug_count, this.metrics.commit_count];
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
