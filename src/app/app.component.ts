import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { App as CapacitorApp}  from '@capacitor/app';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scoring-app';
  firstTime:number=0;

  constructor(private storageService:StorageService, private platform:Platform, private dialog: MatDialog, private _snackBar:MatSnackBar, private router:Router, private zone:NgZone) {
    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      if(this.router.url=='/home'){
        if (Date.now()-this.firstTime<3000){
          CapacitorApp.exitApp();
        }
        else{
          this.firstTime=Date.now();
          this.zone.run(()=>{
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: 3000,
            });
          })
        }
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


@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
  <span>
    Press again to exit app
  </span>`,
  styles: [
    `
    .mat-simple-snackbar span {
      margin: auto;
      text-align: center;
    }
  `,
  ],
})
export class SnackBarComponent {}