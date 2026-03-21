import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GrantService } from '../../services/grant';

@Component({
  selector: 'app-citizen-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './citizen-login.html',
  styleUrls: ['./citizen-login.css']
})
export class CitizenLogin {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private grantService: GrantService
  ) {
    this.loginForm = this.fb.group({
      citizen_email: ['', [Validators.required, Validators.email]],
      citizen_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
    
      this.grantService.login(loginData).subscribe({
        next: (response) => {
          console.log('✅ Login Response:', response);
        
          // SAVE USER DATA TO STORAGE
          localStorage.setItem('citizen_id', response.user.id);
          localStorage.setItem('citizen_name', response.user.name);
          this.router.navigate(['/citizen-dashboard']);
        },
        error: (err) => {
          console.error('❌ Login Error:', err);
          this.errorMessage = err.error.error || 'Login failed. Please try again.';
        }
      });
    }
  }
}