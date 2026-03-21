import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GrantService } from '../../services/grant';

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
    citizen_id: 101, // Default for now
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

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private grantService: GrantService
  
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formData.grant_id = +id; // Convert string to number
    }

    const savedId = localStorage.getItem('citizen_id');
      if (savedId) {
        this.formData.citizen_id = +savedId; // It now pulls the actual logged-in ID!
    }
  }

  goBack() {
  this.router.navigate(['/citizen-dashboard']);
  }

  submitApplication() {
    console.log('Attempting to submit:', this.formData);

    // 2. Call the service and SUBSCRIBE
    this.grantService.submitApplication(this.formData).subscribe({
      next: (res) => {
        console.log("✅ Application saved in MySQL:", res);
        alert('Application submitted successfully!');
        this.router.navigate(['/citizen-dashboard']);
      },
      error: (err) => {
        console.error("❌ Submission failed:", err);
        alert('Failed to submit application. Check the console for details.');
      }
    });
  }
}