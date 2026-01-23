import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citizen-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './citizen-signup.html',
  styleUrls: ['./citizen-signup.css']
})
export class CitizenSignup {
  citizenForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.citizenForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validates 10-digit numbers
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignup() {
    if (this.citizenForm.valid) {
      console.log('Citizen Registration Data:', this.citizenForm.value);
      alert('Citizen Account Created Successfully!');
      this.router.navigate(['/citizen-login']);
    } else {
      this.citizenForm.markAllAsTouched();
    }
  }
}