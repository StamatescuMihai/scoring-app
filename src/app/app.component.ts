import { Component } from '@angular/core';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scoring-app';

  constructor(private pageService: PageService) { }

  getPage() {
    return this.pageService.getCurrentPage();
  }
}
