import { Component, OnInit } from '@angular/core';
import { StoreService, IRepo } from '../-services/store.service';

@Component({
  selector: 'repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  repos:IRepo[];

  constructor(private store:StoreService) { }

  ngOnInit() {
    this.repos = this.store.repos;
  }

}
