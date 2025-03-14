import { AfterViewInit, Component, EventEmitter, inject, Output } from '@angular/core';
import { CarService } from '../../service/car.service';
import { Modal } from 'bootstrap';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-car-modal',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-car-modal.component.html',
  styleUrl: './create-car-modal.component.css'
})
export class CreateCarModalComponent {
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
  @Output() carCreated = new EventEmitter();

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

  saveCar(event: Event) {
    event.preventDefault();

    this.carService.createCar(this.vehicleForm.value).subscribe((response: any) => {
      if (response.result) {
        alert('Vehicle created successfully!')
        this.carCreated.emit();
        this.resetForm();

        return;
      }

      alert(response.message);
    })
  }

  resetForm() {
    this.vehicleForm.reset();
  }
}
