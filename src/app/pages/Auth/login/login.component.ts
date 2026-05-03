import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { LoginDto } from '../../../core/models/auth';
import { AuthService } from '../../../core/services/auth.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastService } from '../../../core/services/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputNumberModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  cargando = false;
  private toastService = inject(ToastService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    // se define idEstudiante como entero y clave como cadena
    idEstudiante: [
      null,
      [Validators.required, Validators.min(1), Validators.max(999999999)],
    ],

    clave: ['', Validators.required],
  });

  login() {
    if (this.form.invalid) return;
    this.cargando = true;
    const loginDto: LoginDto = {
      idEstudiante: this.form.value.idEstudiante!,
      clave: this.form.value.clave!,
    };
    this.auth
      .login(loginDto)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (res) => {
          this.auth.guardarToken(res.token);
          this.router.navigate(['/inicio']);
        },
        error: () => {
          this.toastService.showMessage(
            'error',
            3000,
            'Error',
            'Credenciales incorrectas'
          );
        },
      });
  }
}
