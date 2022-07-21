import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StorageService } from 'src/services/storage.service';
import { AppComponent } from '../../app/app.component';
import { PageService } from '../../services/page.service';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private pageService: PageService, private storageService:StorageService) { 
    
  }

  onPageChange(pageNumber: number) {
    this.pageService.setCurrentPage(pageNumber);
  }

  ngOnInit(): void {
  }

}
