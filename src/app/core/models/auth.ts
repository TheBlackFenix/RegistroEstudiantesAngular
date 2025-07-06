export interface LoginDto {
  idEstudiante: number;
  clave: string;
}
export interface RegistroDto {
  idEstudiante: number;
  nombreEstudiante: string;
  claveAcceso: string;
}
export interface DecodedToken {
  id: number;
  nombre: string;
  exp: number;
  iat: number;
  jti: string;
  role: string;
}
