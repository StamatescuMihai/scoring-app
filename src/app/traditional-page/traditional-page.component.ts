import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'traditional-page',
  templateUrl: './traditional-page.component.html',
  styleUrls: ['./traditional-page.component.css']
})
export class TraditionalPageComponent implements OnInit {

  freightScored:number = 0;
  parkedState = 0;

  constructor() { }

  onPageChange(pageNumber:number){
    PageService.setCurrentPage(pageNumber);
  }

  onFreightChange(fr:number){
    this.freightScored+=fr;
    if (this.freightScored<0){
      this.freightScored=0;
    }
  }

  onParkedChange(){
    this.parkedState=1-this.parkedState;
  }

  ngOnInit(): void {
  }

}
