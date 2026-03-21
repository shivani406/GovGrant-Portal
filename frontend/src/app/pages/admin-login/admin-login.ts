import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GrantService } from '../../services/grant';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private grantService: GrantService
  ) {
    this.adminLoginForm = this.fb.group({
      admin_email: ['', [Validators.required, Validators.email]],
      admin_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onAdminLogin() {
    if (this.adminLoginForm.valid) {
      this.grantService.adminLogin(this.adminLoginForm.value).subscribe({
        next: (res) => {
          alert('Admin Login Authorized');
          // Store admin info so the dashboard knows who is logged in
          localStorage.setItem('admin_id', res.admin_id);
          localStorage.setItem('admin_name', res.admin_name);
          
          this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Unauthorized access. Please check credentials.';
        }
      });
    }
  }
}