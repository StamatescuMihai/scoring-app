import { Component, OnInit } from '@angular/core';
import { CalculateService } from 'src/services/calculate.service';
import { GameModel } from '../../models/game.model';
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
        conesInTerminal:0,
        conesInGround:0,
        conesInLow: 0,
        conesInMedium: 0,
        conesInHigh: 0,
        parked: 0,
      },
      teleop:{
        conesInTerminal:0,
        conesInGround:0,
        conesInLow: 0,
        conesInMedium: 0,
        conesInHigh: 0,
      },
      endgame:{
        parkedInTerminal:false,
        junctionsOwnedByCone: 0,
        junctionsOwnedByBeacon: 0,
        circuit:false
      }
    },
    robot2 : {
      auto:{
        conesInTerminal:0,
        conesInGround:0,
        conesInLow: 0,
        conesInMedium: 0,
        conesInHigh: 0,
        parked: 0,
      },
      teleop:{
        conesInTerminal:0,
        conesInGround:0,
        conesInLow: 0,
        conesInMedium: 0,
        conesInHigh: 0,
      },
      endgame:{
        parkedInTerminal:false,
        junctionsOwnedByCone: 0,
        junctionsOwnedByBeacon: 0,
        circuit:false
      }
    }
  };

  constructor(private saveService: StorageService, public calcService: CalculateService) { }

  getAutoPoints(){
    return this.calcService.perAuto(this.game.robot1.auto)+this.calcService.perAuto(this.game.robot2.auto);
  }

  getTeleopPoints(){
    return this.calcService.perTeleop(this.game.robot1.teleop)+this.calcService.perTeleop(this.game.robot2.teleop);
  }

  getEndgamePoints(){
    return this.calcService.perEndgame(this.game.robot1.endgame)+this.calcService.perEndgame(this.game.robot2.endgame);
  }

  onTerminalConesAuto(c: number){
    this.game.robot1.auto.conesInTerminal += c;
    if (this.game.robot1.auto.conesInTerminal < 0) {
      this.game.robot1.auto.conesInTerminal = 0;
    }
    else{
      this.game.robot1.teleop.conesInTerminal += c;
    }
  }

  onGroundConesAuto(c: number){
    this.game.robot1.auto.conesInGround += c;
    if (this.game.robot1.auto.conesInGround < 0) {
      this.game.robot1.auto.conesInGround = 0;
    }
    else{
      this.game.robot1.teleop.conesInGround += c;
    }
  }

  onLowConesAuto(c: number){
    this.game.robot1.auto.conesInLow += c;
    if (this.game.robot1.auto.conesInLow < 0) {
      this.game.robot1.auto.conesInLow = 0;
    }
    else{
      this.game.robot1.teleop.conesInLow += c;
    }
  }
  onMediumConesAuto(c: number){
    this.game.robot1.auto.conesInMedium += c;
    if (this.game.robot1.auto.conesInMedium < 0) {
      this.game.robot1.auto.conesInMedium = 0;
    }
    else{
      this.game.robot1.teleop.conesInMedium += c;
    }
  }
  onHighConesAuto(c: number){
    this.game.robot1.auto.conesInHigh += c;
    if (this.game.robot1.auto.conesInHigh < 0) {
      this.game.robot1.auto.conesInHigh = 0;
    }
    else{
      this.game.robot1.teleop.conesInHigh += c;
    }
  }

  onTerminalCones(c: number){
    this.game.robot1.teleop.conesInTerminal += c;
    if (this.game.robot1.teleop.conesInTerminal < 0) {
      this.game.robot1.teleop.conesInTerminal = 0;
    }
  }

  onGroundCones(c: number){
    this.game.robot1.teleop.conesInGround += c;
    if (this.game.robot1.teleop.conesInGround < 0) {
      this.game.robot1.teleop.conesInGround = 0;
    }
  }

  onLowCones(c: number){
    this.game.robot1.teleop.conesInLow += c;
    if (this.game.robot1.teleop.conesInLow < 0) {
      this.game.robot1.teleop.conesInLow = 0;
    }
  }

  onMediumCones(c: number){
    this.game.robot1.teleop.conesInMedium += c;
    if (this.game.robot1.teleop.conesInMedium < 0) {
      this.game.robot1.teleop.conesInMedium = 0;
    }
  }

  onHighCones(c: number){
    this.game.robot1.teleop.conesInHigh += c;
    if (this.game.robot1.teleop.conesInHigh < 0) {
      this.game.robot1.teleop.conesInHigh = 0;
    }
  }

  onJunctionsOwnedByCone(j:number){
    this.game.robot1.endgame.junctionsOwnedByCone += j;
    if (this.game.robot1.endgame.junctionsOwnedByCone < 0){
      this.game.robot1.endgame.junctionsOwnedByCone = 0;
    }
  }

  onJunctionsOwnedByBeacon(j:number){
    this.game.robot1.endgame.junctionsOwnedByBeacon += j;
    if (this.game.robot1.endgame.junctionsOwnedByBeacon < 0){
      this.game.robot1.endgame.junctionsOwnedByBeacon = 0;
    }
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
      isRemote: false,
      robot1 : {
        auto:{
          conesInTerminal:0,
          conesInGround:0,
          conesInLow: 0,
          conesInMedium: 0,
          conesInHigh: 0,
          parked: 0,
        },
        teleop:{
          conesInTerminal:0,
          conesInGround:0,
          conesInLow: 0,
          conesInMedium: 0,
          conesInHigh: 0,
        },
        endgame:{
          parkedInTerminal:false,
          junctionsOwnedByCone: 0,
          junctionsOwnedByBeacon: 0,
          circuit:false
        }
      },
      robot2 : {
        auto:{
          conesInTerminal:0,
          conesInGround:0,
          conesInLow: 0,
          conesInMedium: 0,
          conesInHigh: 0,
          parked: 0,
        },
        teleop:{
          conesInTerminal:0,
          conesInGround:0,
          conesInLow: 0,
          conesInMedium: 0,
          conesInHigh: 0,
        },
        endgame:{
          parkedInTerminal:false,
          junctionsOwnedByCone: 0,
          junctionsOwnedByBeacon: 0,
          circuit:false
        }
      }
    };
  }

  ngOnInit(): void {
  }

}
