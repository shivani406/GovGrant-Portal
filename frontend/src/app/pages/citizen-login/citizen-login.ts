import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Attempting login with:', loginData);

      // TODO: Replace this with an Actual Service Call to your Backend/Database
      // Example logic:
      if (loginData.email === 'test@citizen.com' && loginData.password === '123456') {
        alert('Login Successful!');
        this.router.navigate(['/citizen-dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    }
  }
}