import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { EstudianteService } from '../../../core/services/estudiante.service';
import { Materia } from '../../../core/models/estudiante';
import { filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, MessageModule],
  templateUrl: './inicio.component.html',
})
export default class InicioComponent implements OnInit, OnDestroy {
  private routerSub!: Subscription;
  items: MenuItem[] | undefined;
  materiasInsritas: Materia[] = [];
  private router = inject(Router);
  private estudianteService = inject(EstudianteService);
  ngOnInit(): void {
    this.items = [
      {
        label: 'Ver Registros',
        icon: 'pi pi-book',
        command: () => {
          this.router.navigate(['/inicio/companeros']);
        },
      },
      {
        label: 'Registrar Materias',
        icon: 'pi pi-pen-to-square',
        command: () => {
          this.router.navigate(['/inicio/registrar-materias']);
        },
      },
    ];
    this.obtenerMateriasInscritas();
    // Suscribirse a los eventos de navegación del router
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        // Detecta si estás de nuevo en /inicio exactamente
        if (
          this.router.url.startsWith('/inicio') ||
          this.router.url == '/inicio'
        ) {
          this.obtenerMateriasInscritas(); // vuelve a hacer la petición
        }
      });
  }

  obtenerMateriasInscritas() {
    this.estudianteService.materiasInscritas().subscribe({
      next: (response) => {
        console.log('Materias inscritas:', response);
        this.materiasInsritas = response;
        this.estudianteService.setNroInscritas(this.materiasInsritas.length);
      },
    });
  }
  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
