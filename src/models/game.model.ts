import { RobotScoreModel } from "./robotScore.model";

export interface GameModel {
    robot1: RobotScoreModel;
    robot2: RobotScoreModel;
    isRemote: boolean;
}