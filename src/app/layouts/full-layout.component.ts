import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styles: [`.marginLeft{ margin-left: 28px}`],
  providers: []
})
export class FullLayoutComponent implements OnInit {
  
  userName;
  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};


  public constructor() {

  }

  public toggled(open: boolean): void {
    // console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.userName = JSON.parse(currentUser).userName;
  }

  logOut() {
    localStorage.removeItem('currentUser');
  }
}
