import { Component, inject, signal } from '@angular/core';
import { Car } from '../../model/car';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-create-car-modal',
  imports: [],
  templateUrl: './create-car-modal.component.html',
  styleUrl: './create-car-modal.component.css'
})
export class CreateCarModalComponent {
  carService = inject(CarService);

  vehicleFormData = signal<Car>({
    carId: 0,
    brand: '',
    model: '',
    year: 0,
    color: '',
    dailyRate: 0,
    carImage: '',
    regNo: ''
  })

  updateFormData(fieldName: string, event: any) {
    this.vehicleFormData.update((data: Car) => ({
      ...data,
      [fieldName]: event.target.value
    }))
  }

  saveCar() {
    this.carService.createCar(this.vehicleFormData()).subscribe((response: any) => {
      if (response.result) {
        alert('Vehicle created successfully!')

        return;
      }

      alert(response.message);
    })
  }
}
