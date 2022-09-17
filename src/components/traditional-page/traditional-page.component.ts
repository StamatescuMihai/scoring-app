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
    minors: 0,
    majors: 0,
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

  getPenaltyPoints(){
    return this.game.majors*30+this.game.minors*10;
  }

  onTerminalConesAuto(c: number){
    this.game.robot1.auto.conesInTerminal += c;
    this.game.robot1.teleop.conesInTerminal += c;
    if (this.game.robot1.auto.conesInTerminal < 0) {
      this.game.robot1.auto.conesInTerminal = 0;
    }
    if (this.game.robot1.teleop.conesInTerminal < 0) {
      this.game.robot1.teleop.conesInTerminal = 0;
    }
  }

  onGroundConesAuto(c: number){
    this.game.robot1.auto.conesInGround += c;
    this.game.robot1.teleop.conesInGround += c;
    if (this.game.robot1.auto.conesInGround < 0) {
      this.game.robot1.auto.conesInGround = 0;
    }
    if (this.game.robot1.teleop.conesInGround < 0) {
      this.game.robot1.teleop.conesInGround = 0;
    }
  }

  onLowConesAuto(c: number){
    this.game.robot1.auto.conesInLow += c;
    this.game.robot1.teleop.conesInLow += c;
    if (this.game.robot1.auto.conesInLow < 0) {
      this.game.robot1.auto.conesInLow = 0;
    }
    if (this.game.robot1.teleop.conesInLow < 0) {
      this.game.robot1.teleop.conesInLow = 0;
    }
  }
  onMediumConesAuto(c: number){
    this.game.robot1.auto.conesInMedium += c;
    this.game.robot1.teleop.conesInMedium += c;
    if (this.game.robot1.auto.conesInMedium < 0) {
      this.game.robot1.auto.conesInMedium = 0;
    }
    if (this.game.robot1.teleop.conesInMedium < 0) {
      this.game.robot1.teleop.conesInMedium = 0;
    }
  }
  onHighConesAuto(c: number){
    this.game.robot1.auto.conesInHigh += c;
    this.game.robot1.teleop.conesInHigh += c;
    if (this.game.robot1.auto.conesInHigh < 0) {
      this.game.robot1.auto.conesInHigh = 0;
    }
    if (this.game.robot1.teleop.conesInHigh < 0) {
      this.game.robot1.teleop.conesInHigh = 0;
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

  onMinor(p: number){
    this.game.minors+= p;
    if (this.game.minors < 0) {
      this.game.minors = 0;
    }
  }

  onMajor(p: number){
    this.game.majors+= p;
    if (this.game.majors < 0) {
      this.game.majors = 0;
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
      minors: 0,
      majors: 0,
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
