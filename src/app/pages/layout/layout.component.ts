import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router = inject(Router);
  private masterService = inject(MasterService);
  searchItem = "";

  constructor() {
    this.masterService.searchData.subscribe(result => {
      if (!result) {
        this.searchItem = "";
      }
    })
  }

  onSearchItemChange() {
    console.log("🚀 ~ LayoutComponent ~ onSearchItemChange ~ this.searchItem:", this.searchItem)

    this.masterService.searchData.next(this.searchItem);
  }

  logOut() {
    this.router.navigateByUrl('login')
  }
}
