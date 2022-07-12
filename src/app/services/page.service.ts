import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private currentPage: number = 1;//1-home, 2-remote, 3-traditional
  constructor() { }

  getCurrentPage() {
    return this.currentPage;
  }

  setCurrentPage(givenPage: number) {
    this.currentPage = givenPage;
  }
}
