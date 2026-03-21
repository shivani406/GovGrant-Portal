import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GrantService } from '../../services/grant';

@Component({
  selector: 'app-citizen-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './citizen-signup.html',
  styleUrls: ['./citizen-signup.css']
})
export class CitizenSignup {
  citizenForm: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router, private grantService: GrantService) {
    this.citizenForm = this.fb.group({
      citizen_name: ['', [Validators.required, Validators.minLength(3)]],
      citizen_email: ['', [Validators.required, Validators.email]],
      citizen_password: ['', [Validators.required, Validators.minLength(6)]],
      citizen_phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  onSignup() {
    if (this.citizenForm.valid) {
      console.log('Step 1: Data is valid, sending...', this.citizenForm.value);
      
      // 3. Changed 'this.signupForm' to 'this.citizenForm'
      this.grantService.signup(this.citizenForm.value).subscribe({
        next: (response) => {
          console.log("✅ Step 2: Success from Server!", response);
          alert("Signup Successful!");
          this.router.navigate(['/citizen-login']);
        },
        error: (err) => {
          console.error("❌ Step 2: HTTP Error!", err);
          alert("Signup Failed: Check if Node is running.");
        }
      });
    } else {
      console.log("❌ Form is invalid. Check your inputs!");
    }
  }
}