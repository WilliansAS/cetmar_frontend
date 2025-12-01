export interface User {
  Id: number;
  User_Name: string;
  User_Email: string;
  Telephone: number;
}

export interface UsersCountResponse {
  total_usuarios: number;
}

export interface IUpdateUserPayload {
  Id: number;
  User_Name: string;
  User_Email: string;
  FK_Rol_ID: number;
  Telephone: number;
  FK_Identity_ID: number;
}
