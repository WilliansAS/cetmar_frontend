export interface Student {
  Id: number;
  User_Name: string;
  User_Email: string;
  FK_Rol_ID: number;
  Telephone: number;
  FK_Identity_ID: number;
  Matricula: number;
  Numero_Control: string;
  CURP: string | null;
  Grupo: string | null;
  Carrera: string;
}
