export interface Schedules {
  id:           number;
  doctor:       Doctor;
  especialidad: Specialty;
  foto:         string;
  experiencia:  string;
  consultorio:  string;
  fecha:        Date;
  hora:         string;
  estado:       boolean;
}

export interface Doctor {
  id:           number;
  nombre:       string;
  especialidad: Specialty;
  foto:         string;
  experiencia:  string;
  consultorio:  string;
}

export interface Specialty {
  id:          number;
  nombre:      string;
  descripcion: string;
}

export interface Appointment {
  shedule: Schedules;
}

