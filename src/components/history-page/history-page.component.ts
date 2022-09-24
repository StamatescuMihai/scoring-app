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
  firstTime:number=0;

  constructor(private saveService: StorageService, public calcService:CalculateService, public dateFormatter:FormatDateService,  private _snackBar:MatSnackBar, private zone:NgZone) {
    this.onGet();
  }

  async onGet() {
    this.games = await this.saveService.get("games");
  }

  async onStorageClear(){
    if (Date.now()-this.firstTime<3000){
      await this.saveService.clear();
      this.games = await this.saveService.get("games");
    }
    else{
    this.firstTime=Date.now();
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