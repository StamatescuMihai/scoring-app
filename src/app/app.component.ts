import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { PageService } from '../services/page.service';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scoring-app';

  constructor(private pageService: PageService, private storageService:StorageService, private platform:Platform) {

    this.fix();
    // App.addListener('backButton', data=>{
    //   if (this.pageService.getCurrentPage()>1){
    //     this.pageService.setCurrentPage(1);
    //   }
    //   else{
    //     App.exitApp();
    //   }
    // })
  }

  //dumb method that just interacts with storage so it would get initialized when opening app
  async fix(){
    const resp=this.storageService.get("games");
  }

  getPage() {
    return this.pageService.getCurrentPage();
  }
}
