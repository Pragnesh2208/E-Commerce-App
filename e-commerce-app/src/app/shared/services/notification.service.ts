import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  success(successMessage: string): void {
    Swal.fire('', successMessage, 'success');
  }
  failed(failedMessage: string): void {
    Swal.fire('', failedMessage, 'error');
  }
}
