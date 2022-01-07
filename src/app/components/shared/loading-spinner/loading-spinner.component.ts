import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner-service.service';

@Component({
  selector: 'app-loading-spinner',
  template:"<div *ngIf='showSpinner' class='ring-div'><div class='lds-ring'><div></div><div></div><div></div><div></div></div></div>",
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  showSpinner = false;
  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

}
