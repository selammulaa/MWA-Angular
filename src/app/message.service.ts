import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  successMessage: string = null;
  errorMessage: string = null;

  constructor() { }

  clearMessage():  void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  showSuccessMessage(message: string): void{
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  showErrorMessage(message: string): void{
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
