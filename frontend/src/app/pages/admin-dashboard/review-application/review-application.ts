import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-application.html',
  styleUrls: ['./review-application.css']
})

export class ReviewApplication implements OnInit {
  applicationId: string | null = '';
  // This object mimics data fetched from your database
  applicationData: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // 1. Get the ID from the URL
    this.applicationId = this.route.snapshot.paramMap.get('id');
    
    // 2. Mock Database Fetch (Replace with your API service later)
    this.fetchApplicationDetails(this.applicationId);
  }

  fetchApplicationDetails(id: string | null) {
    // Simulate database data based on your Grant Portal workflow
    this.applicationData = {
      fullName: 'Rahul Sharma',
      email: 'rahul@example.com',
      grantType: 'Education Fund',
      incomeDetails: '5,00,000 per annum',
      reason: 'Support for Higher Studies in Computer Engineering.',
      status: 'Pending'
    };
  }

    goToAdminProfile() {
      this.router.navigate(['/admin-profile']);
    }
  
    approveApplication() {
    alert("Application Approved successfully!");
    // Optional: Navigate back to dashboard after approval
    this.router.navigate(['/admin-dashboard']);
}

  rejectApplication() {
    const reason = confirm("Are you sure you want to reject this application?");
    if (reason) {
        alert("Application Rejected.");
        this.router.navigate(['/admin-dashboard']);
    }
}
}