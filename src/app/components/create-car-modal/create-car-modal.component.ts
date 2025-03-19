import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CarService } from '../../service/car/car.service';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Car } from '../../model/car';

@Component({
  selector: 'app-create-car-modal',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-car-modal.component.html',
  styleUrl: './create-car-modal.component.css'
})
export class CreateCarModalComponent implements OnChanges {
  private formBuilder = inject(FormBuilder);

  carService = inject(CarService);
  vehicleForm = this.formBuilder.nonNullable.group({
    carId: 0,
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    year: [0, [Validators.required]],
    color: ['', [Validators.required]],
    dailyRate: [0, [Validators.required]],
    carImage: ['', [Validators.required]],
    regNo: ['', [Validators.required]]
  })
  @Input() selectedCar: Car | null = null;
  @Output() carSubmitted = new EventEmitter();

  get regNo() {
    return this.vehicleForm.get('regNo');
  }

  get brand() {
    return this.vehicleForm.get('brand');
  }

  get model() {
    return this.vehicleForm.get('model');
  }

  get year() {
    return this.vehicleForm.get('year');
  }

  get color() {
    return this.vehicleForm.get('color');
  }

  get dailyRate() {
    return this.vehicleForm.get('dailyRate');
  }

  get carImage() {
    return this.vehicleForm.get('carImage');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCar']) {
      this.selectedCar ?
        this.vehicleForm.setValue(this.selectedCar) :
        this.vehicleForm.reset();
    }
  }

  saveCar(event: Event) {
    event.preventDefault();

    const carData = this.vehicleForm.value;

    if (!this.selectedCar) {
      this.createCar(carData);

      return;
    }

    this.updateCar(carData);
  }

  createCar(carData: Partial<Car>) {
    this.carService.createCar(carData).subscribe((response) => {
      if (response.result) {
        alert('Vehicle created successfully!')
        this.carSubmitted.emit();
        this.resetForm();

        return;
      }

      alert(response.message);
    })
  }

  updateCar(carData: Partial<Car>) {
    this.carService.updateCar(carData).subscribe((response) => {
      if (response.result) {
        alert('Vehicle updated successfully!')
        this.carSubmitted.emit();

        return;
      }

      alert(response.message);
    })
  }

  resetForm() {
    this.vehicleForm.reset();
  }
}
