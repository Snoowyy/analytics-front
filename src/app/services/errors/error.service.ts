import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error: IErrors = <IErrors>{
    code: 0,
    message: '',
    title: '',
    redirectoUrl: '',
    imageUrl: '',
  };

  fetch = false;

  constructor() { }
}

export interface IErrors {
  code: number;
  title: string;
  message: string;
  redirectoUrl: string;
  imageUrl: string;
}
