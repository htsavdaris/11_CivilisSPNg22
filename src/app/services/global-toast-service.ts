import { Injectable, Service } from '@angular/core';
import { toast } from '@spartan-ng/brain/sonner';

@Injectable({
  providedIn: 'root'
})
export class GlobalToastService {

  TOAST_KEY: string = 'global-toast';
  STICKY: boolean = true;



  showSuccessToast(summary: string, detail: string): void {
    this.showToast(summary, detail, 'info');
  }

  showInfoToast(summary: string, detail: string): void {
    this.showToast(summary, detail, 'info');
  }
  showWarnToast(summary: string, detail: string): void {
    this.showToast(summary, detail, 'warn');
  }

  showErrorToast(summary: string, detail: string): void {
    this.showToast(summary, detail, 'error');
  }

   showToast(title: string,
    detail: string, severity: string): void {
    switch (severity) {
      case 'info':
        toast.info(title, { description: detail, duration: this.STICKY ? 0 : 5000, id: this.TOAST_KEY, position: 'top-right' });
        break;
      case 'warn':
        toast.warning(title, { description: detail, duration: this.STICKY ? 0 : 5000, id: this.TOAST_KEY, position: 'top-right' });
        break;
      case 'error':
        toast.error(title, { description: detail, duration: this.STICKY ? 0 : 5000, id: this.TOAST_KEY, position: 'top-right' });
        break;
      case 'success':
        toast.success(title, { description: detail, duration: this.STICKY ? 0 : 5000, id: this.TOAST_KEY, position: 'top-right' });
        break;

    };
}
}
