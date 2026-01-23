import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-signup.html',
  styleUrls: ['./admin-signup.css']
})
export class AdminSignup {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.adminForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      //adminCode: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{5,10}$')]], // Example: EMP123
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      console.log('Admin Data:', this.adminForm.value);
      // Here you would typically call your authentication service
      alert('Admin Account Created Successfully!');
      this.router.navigate(['/admin-login']);
    } else {
      this.adminForm.markAllAsTouched();
    }
  }
}