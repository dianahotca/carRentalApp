import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { Modal } from 'bootstrap';
import { CarService } from '../../service/car/car.service';
import { Car } from '../../model/car';
import { CreateCarModalComponent } from "../../components/create-car-modal/create-car-modal.component";
import { MasterService } from '../../service/master/master.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  imports: [CreateCarModalComponent, NgIf],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements AfterViewInit, OnDestroy {
  private createCarModal: Modal | null = null;
  private masterService = inject(MasterService);
  private carService = inject(CarService);

  isLoading = true;
  carList: Car[] = [];
  selectedCar: Car | null = null;
  selectedCarId: number | null = null;

  ngAfterViewInit() {
    this.loadCars();

    const createCarModalElement = document.getElementById('createCarModal');

    if (createCarModalElement) {
      this.createCarModal = new Modal(createCarModalElement);

      createCarModalElement.addEventListener('hidden.bs.modal', () => {
        this.selectedCar = null;
      });
    }
  }

  constructor() {
    this.masterService.searchData.subscribe((carSearchItem) => {
      if (carSearchItem) {
        const filteredCarList = this.carList.filter(car => (car.brand || car.model).includes(carSearchItem))
        this.carList = filteredCarList;

        return;
      }

      this.loadCars();
    })
  }

  ngOnDestroy() {
    this.masterService.searchData.next("");
  }

  openCarFormModal() {
    this.createCarModal?.show();
  }

  loadCars() {
    this.isLoading = true;
    this.carService.getCars().subscribe(response => {
      if (response.result) {
        this.carList = response.data;
        this.isLoading = false;

        return;
      }

      alert(response.message);
      this.isLoading = false;
    });
  }

  editCar(car: Car) {
    this.selectedCar = car;
    this.openCarFormModal();
  }

  setSelectedCarId(carId: number) {
    this.selectedCarId = carId;
  }

  deleteCar() {
    if (this.selectedCarId) {
      this.carService.deleteCar(this.selectedCarId).subscribe(response => {
        if (response.result) {
          alert("Car deleted successfully!");
          this.loadCars();
          this.selectedCarId = null;

          return;
        }

        alert(response.message);
      });
    }
  }
}
