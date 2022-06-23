import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { PageService } from '../page.service';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  onPageChange(pageNumber:number){
    PageService.setCurrentPage(pageNumber);
  }

  ngOnInit(): void {
  }

}
