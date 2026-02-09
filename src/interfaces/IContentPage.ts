export interface IContentPage {
  Id: number;
  Titule: string | null;
  Description: string | null;
  UrlImage: string | null;
  Page: string | null;
  ComponentPage: string | null;
}

// Para la creación y edición
export interface IContentPagePayload {
  Titule?: string;
  Description?: string;
  Page?: string;
  ComponentPage?: string;
  image?: File | null;
}