import { Component, OnInit } from '@angular/core';
import { CalculateService } from 'src/services/calculate.service';
import { GameModel } from '../../models/game.model';
import { PageService } from '../../services/page.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'traditional-page',
  templateUrl: './traditional-page.component.html',
  styleUrls: ['./traditional-page.component.css']
})
export class TraditionalPageComponent implements OnInit {

  game: GameModel = {
    isRemote: false,
    robot1 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: false
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:false,
        objective2: false
      }
    },
    robot2 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: false
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:false,
        objective2:false
      }
    }
  };
  zerogame: GameModel = {
    isRemote: false,
    robot1 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: false
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:false,
        objective2: false
      }
    },
    robot2 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: false
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:false,
        objective2:false
      }
    }
  };

  constructor(private pageService: PageService, private saveService: StorageService, public calcService: CalculateService) { }

  onPageChange(pageNumber: number) {
    this.pageService.setCurrentPage(pageNumber);
  }

  getAutoPoints(){
    return this.calcService.perAuto(this.game.robot1.auto)+this.calcService.perAuto(this.game.robot2.auto);
  }

  getTeleopPoints(){
    return this.calcService.perTeleop(this.game.robot1.teleop)+this.calcService.perTeleop(this.game.robot2.teleop);
  }

  getEndgamePoints(){
    return this.calcService.perEndgame(this.game.robot1.endgame)+this.calcService.perEndgame(this.game.robot2.endgame);
  }

  onElementChange(fr: number) {
    this.game.robot1.teleop.elementsScored += fr;
    if (this.game.robot1.teleop.elementsScored < 0) {
      this.game.robot1.teleop.elementsScored = 0;
    }
  }

  onParkedAutoChange(robot: number) {
    if (robot==1){
      this.game.robot1.auto.parked = !this.game.robot1.auto.parked;
    }
    else{
      this.game.robot2.auto.parked = !this.game.robot2.auto.parked;
    }
  }

  onObjective1AutoChange() {
    this.game.robot1.auto.objective1=!this.game.robot1.auto.objective1;
  }

  onAutoDetectionBonus(robot:number){
    if (robot==1){
      this.game.robot1.auto.autoDetectionBonus=!this.game.robot1.auto.autoDetectionBonus;
    }
    else{
      this.game.robot2.auto.autoDetectionBonus=!this.game.robot2.auto.autoDetectionBonus;
    }
  }

  onObjective1EndgameChange(){
    this.game.robot1.endgame.objective1=!this.game.robot1.endgame.objective1;
  }

  onObjective2EndgameChange(){
    this.game.robot1.endgame.objective2=!this.game.robot1.endgame.objective2;
  }

  onParkedEndgameChange(robot: number) {
    if (robot==1){
      this.game.robot1.endgame.parked = !this.game.robot1.endgame.parked;
    }
    else{
      this.game.robot2.endgame.parked = !this.game.robot2.endgame.parked;
    }
  }

  onSave() {
    if (JSON.stringify(this.game)===JSON.stringify(this.zerogame)){
      return;
    }
    this.saveService.get("games")?.then(
      (response) => {
        let games: GameModel[] = response;
        if (games != null) {
          games.unshift(this.game);
        }
        else {
          games = [this.game];
        };
        this.saveService.set("games", games);
      }
    )
  }

  ngOnInit(): void {
  }

}
