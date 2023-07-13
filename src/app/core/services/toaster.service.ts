import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  public constructor(private toastr: ToastrService) {}

  private toasterConfig: Partial<IndividualConfig> = {
    timeOut: 5000,
  };

  public showSuccess(message: string, title = ''): void {
    this.toastr.success(message, title, this.toasterConfig);
  }

  public showError(message: string, title = ''): void {
    this.toastr.error(message, title, this.toasterConfig);
  }
}
