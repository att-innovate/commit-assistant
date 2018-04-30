import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  selected:number =1;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  goto(str){
    this.router.navigateByUrl(str);
  }

  onClick(num) {
    this.selected = num;
  }
}
