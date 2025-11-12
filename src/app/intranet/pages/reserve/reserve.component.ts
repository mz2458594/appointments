import { Component, inject, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AppointmentService } from '../../services/appointment.service';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-reserve',
  imports: [CardComponent],
  templateUrl: './reserve.component.html',
})
export class ReserveComponent {
  step = signal<number>(1)

  service = inject(AppointmentService)

  specialtyResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.service.getSpecialty()
    }
  }) ?? []

  changeStep() {
    this.step.update(prev => {
      if (prev + 1 > 3) return 1
      return prev + 1
    })
  }

}
