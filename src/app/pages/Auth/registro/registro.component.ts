import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginDto, RegistroDto } from '../../../core/models/auth';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputNumberModule,
    InputTextModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './registro.component.html',
})
export default class RegistroComponent {
  cargando = false;
  private toastService = inject(ToastService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group(
    {
      idEstudiante: [null, [Validators.required, Validators.min(1)]],
      nombreEstudiante: ['', [Validators.required, Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      confirmaClave: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl) {
    const clave = control.get('clave');
    const confirmaClave = control.get('confirmaClave');

    if (!clave || !confirmaClave) {
      return null;
    }

    return clave.value === confirmaClave.value
      ? null
      : { passwordMismatch: true };
  }

  // Getter para verificar si las contraseñas no coinciden
  get passwordMismatch() {
    return (
      this.form.hasError('passwordMismatch') &&
      this.form.get('confirmaClave')?.touched
    );
  }

  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.showMessage(
        'warn',
        3000,
        'Formulario inválido',
        'Por favor, corrige los errores en el formulario'
      );
      return;
    }

    this.cargando = true;

    // Crear el DTO sin la confirmación de clave
    const registroDto: RegistroDto = {
      idEstudiante: this.form.value.idEstudiante!,
      nombreEstudiante: this.form.value.nombreEstudiante!,
      claveAcceso: this.form.value.clave!,
    };

    this.auth.registro(registroDto).subscribe({
      next: (res: { message: string }) => {
        this.cargando = false;
        this.toastService.showMessage(
          'success',
          3000,
          'Éxito',
          'Registro exitoso'
        );
        this.router.navigate(['/login']);
      },
      error: () => {
        this.cargando = false;
        this.toastService.showMessage(
          'error',
          3000,
          'Error',
          'Error en el registro, intente nuevamente'
        );
      },
    });
  }
}
