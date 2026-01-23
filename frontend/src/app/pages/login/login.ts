import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-selection',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginSelection {
  constructor(private router: Router) {}

  goToLogin(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/admin-login']);
    } else {
      this.router.navigate(['/citizen-login']);
    }
  }
}