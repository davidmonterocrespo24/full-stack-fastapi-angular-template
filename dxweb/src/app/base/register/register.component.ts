import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  username: string;
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { 
    this.username = '';
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error.detail;
      }
    );
  }
}
