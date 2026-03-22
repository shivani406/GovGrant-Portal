import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { Router } from '@angular/router';
import { GrantService } from '../../../services/grant';

@Component({
  selector: 'app-add-grant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-grant.html',
  styleUrls: ['./add-grant.css']
})
export class AddGrant {
  // Model for the form
  newGrant = {
    title: '',
    description: '',
    amount: 0,
    income_limit: 0,
    department: '',
    deadline: ''
  };

  constructor(
    private router: Router,
    private grantService : GrantService
  ) {}

  
submitGrant() {
    // 1. Get the real ID from the browser's storage
    const loggedInAdminId = localStorage.getItem('admin_id');

    if (this.newGrant.title && this.newGrant.description && this.newGrant.deadline) {
        const grantData = {
            grant_title: this.newGrant.title,
            grant_desc: this.newGrant.description,
            grant_amount: this.newGrant.amount,
            max_income_limit: this.newGrant.income_limit,
            department: this.newGrant.department,
            application_deadline: this.newGrant.deadline,
            created_at: new Date().toISOString().split('T')[0],
            
            // 2. USE THE DYNAMIC ID HERE
            // If the ID is missing, we use 1 as a backup (but it should be 16)
            created_by: loggedInAdminId ? Number(loggedInAdminId) : 1 
        };

        console.log("Publishing Grant as Admin ID:", grantData.created_by);

        this.grantService.addGrant(grantData).subscribe({
            next: (response) => {
                alert("Grant Published successfully!");
                this.router.navigate(['/admin-dashboard']);
            },
            error: (err) => {
                console.error("Submission Error:", err);
                alert("Failed to publish grant.");
            }
        });
    } else {
        alert("Please fill in all required fields.");
    }
}


  goToAdminProfile() {
      this.router.navigate(['/admin-profile']);
    }
    
  cancel() {
    this.router.navigate(['/admin-dashboard']);
  }
}