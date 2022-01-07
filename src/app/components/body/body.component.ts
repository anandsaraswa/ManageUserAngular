import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  name:String
  role:String
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.name = this.authService.getName
    this.role = this.authService.getRole
  }
}
