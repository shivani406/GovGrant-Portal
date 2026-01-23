import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLogin {
  adminLoginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onAdminLogin() {
    if (this.adminLoginForm.valid) {
      const { email, password } = this.adminLoginForm.value;
      
      // Placeholder for Database/API call
      if (email === 'admin@system.com' && password === 'admin123') {
        alert('Admin Login Authorized');
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.errorMessage = 'Unauthorized access. Please check admin credentials.';
      }
    }
  }
}