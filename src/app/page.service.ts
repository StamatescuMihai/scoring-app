import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private static currentPage: number = 1;//1-home, 2-remote, 3-traditional
  constructor() { }

  static getCurrentPage() {
    return this.currentPage;
  }

  static setCurrentPage(givenPage: number) {
    this.currentPage = givenPage;
  }
}
