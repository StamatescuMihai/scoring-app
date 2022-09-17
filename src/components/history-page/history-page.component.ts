import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameModel } from 'src/models/game.model';
import { CalculateService } from 'src/services/calculate.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  games: GameModel[]=[];

  constructor(private saveService: StorageService, public calcService:CalculateService) {
    this.onGet();
  }

  async onGet() {
    this.games = await this.saveService.get("games");
  }

  async onStorageClear(){
    await this.saveService.clear();
    this.games = await this.saveService.get("games");
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
