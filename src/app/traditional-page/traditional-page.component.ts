import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'traditional-page',
  templateUrl: './traditional-page.component.html',
  styleUrls: ['./traditional-page.component.css']
})
export class TraditionalPageComponent implements OnInit {

  freightScored:number = 0;
  parkedState = 0;
  getFreight:number = 0;

  constructor(private pageService:PageService,private saveService:StorageService) { }

  onPageChange(pageNumber:number){
    this.pageService.setCurrentPage(pageNumber);
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

  onSave(){
    this.saveService.set("freight", this.freightScored);
  }

  async onGet(){
    this.getFreight=await this.saveService.get("freight");
  }

  ngOnInit(): void {
  }

}
