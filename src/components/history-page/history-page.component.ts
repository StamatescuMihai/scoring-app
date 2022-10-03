import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameModel } from 'src/models/game.model';
import { CalculateService } from 'src/services/calculate.service';
import { FormatDateService } from 'src/services/format-date.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  games: GameModel[]=[];
  firstTimeClear:number=0;
  firstTimeDelete:number=0;
  lastIndex:number=0;
  public currentIndexNameChange:number=-1;
  public currentIndexDescChange:number=-1;

  constructor(private saveService: StorageService, public calcService:CalculateService, public dateFormatter:FormatDateService,  private _snackBar:MatSnackBar, private zone:NgZone) {
    this.onGet();
  }

  async onGet() {
    this.games = await this.saveService.get("games");
  }

  async onDelete(index: number){
    if(this.games[index].isFavourite){
      this.zone.run(()=>{
        this._snackBar.openFromComponent(SnackBarCancelDeleteComponent, {
          duration: 3000,
        });
      })
      return;
    }
    if (Date.now()-this.firstTimeDelete<3000&&this.lastIndex==index){
      this.games.splice(index, 1);
      this.saveService.set("games", this.games);
    }
    else{
      this.firstTimeDelete=Date.now();
      this.lastIndex=index;
      this.zone.run(()=>{
        this._snackBar.openFromComponent(SnackBarDeleteMatchComponent, {
          duration: 3000,
        });
      })
    }
  }

  onNameChange(index:number){
    if (index==this.currentIndexDescChange){
      this.currentIndexDescChange=-1;
      this.saveService.set("games", this.games);
    }
    this.currentIndexNameChange=index;
  }
  onNameSave(){
    this.saveService.set("games", this.games);
  }
  async onInputClose(){
    this.onNameSave();
    this.currentIndexNameChange=-1;
  }

  async onInputDescClose(){
    this.onNameSave();
    this.currentIndexDescChange=-1;
  }

  onDescriptionChange(index: number){
    if (index==this.currentIndexNameChange){
      this.currentIndexNameChange=-1;
      this.saveService.set("games", this.games);
    }
    this.currentIndexDescChange=index;
  }

  onFavorite(value:boolean, index:number){
    this.games[index].isFavourite=value;
    this.saveService.set("games", this.games);
  }

  async onStorageClear(){
    if (Date.now()-this.firstTimeClear<3000){
      for(let i=0;i<this.games.length;){
        if (this.games[i].isFavourite){
          i++;
          continue;
        }
        this.games.splice(i, 1);
      }
      this.saveService.set("games", this.games);
    }
    else{
    this.firstTimeClear=Date.now();
      this.zone.run(()=>{
        this._snackBar.openFromComponent(SnackBarClearComponent, {
          duration: 3000,
        });
      })
    }
  }

  getAutoPoints(game:GameModel):number{
    return this.calcService.perAuto(game.robot1.auto)+this.calcService.perAuto(game.robot2.auto);
  }

  getTeleopPoints(game:GameModel){
    return this.calcService.perTeleop(game.robot1.teleop)+this.calcService.perTeleop(game.robot2.teleop);
  }

  getEndgamePoints(game:GameModel){
    return this.calcService.perEndgame(game.robot1.endgame)+this.calcService.perEndgame(game.robot2.endgame);
  }

  getPenaltyPoints(game:GameModel){
    return game.majors*30+game.minors*10;
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
  <span>
    Press again to clear history
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
export class SnackBarClearComponent {}

@Component({
  selector: 'snack-bar-delete-match-snack',
  template: `
  <span>
    Press again to delete match
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
export class SnackBarDeleteMatchComponent {}

@Component({
  selector: 'snack-bar-delete-match-snack',
  template: `
  <span>
    Cannot delete favorite match
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
export class SnackBarCancelDeleteComponent {}