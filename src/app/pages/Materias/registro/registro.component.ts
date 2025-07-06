import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { MateriaProfesor } from '../../../core/models/estudiante';
import { EstudianteService } from '../../../core/services/estudiante.service';
import { ToastService } from './../../../core/services/toast.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    TableModule,
    CheckboxModule,
    FormsModule,
    MessageModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './registro.component.html',
})
export default class RegistroComponent implements OnInit {
  private estudianteService = inject(EstudianteService);
  materiasDisponibles: MateriaProfesor[] = [];
  materiasSeleccionadas: number[] = [];
  private router = inject(Router);
  readonly maxMaterias = 3 - this.estudianteService.getNroInscritas();
  toastService = inject(ToastService);
  ngOnInit(): void {
    this.estudianteService.ObtenerMateriasDisponibles().subscribe({
      next: (response) => {
        this.materiasDisponibles = response.map((materia) => ({
          ...materia,
          seleccionada: false,
          deshabilitada: false,
        }));
      },
    });
  }

  esMateriaSeleccionada(idMateria: number): boolean {
    return this.materiasSeleccionadas.includes(idMateria);
  }

  esMateriaDeshabilitada(materia: MateriaProfesor): boolean {
    // Si ya está seleccionada, no está deshabilitada
    if (this.esMateriaSeleccionada(materia.idMateria)) {
      return false;
    }

    // Si ya se alcanzó el máximo de materias, deshabilitar las no seleccionadas
    if (this.materiasSeleccionadas.length >= this.maxMaterias) {
      return true;
    }

    // Si hay una materia seleccionada del mismo profesor, deshabilitar esta
    const profesorYaSeleccionado = this.materiasDisponibles.some(
      (m) =>
        this.esMateriaSeleccionada(m.idMateria) &&
        m.nombreProfesor === materia.nombreProfesor &&
        m.idMateria !== materia.idMateria
    );

    return profesorYaSeleccionado;
  }

  onMateriaSeleccionada(materia: MateriaProfesor, evento: any): void {
    const isChecked = evento.checked;

    if (isChecked) {
      // Agregar materia si no está en el límite
      if (this.materiasSeleccionadas.length < this.maxMaterias) {
        this.materiasSeleccionadas.push(materia.idMateria);
      }
    } else {
      // Remover materia
      const index = this.materiasSeleccionadas.indexOf(materia.idMateria);
      if (index > -1) {
        this.materiasSeleccionadas.splice(index, 1);
      }
    }
  }

  get materiasRestantes(): number {
    return this.maxMaterias - this.materiasSeleccionadas.length;
  }

  registrarMaterias(): void {
    if (this.materiasSeleccionadas.length === 0) {
      this.toastService.showMessage(
        'error',
        3000,
        'Error',
        'Debe seleccionar al menos una materia.'
      );
      return;
    }
    this.estudianteService
      .RegistrarMateriasSeleccionadas(this.materiasSeleccionadas)
      .subscribe({
        next: (response: { message: string }) => {
          this.toastService.showMessage(
            'success',
            3000,
            'Exito',
            'Materias registradas correctamente.'
          );
          this.router.navigate(['/inicio']);
        },
      });
  }
}
