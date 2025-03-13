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

  carList: Car[] = [];
  private createCarModal: Modal | null = null;

  ngAfterViewInit() {
    this.carService.loadCars().subscribe(response => {
      this.carList = response.data;
    });

    const modalElement = document.getElementById('createCarModal');

    if (modalElement) {
      this.createCarModal = new Modal(modalElement);
    }
  }

  openCreateCarModal() {
    if (this.createCarModal) {
      this.createCarModal.show();
    } else {
      console.error("Modal not found!");
    }
  }
}
