import { Component, OnInit } from '@angular/core';
import { GameModel } from 'src/models/game.model';
import { CalculateService } from 'src/services/calculate.service';
import { PageService } from '../../services/page.service';
import { StorageService } from '../../services/storage.service';
import { RobotScoreModel } from 'src/models/robotScore.model';

@Component({
  selector: 'remote-page',
  templateUrl: './remote-page.component.html',
  styleUrls: ['./remote-page.component.css']
})
export class RemotePageComponent implements OnInit {

  game: GameModel = {
    isRemote: true,
    robot1 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: 0
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:0,
        objective2: false
      }
    },
    robot2 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: 0
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:0,
        objective2:false
      }
    }
  };
  zerogame: GameModel = {
    isRemote: true,
    robot1 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: 0
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:0,
        objective2: false
      }
    },
    robot2 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: 0
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:0,
        objective2:false
      }
    }
  };

  constructor(private pageService: PageService, private saveService: StorageService, public calcService: CalculateService) { }

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

  onObjective1AutoChange() {
    this.game.robot1.auto.objective1=!this.game.robot1.auto.objective1;
  }

  onAutoDetectionBonus(){
    this.game.robot1.auto.autoDetectionBonus=!this.game.robot1.auto.autoDetectionBonus;
  }

  onObjective1EndgameChange(){
    this.game.robot1.endgame.objective1=!this.game.robot1.endgame.objective1;
  }

  onObjective2EndgameChange(){
    this.game.robot1.endgame.objective2=!this.game.robot1.endgame.objective2;
  }

  onPageChange(pageNumber: number) {
    this.pageService.setCurrentPage(pageNumber);
  }

  onSave() {
    if (this.calcService.total(this.game)==0){
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
        this.onReset();
      }
    )
  }

  onReset(){
    this.game={
      isRemote: true,
    robot1 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: 0
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:0,
        objective2: false
      }
    },
    robot2 : {
      auto:{
        autoDetectionBonus:false,
        objective1:false,
        parked: 0
      },
      teleop:{
        elementsScored: 0
      },
      endgame:{
        objective1: false,
        parked:0,
        objective2:false
      }
    }
  };
  }

  ngOnInit(): void {
  }

}
