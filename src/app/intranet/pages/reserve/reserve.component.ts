import { Component, computed, effect, inject, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AppointmentService } from '../../services/appointment.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { Doctor, Schedules, Specialty } from '../../interfaces/appointment.interface';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-reserve',
  imports: [CardComponent, ReactiveFormsModule
    , JsonPipe
  ],
  templateUrl: './reserve.component.html',
})
export class ReserveComponent {
  step = signal<number>(1)

  service = inject(AppointmentService)
  fb = inject(FormBuilder)

  specialtyControl = this.fb.control<Specialty | null>(null, [Validators.required]);
  doctorControl = this.fb.control<Doctor | null>(null, [Validators.required]);
  scheduleControl = this.fb.control<Schedules | null>(null, [Validators.required]);

  reserveForm = this.fb.group({
    schedule: this.scheduleControl
  })


  doctors = signal<Doctor[]>([])
  schedules = signal<Schedules[]>([])
  specialty = signal<Specialty[]>([])

  filterText = signal<string>('')

  specialtyFilter(value: string) {
    setTimeout(() => {
      this.filterText.set(value)
    }, 1000);
  }

  filterValue = computed(() =>
    this.specialty().filter(sp => sp.nombre.toLowerCase().includes(this.filterText()))
  )


  onFormChanged = effect((onCleanUp) => {
    const sheduleSubscription = this.onSheduleChange()

    onCleanUp(() => {
      sheduleSubscription?.unsubscribe()
    })
  })

  specialtyResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.service.getSpecialty().pipe(
        tap(value => this.specialty.set(value))
      )
    }
  }) ?? []

  getDoctors(id: number) {
    this.service.getDoctorsBySpecialty(id).pipe(
      tap(value => {
        this.step.set(2)
        this.doctors.set(value)
      }),
    ).subscribe()
  }


  getShedules(id: number) {
    this.service.getSchedulesByDoctor(id).pipe(
      tap(value => {
        this.schedules.set(value)
        this.step.set(3)
      })
    ).subscribe()


  }

  onSheduleChange() {
    console.log('cambio')
    return this.reserveForm.get('schedule')?.valueChanges.pipe(
    ).subscribe(value => {
      this.step.set(4)
      console.log(this.step())
    })
  }




  goBack() {
    this.step.update(prev => {
      if (prev - 1 < 1) return 1
      return prev - 1
    })
  }




}
