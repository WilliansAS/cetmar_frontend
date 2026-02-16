export interface IContentPayload {
  Title: string;
  Description: string;
  Type: string;
  UrlImage?: string | null;
  UrlDocument?: string | null;
  IsAnAdvice: boolean;
  CreationDate: string;
  EndDate: string;
  IsActive: boolean;
}
