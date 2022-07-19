import { Component, OnInit } from '@angular/core';
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
    freightScored: 0,
    isParked: false
  };
  zerogame: GameModel = {
    freightScored: 0,
    isParked: false
  }

  constructor(private pageService: PageService, private saveService: StorageService) { }

  onPageChange(pageNumber: number) {
    this.pageService.setCurrentPage(pageNumber);
  }

  onFreightChange(fr: number) {
    this.game.freightScored += fr;
    if (this.game.freightScored < 0) {
      this.game.freightScored = 0;
    }
  }

  onParkedChange() {
    this.game.isParked = !this.game.isParked;
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
