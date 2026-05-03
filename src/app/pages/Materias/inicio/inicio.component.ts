import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { EstudianteService } from '../../../core/services/estudiante.service';
import { Materia } from '../../../core/models/estudiante';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, MessageModule],
  templateUrl: './inicio.component.html',
})
export default class InicioComponent implements OnInit, OnDestroy {
  private routerSub!: Subscription;
  items: MenuItem[] | undefined;
  materiasInscritas: Materia[] = [];
  private router = inject(Router);
  private estudianteService = inject(EstudianteService);
  private login = inject(AuthService);
  private toastService = inject(ToastService);
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
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.cerrarSesion();
        },
      },
    ];
    this.obtenerMateriasInscritas();
    // Suscribirse a los eventos de navegación del router
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        // Detecta si estás de nuevo en /inicio exactamente
        if (this.router.url.startsWith('/inicio')) {
          this.obtenerMateriasInscritas();
        }
      });
  }

  obtenerMateriasInscritas() {
    this.estudianteService.materiasInscritas().subscribe({
      next: (response) => {
        this.materiasInscritas = response;
        this.estudianteService.setNroInscritas(this.materiasInscritas.length);
      },
      error: () => {
        this.toastService.showMessage(
          'error',
          3000,
          'Error',
          'No fue posible cargar tus materias inscritas.'
        );
      },
    });
  }
  cerrarSesion() {
    this.login.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
