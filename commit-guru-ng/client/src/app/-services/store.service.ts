import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface IMetrics {
  metrics:IMetric[];
  commit_contains_bug_count:number;
  commit_contains:number;
  name:string;
  status:string;
}

export interface IMetric {
  buggy:number;
  nonbuggy:number;
  descrption:string;
  name:string;
  significant:number;
}
export interface IRepo {
  name: string;
  commits: any;
  risky_commits: any;
  status: string;
  id: any
}

/* const reposFakeData = [
  {
    "repository_id": "2",
    "commit_count": "307",
    "commit_contains_bug_count": "40"
  },
  {
    "repository_id": "3",
    "commit_count": "144",
    "commit_contains_bug_count": "0"
  }
] */


@Injectable()
export class StoreService {
  baseApi: string = "http://172.22.131.97:3000/api";

  private _repos$: BehaviorSubject<IRepo[]>;
  private _repoMetrics$: BehaviorSubject<IMetrics>;


  repos: IRepo[];
  /* repos: IRepo[] = [
    { name: "Cvaas ui", commits: 1004, status: "analyzing" },
    { name: "netdbService", commits: 3014, status: "Analyzed 2 days ago" },
    { name: "test", commits: 12, status: "Analyzed 12 days ago" },
  ] */

  constructor(private http: HttpClient) {
    this._repos$ = <BehaviorSubject<IRepo[]>>new BehaviorSubject(null);
    this._repoMetrics$ = <BehaviorSubject<IMetrics>>new BehaviorSubject(null);
  }

  get repos$(): Observable<IRepo[]> { return this._repos$.asObservable(); }
  get repoMetrics$(): Observable<IMetrics> { return this._repoMetrics$.asObservable(); }

  getRepos() {
    this.http.get<any>(`${this.baseApi}/commits/repositoriesSummary`)
      .subscribe(data => {

        if (data && data.status) {

          this.repos = data.status.map(a => {
            return {
              name: a.name,
              commits: a.commit_count,
              risky_commits: a.commit_contains_bug_count,
              id: a.repository_id,
              status: a.status
            }
          });
        }
  
        this._repos$.next([...this.repos]);
      }, error => {

      })

  }


  getRepoMterics(id: number) {
    this.http.get<any>(`${this.baseApi}/metrics/metricByRepo?rid=${id}`).subscribe(data => {

      //let metrics: IMetrics = data.metricByRepo;

      if (data) {

        this._repoMetrics$.next(Object.assign({}, data.metricByRepo));
      }
      
    }, error => {

    })
  }
}
