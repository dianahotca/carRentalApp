import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { APIResponse } from '../model/apiResponse';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = "https://freeapi.miniprojectideas.com/api/CarRentalApp/";
  httpClient = inject(HttpClient);

  loadCars() {
    return this.httpClient.get<APIResponse>(`${this.apiUrl}GetCars`);
  }

  createCar(carData: Car) {
    return this.httpClient.post<APIResponse>(`${this.apiUrl}CreateNewCar`, carData);
  }
}
