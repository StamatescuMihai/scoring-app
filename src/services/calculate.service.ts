import { Injectable } from '@angular/core';
import { AutoModel } from 'src/models/auto.model';
import { EndgameModel } from 'src/models/endgame.model';
import { GameModel } from 'src/models/game.model';
import { RobotScoreModel } from 'src/models/robotScore.model';
import { TeleopModel } from 'src/models/teleop.model';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  public total(game: GameModel){
    return this.normalizePositive(this.perRobot(game.robot1)+this.perRobot(game.robot2)-game.majors*30-game.minors*10);
  }

  public perRobot(robot: RobotScoreModel):number{
    return this.perAuto(robot.auto)+this.perTeleop(robot.teleop)+this.perEndgame(robot.endgame);
  }

  public perAuto(auto: AutoModel):number{
    return 1*Math.trunc(auto.parked)+1*auto.conesInTerminal+2*auto.conesInGround+3*auto.conesInLow+4*auto.conesInMedium+5*auto.conesInHigh;
  }

  public perTeleop(teleop: TeleopModel):number{
    return (teleop.conesInTerminal)+(teleop.conesInGround*2)+(teleop.conesInLow*3)+(teleop.conesInMedium*4)+(teleop.conesInHigh*5);
  }

  public perEndgame(endgame: EndgameModel):number{
    return (endgame.circuit?20:0)+endgame.junctionsOwnedByCone*3+endgame.junctionsOwnedByBeacon*10+(endgame.parkedInTerminal?2:0);
  }

  private normalizePositive (x:number):number{
    if (x<0){
      x=0;
    }
    return x;
  }
}
