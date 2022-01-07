import { Component } from '@angular/core';
import { SpinnerService } from './service/spinner-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ManageUser';

  constructor(public spinnerService: SpinnerService) { }
  
}
