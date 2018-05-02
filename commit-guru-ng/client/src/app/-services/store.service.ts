import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface IMetrics {
  metrics:IMetric[];
  commit_contains_bug_count:number;
  commit_count:number;
  name:string;
  status:string;
  id:string;
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

@Injectable()
export class StoreService {
  baseApi: string = "http://172.22.131.97:3000/api";

  private _repos$: BehaviorSubject<IRepo[]>;
  private _repoMetrics$: BehaviorSubject<IMetrics>;
  private _commits$: BehaviorSubject<any[]>;

  repos: IRepo[];

  constructor(private http: HttpClient) {
    this._repos$ = <BehaviorSubject<IRepo[]>>new BehaviorSubject(null);
    this._repoMetrics$ = <BehaviorSubject<IMetrics>>new BehaviorSubject(null);
    this._commits$ = <BehaviorSubject<any[]>>new BehaviorSubject(null);
  }

  get repos$(): Observable<IRepo[]> { return this._repos$.asObservable(); }
  get repoMetrics$(): Observable<IMetrics> { return this._repoMetrics$.asObservable(); }
  get commits$(): Observable<any[]> { return this._commits$.asObservable(); }

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
      if (data) {
        this._repoMetrics$.next(Object.assign({}, data.metricByRepo));
      }
      
    }, error => {

    })
  }


  getCommitsByRepo(id) {
    this.http.get<any>(`${this.baseApi}/commits/commitsByRepo?rid=${id}`).subscribe(data => {
      if (data) {
        this._commits$.next( [...data.commitsByRepo]);
      }
      
    }, error => {

    })

  }
}
