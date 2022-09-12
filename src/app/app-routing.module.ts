import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryPageComponent } from 'src/components/history-page/history-page.component';
import { HomePageComponent } from 'src/components/home-page/home-page.component';
import { RemotePageComponent } from 'src/components/remote-page/remote-page.component';
import { TraditionalPageComponent } from 'src/components/traditional-page/traditional-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'traditional', component: TraditionalPageComponent}, 
  { path: 'remote', component: RemotePageComponent}, 
  { path: 'history', component: HistoryPageComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }