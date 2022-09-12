import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StorageService } from 'src/services/storage.service';
import { AppComponent } from '../../app/app.component';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private storageService:StorageService) { 
    
  }

  ngOnInit(): void {
  }

}
