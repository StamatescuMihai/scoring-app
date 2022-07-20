import { Component } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scoring-app';

  constructor(private pageService: PageService, private storageService:StorageService) {
    this.fix();
  }

  //dumb method that just interacts with storage so it would get initialized when opening app
  async fix(){
    const resp=this.storageService.get("games");
  }

  getPage() {
    return this.pageService.getCurrentPage();
  }
}
