import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../service/master/master.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  private masterService = inject(MasterService);
  loginService = inject(LoginService);
  searchItem = "";

  constructor() {
    this.masterService.searchData.subscribe(result => {
      if (!result) {
        this.searchItem = "";
      }
    })
  }

  onSearchItemChange() {
    this.masterService.searchData.next(this.searchItem);
  }
}
