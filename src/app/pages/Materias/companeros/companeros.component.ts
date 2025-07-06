import { Component, inject, OnInit } from '@angular/core';
import { EstudianteService } from '../../../core/services/estudiante.service';
import { EstudianteMateria } from '../../../core/models/estudiante';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-companeros',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, ButtonModule],
  templateUrl: './companeros.component.html',
})
export default class CompanerosComponent implements OnInit {
  private estudianteService = inject(EstudianteService);
  materiasCompaneros: EstudianteMateria[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.estudianteService.getMateriasCompaneros().subscribe({
      next: (response) => {
        this.materiasCompaneros = response;
        this.loading = false;
      },
    });
  }
}
