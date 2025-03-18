import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIResponse } from '../model/apiResponse';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = "https://freeapi.miniprojectideas.com/api/CarRentalApp/";
  httpClient = inject(HttpClient);

  getCars() {
    return this.httpClient.get<APIResponse>(`${this.apiUrl}GetCars`);
  }

  createCar(carData: Partial<Car>) {
    return this.httpClient.post<APIResponse>(`${this.apiUrl}CreateNewCar`, carData);
  }

  updateCar(carData: Partial<Car>) {
    return this.httpClient.put<APIResponse>(`${this.apiUrl}UpdateCar`, carData);
  }

  deleteCar(carId: number) {
    return this.httpClient.delete<APIResponse>(`${this.apiUrl}DeleteCarByCarId?carid=${carId}`);
  }
}
