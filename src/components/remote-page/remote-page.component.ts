import { Component, OnInit } from '@angular/core';
import { GameModel } from 'src/models/game.model';
import { PageService } from '../../services/page.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'remote-page',
  templateUrl: './remote-page.component.html',
  styleUrls: ['./remote-page.component.css']
})
export class RemotePageComponent implements OnInit {

  games: GameModel[]=[];

  constructor(private pageService: PageService, private saveService: StorageService) {
    this.onGet();
  }

  onPageChange(pageNumber: number) {
    this.pageService.setCurrentPage(pageNumber);
  }

  async onGet() {
    this.games = await this.saveService.get("games");
  }

  ngOnInit(): void {
  }

}
