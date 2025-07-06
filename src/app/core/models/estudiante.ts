export interface Materia {
  idMateria: number;
  nombreMateria: string;
  creditos: number;
}

export interface MateriaProfesor {
  idMateria: number;
  nombreMateria: string;
  creditos: number;
  idProfesor: string;
  nombreProfesor: string;
}

export interface EstudianteMateria {
  idMateria: number;
  nombreMateria: string;
  nombreEstudiante: string;
}
