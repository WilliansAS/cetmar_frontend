export interface IAnnouncementPayload {
  Titule: string;
  Description: string;
  Type: string;
  UrlImage?: string | null;
  UrlDocument?: string | null;
  IsAnAdvice: boolean;
  CreationDate: string;
  EndDate: string | null;
  IsActive: boolean;
}

export interface IAnnouncement {
  Id: number;
  Titule: string;
  Description: string;
  Type: string;
  UrlImage: string | null;
  UrlDocument: string | null;
  IsAnAdvice: boolean;
  CreationDate: string;
  EndDate: string;
  IsActive: boolean;
}
