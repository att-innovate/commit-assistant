import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface IMetrics {
  metrics: IMetric[];
  commit_contains_bug_count: number;
  commit_count: number;
  name: string;
  status: string;
  id: string;
}

export interface IMetric {
  buggy: number;
  nonbuggy: number;
  descrption: string;
  name: string;
  significant: number;
}

export interface IRepo {
  name: string;
  commits: any;
  risky_commits: any;
  status: string;
  id: any
}

export interface ICommitInfoCat {
  descrption:string;
  name:string;
  significant:number;
}

export interface ICommitInfo {
  author,
  details:any,
  diffusion:ICommitInfoCat[];
  experience:ICommitInfoCat[];
  history:ICommitInfoCat[];
  size:ICommitInfoCat[];
}

export interface ICommit {
  age;
  author_date;
  author_date_unix_timestamp;
  author_email;
  author_name;
  classification;
  commit_hash;
  commit_message;
  contains_bug;
  entrophy;
  exp;
  fileschanged;
  fix;
  fixes;
  glm_probability;
  id;
  la;
  linked;
  lt;
  nd;
  ndev;
  nf;
  ns;
  nuc;
  repositoriesId;
  repository_id;
  rexp;
  sexp;
}

@Injectable()
export class StoreService {
  baseApi: string = "http://172.22.130.129:3000/api";

  private _repos$: BehaviorSubject<IRepo[]>;
  private _repoMetrics$: BehaviorSubject<IMetrics>;
  private _commits$: BehaviorSubject<ICommit[]>;
  private _commitInfo$: BehaviorSubject<ICommitInfo>;

  repos: IRepo[];

  constructor(private http: HttpClient) {
    this._repos$ = <BehaviorSubject<IRepo[]>>new BehaviorSubject(null);
    this._repoMetrics$ = <BehaviorSubject<IMetrics>>new BehaviorSubject(null);
    this._commits$ = <BehaviorSubject<ICommit[]>>new BehaviorSubject(null);
    this._commitInfo$ = <BehaviorSubject<ICommitInfo>>new BehaviorSubject(null);
  }

  get repos$(): Observable<IRepo[]> { return this._repos$.asObservable(); }
  get repoMetrics$(): Observable<IMetrics> { return this._repoMetrics$.asObservable(); }
  get commits$(): Observable<ICommit[]> { return this._commits$.asObservable(); }
  get commitInfo$(): Observable<ICommitInfo> { return this._commitInfo$.asObservable(); }

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


  getCommitInfoById(id) {

    this.http.get<any>(`${this.baseApi}/commits/commitsById?chash=${id}`).subscribe(data => {
      if (data) {
        this._commitInfo$.next(data.commitsById);
      }

    }, error => {

    })
  }

  getCommitsByRepo(id) {
    this.http.get<any>(`${this.baseApi}/commits/commitsByRepo?rid=${id}`).subscribe(data => {
      if (data) {
        this._commits$.next([...data.commitsByRepo]);
      }

    }, error => {

    })

  }
}
