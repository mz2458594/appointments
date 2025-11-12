import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Specialty } from '../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  private http = inject(HttpClient)

  getSpecialty(): Observable<Specialty[]> {

    return this.http.get<Specialty[]>('../../../../public/assets/specialty.json').pipe(
      tap(value => console.log(value))
    )

  }

  getDoctors(){

  }

  getSchedules(){

  }




}
