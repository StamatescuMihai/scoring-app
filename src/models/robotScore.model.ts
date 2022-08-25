import { AutoModel } from "./auto.model";
import { EndgameModel } from "./endgame.model";
import { TeleopModel } from "./teleop.model";

export interface RobotScoreModel{
    auto:AutoModel;
    teleop:TeleopModel;
    endgame:EndgameModel;
}