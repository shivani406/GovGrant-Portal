import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.css']
})
export class ApplicationForm implements OnInit {
  // This object matches your SQL table exactly
  formData = {
    citizen_id: 1, // Default for now
    grant_id: 0,
    applicant_name: '',
    applicant_email: '',
    applicant_phone_number: '',
    applicant_gender: 'male',
    applicant_age: null,
    applicant_address: '',
    applicant_income: null,
    applicant_profession: '',
    applicant_verification_type: 'aadhar',
    applicant_verification_number: '',
    applied_at: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    applicant_disability_status: false
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formData.grant_id = +id; // Convert string to number
    }
  }

  goBack() {
  this.router.navigate(['/citizen-dashboard']);
  }

  submitApplication() {
    console.log('Sending to Database:', this.formData);
    // Next step: Call a service.post() method here
    alert('Application data captured! Ready to send to MySQL.');
    this.router.navigate(['/citizen-dashboard']);
  }
}