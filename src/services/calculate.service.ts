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
    return this.perRobot(game.robot1)+this.perRobot(game.robot2);
  }

  public perRobot(robot: RobotScoreModel):number{
    return this.perAuto(robot.auto)+this.perTeleop(robot.teleop)+this.perEndgame(robot.endgame);
  }

  public perAuto(auto: AutoModel):number{
    return (auto.autoDetectionBonus?20:0)+(auto.objective1?10:0)+(auto.parked*10);
  }

  public perTeleop(teleop: TeleopModel):number{
    return teleop.elementsScored*8;
  }

  public perEndgame(endgame: EndgameModel):number{
    return (endgame.objective1?20:0)+(endgame.objective2?20:0)+(endgame.parked*10);
  }
}
