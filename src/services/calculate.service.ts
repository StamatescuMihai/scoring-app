import { Injectable } from '@angular/core';
import { GameModel } from 'src/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  total(game: GameModel){
    return game.freightScored*6+(game.isParked?10:0);
  }
}
