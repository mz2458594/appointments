import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Doctor, Schedules, Specialty } from '../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  private http = inject(HttpClient)

  getSpecialty(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>('assets/specialty.json')
  }

  getDoctorsBySpecialty(idSpecialty: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('assets/doctors.json').pipe(
      map(value => {
        return value.filter(doctor => doctor.especialidad.id === idSpecialty)
      })
    )
  }

  getSchedulesByDoctor(doctorId: number): Observable<Schedules[]> {
    return this.http.get<Schedules[]>('assets/schedules.json').pipe(
      map(value => value.filter(schedule => schedule.doctor.id === doctorId))
    )
  }




}
