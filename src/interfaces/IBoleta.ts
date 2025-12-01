export interface BoletaData {
  id: number;
  identity_id: number;
  curp: string;
  alumno: string;
  numero_control: string;
  src_sha256: string;
  created_at: string;
  updated_at: string;
  items: BoletaItem[];
}

export interface BoletaItem {
  clave_uac: string;
  semestre: number;
  nombre: string;
  calif1: string | null;
  calif2: string | null;
  calif3: string | null;
  asis1: number | null;
  asis2: number | null;
  asis3: number | null;
  acreditado: string | null;
}
