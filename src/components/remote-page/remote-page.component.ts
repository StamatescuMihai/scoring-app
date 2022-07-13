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

  game: GameModel = new GameModel(0, false);

  constructor(private pageService: PageService, private saveService: StorageService) {
    this.onGet();
  }

  onPageChange(pageNumber: number) {
    this.pageService.setCurrentPage(pageNumber);
  }

  async onGet() {
    this.game = await this.saveService.get("game");
  }

  ngOnInit(): void {
  }

}
