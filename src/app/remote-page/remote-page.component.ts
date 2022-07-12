import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'remote-page',
  templateUrl: './remote-page.component.html',
  styleUrls: ['./remote-page.component.css']
})
export class RemotePageComponent implements OnInit {

  freight:number=0;

  constructor(private pageService:PageService, private saveService:StorageService) { 
    this.onGet();
  }

  onPageChange(pageNumber:number){
    this.pageService.setCurrentPage(pageNumber);
  }

  async onGet(){
    this.freight=await this.saveService.get("freight");
  }

  ngOnInit(): void {
  }

}
