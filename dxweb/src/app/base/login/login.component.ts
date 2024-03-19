import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
   }

   login() {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/users']); // Redirige al usuario a la ruta de la lista de usuarios
      },
      (error) => {
        if (error.status === 0) {
          this.errorMessage = 'Error de conexión: No se pudo conectar al servidor.';
        } else {
          this.errorMessage = error.error.detail;
        }
      }
    );
  }
}

