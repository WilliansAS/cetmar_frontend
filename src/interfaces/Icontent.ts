export interface IContent {
  Id: number;
  Title: string;
  Description: string;
  Type: string;
  UrlImage: string | null;
  UrlDocument: string | null;
  IsAnAdvice: boolean;
  CreationDate: string;
  EndDate: string;
  IsActive: boolean;
}
