import { AfterViewInit, Component, inject } from '@angular/core';
import { Modal } from 'bootstrap';
import { CarService } from '../../service/car.service';
import { Car } from '../../model/car';
import { CreateCarModalComponent } from "../../components/create-car-modal/create-car-modal.component";

@Component({
  selector: 'app-vehicles',
  imports: [CreateCarModalComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements AfterViewInit {
  carService = inject(CarService);

  private createCarModal: Modal | null = null;
  private deleteCarModal: Modal | null = null;

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

    const deleteCarModalElement = document.getElementById('deleteConfirmationModal');

    if (deleteCarModalElement) {
      this.deleteCarModal = new Modal(deleteCarModalElement);
    }
  }

  openCarFormModal() {
    this.createCarModal?.show();
  }

  loadCars() {
    this.carService.getCars().subscribe(response => {
      this.carList = response.data;
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
