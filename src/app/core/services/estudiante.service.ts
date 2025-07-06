import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  EstudianteMateria,
  Materia,
  MateriaProfesor,
} from '../models/estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private readonly apiUrl = 'https://localhost:7230/api';
  private http = inject(HttpClient);
  nroInscritas = signal<number>(0);

  materiasInscritas() {
    return this.http.get<Materia[]>(
      `${this.apiUrl}/Estudiantes/materias-inscritas`
    );
  }

  ObtenerMateriasDisponibles() {
    return this.http.get<MateriaProfesor[]>(
      `${this.apiUrl}/Estudiantes/materias-disponibles`
    );
  }

  RegistrarMateriasSeleccionadas(materiasSeleccionadas: number[]) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/Estudiantes/registrar-materias`,
      materiasSeleccionadas
    );
  }

  getMateriasCompaneros() {
    return this.http.get<EstudianteMateria[]>(
      `${this.apiUrl}/Estudiantes/companeros`
    );
  }

  getNroInscritas() {
    return this.nroInscritas();
  }
  setNroInscritas(nro: number) {
    this.nroInscritas.set(nro);
  }
}
