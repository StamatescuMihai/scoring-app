import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { App as CapacitorApp}  from '@capacitor/app';
import {MatDialog} from '@angular/material/dialog';
import { ExitAppDialogComponent } from 'src/components/exit-app-dialog/exit-app-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scoring-app';

  constructor(private storageService:StorageService, private platform:Platform, private dialog: MatDialog) {
    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      if(!canGoBack){
        let dialogRef = this.dialog.open(ExitAppDialogComponent, {
          width: '80vw',
          height: '30vh'
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            CapacitorApp.exitApp();
          }
        });
      } else {
        window.history.back();
      }
    });
    this.fix();
  }

  //dumb method that just interacts with storage so it would get initialized when opening app
  async fix(){
    const resp=this.storageService.get("games");
  }
}
