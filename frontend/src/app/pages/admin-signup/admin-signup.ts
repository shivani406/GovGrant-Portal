import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GrantService } from '../../services/grant';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-signup.html',
  styleUrls: ['./admin-signup.css']
})

export class AdminSignup {
  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private grantService: GrantService
  ) {
    this.adminForm = this.fb.group({
      admin_name: ['', [Validators.required, Validators.minLength(3)]],
      admin_email: ['', [Validators.required, Validators.email]],
      admin_password: ['', [Validators.required, Validators.minLength(6)]],
      admin_phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
     });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      // Send the data to your backend
      this.grantService.adminSignup(this.adminForm.value).subscribe({
        next: (res) => {
          alert('Admin Account Created Successfully!');
          this.router.navigate(['/admin-login']);
        },
        error: (err) => {
          console.error("Signup failed", err);
          alert('Error creating admin account: ' + err.error.message);
        }
      });
    } else {
      this.adminForm.markAllAsTouched();
    }
  }
}