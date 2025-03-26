import { Component, inject, OnDestroy, resource } from '@angular/core';
import { Customer } from '../../model/customer';
import { NgIf } from '@angular/common';
import { MasterService } from '../../service/master/master.service';
import { CustomersApiResponse } from '../../model/api/customerApi';

@Component({
  selector: 'app-customer',
  imports: [NgIf],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnDestroy {
  private apiUrl: string = "https://freeapi.miniprojectideas.com/api/CarRentalApp/";
  private masterService = inject(MasterService);

  filteredCustomerList: Customer[] = [];

  constructor() {
    this.masterService.searchData.subscribe((customerSearchItem) => {
      if (customerSearchItem) {
        this.filteredCustomerList = (this.customerList.value()?.data as Customer[]).filter(customer => customer.customerName.includes(customerSearchItem)) || [];
        this.customerList.set({ result: true, data: this.filteredCustomerList, message: "" });

        return;
      }

      this.customerList.reload();
    })
  }

  ngOnDestroy() {
    this.masterService.searchData.next("");
  }

  customerList = resource({
    loader: () => {
      return fetch(`${this.apiUrl}GetCustomers`)
        .then((response) => {
          return response.json() as Promise<CustomersApiResponse>
        })
        .catch((error) => {
          alert(error);
        })
    },
  })
}
