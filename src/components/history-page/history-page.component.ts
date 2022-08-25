import { Component, OnInit } from '@angular/core';
import { GameModel } from 'src/models/game.model';
import { CalculateService } from 'src/services/calculate.service';
import { PageService } from 'src/services/page.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  games: GameModel[]=[];

  constructor(private pageService: PageService, private saveService: StorageService, public calcService:CalculateService) {
    this.onGet();
  }

  onPageChange(pageNumber: number) {
    this.pageService.setCurrentPage(pageNumber);
  }

  async onGet() {
    this.games = await this.saveService.get("games");
  }

  async onStorageClear(){
    await this.saveService.clear();
    this.games = await this.saveService.get("games");
  }

  ngOnInit(): void {
  }

}
