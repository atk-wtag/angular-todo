import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoStoreService } from 'src/app/services/state/todoStore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBar') search: ElementRef;
  showSearchBar: boolean = false;

  constructor(public state: TodoStoreService) {}

  ngOnInit(): void {}

  toggleSearchBarVisibility() {
    this.showSearchBar = !this.showSearchBar;

    if (this.showSearchBar) {
      setTimeout(() => {
        this.search.nativeElement.focus();
      }, 0);
    } else {
      this.state.searchKeyword = '';
    }
  }

  getSearchIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.111 20.058L18.134 15.081C19.099 13.561 19.657 11.759 19.657 9.83C19.657 4.41 15.248 0 9.828 0C4.408 0 0 4.41 0 9.83C0 15.25 4.408 19.66 9.829 19.66C11.663 19.66 13.381 19.155 14.851 18.277L19.872 23.298C22.016 25.439 25.256 22.202 23.111 20.058ZM3.047 9.83C3.047 6.091 6.09 3.048 9.829 3.048C13.568 3.048 16.611 6.09 16.611 9.83C16.611 13.57 13.568 16.612 9.829 16.612C6.09 16.612 3.047 13.569 3.047 9.83ZM5.057 8.066C7.041 3.467 13.721 4 14.979 8.815C12.445 5.841 7.986 5.521 5.057 8.066Z" fill="#BBBDD0"/>
</svg>
`;
  }
}
