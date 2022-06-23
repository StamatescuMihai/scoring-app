import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'remote-page',
  templateUrl: './remote-page.component.html',
  styleUrls: ['./remote-page.component.css']
})
export class RemotePageComponent implements OnInit {

  constructor() { }

  onPageChange(pageNumber:number){
    PageService.setCurrentPage(pageNumber);
  }

  ngOnInit(): void {
  }

}
