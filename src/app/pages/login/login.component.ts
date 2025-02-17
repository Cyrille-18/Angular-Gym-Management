import { Component } from '@angular/core';
import { AuthService } from '../../services/authservice/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errormessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: async (response) => {
        await this.authService.setToken(response.token);

        const roles = this.authService.getUserRoles();
        if (roles.length === 0) {
          this.router.navigate(['/userhome']);
        } else {
          this.router.navigate(['/app/Accueil']);
        }
      },
      error: (err) => {
        this.errormessage = err.error.message;
      },
    });
  }
}
