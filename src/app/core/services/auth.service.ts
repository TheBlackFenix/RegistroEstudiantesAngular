import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken, LoginDto, RegistroDto } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly apiUrl = 'https://localhost:7230/api';
  public readonly isAuthenticated = computed(() => this._isAuthenticated());
  private http = inject(HttpClient);
  private router = inject(Router);
  private _isAuthenticated = signal<boolean>(this.tieneTokenValido());

  login(dto: LoginDto) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/Autenticacion/login`,
      dto
    );
  }

  registro(dto: RegistroDto) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/Autenticacion/registro`,
      dto
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  guardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._isAuthenticated.set(true);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get usuario(): DecodedToken | null {
    const token = this.token;
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  private tieneTokenValido(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const ahora = Math.floor(Date.now() / 1000);
      return decoded.exp > ahora;
    } catch {
      return false;
    }
  }
}
