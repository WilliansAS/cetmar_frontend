export interface IContent {
  Id: number;
  Titule: string;
  Description: string;
  Type: string;
  UrlImage?: string;
  UrlDocument?: string;
  IsAnAdvice: boolean;
  CreationDate: string;
  EndDate: string;
  IsActive: boolean;
  Page?: string; // Optional if used for filtering by page
}

export interface IContentPayload {
  Titule: string;
  Description: string;
  Type: string;
  image?: File | null;
  document?: File | null;
  IsAnAdvice: boolean;
  CreationDate?: string;
  EndDate?: string;
  IsActive?: boolean;
  Page?: string;
}
