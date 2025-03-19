import { Component, resource } from '@angular/core';
import { Customer } from '../../model/customer';
import { NgIf } from '@angular/common';
import { APIResponse } from '../../model/apiResponse';

@Component({
  selector: 'app-customer',
  imports: [NgIf],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  private apiUrl: string = "https://freeapi.miniprojectideas.com/api/CarRentalApp/";

  customerList = resource({
    loader: () => {
      return fetch(`${this.apiUrl}GetCustomers`)
        .then((response) =>
          response.json() as Promise<APIResponse<Customer>>
        )
    }
  })
}
