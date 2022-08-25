import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { RemotePageComponent } from '../components/remote-page/remote-page.component';
import { TraditionalPageComponent } from '../components/traditional-page/traditional-page.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HistoryPageComponent } from '../components/history-page/history-page.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RemotePageComponent,
    TraditionalPageComponent,
    HistoryPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
