import { Component, OnInit } from '@angular/core';
import { StoreService } from '../-services/store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store:StoreService) { }

  ngOnInit() {
    
  }

  

}
