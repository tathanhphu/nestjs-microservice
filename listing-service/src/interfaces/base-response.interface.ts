export interface IBaseResponse {
  status: number;
  message?: string;
  errors?: {
    [key: string]: any 
  }
}

 