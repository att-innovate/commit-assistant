import { Injectable } from '@angular/core';


export interface IRepo {
  name: string;
  commits: any;
  status: string;
}

@Injectable()
export class StoreService {


  repos: IRepo[] = [
    { name: "Cvaas ui", commits: 1004, status: "analyzing" },
    { name: "netdbService", commits: 3014, status: "Analyzed 2 days ago" },
    { name: "test", commits: 12, status: "Analyzed 12 days ago" },
  ]
  
  constructor() {

  }

}
