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
    if (this.newGrant.title && this.newGrant.description && this.newGrant.deadline) {
      const grantData = {
        grant_title: this.newGrant.title,
        grant_desc: this.newGrant.description,
        grant_amount: this.newGrant.amount,
        max_income_limit: this.newGrant.income_limit,
        department: this.newGrant.department,
        application_deadline: this.newGrant.deadline,
        created_at: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        created_by: 1 
      };

      this.grantService.addGrant(grantData).subscribe({
        next: (response) => {
          alert("Grant Published!");
          this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => console.error("Error:", err)
      });
    }
  }


  goToAdminProfile() {
      this.router.navigate(['/admin-profile']);
    }
    
  cancel() {
    this.router.navigate(['/admin-dashboard']);
  }
}