import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { Router } from '@angular/router';

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
    description: ''
  };

  constructor(private router: Router) {}

  submitGrant() {
    if (this.newGrant.title && this.newGrant.description) {
      // 1. Generate ID automatically (e.g., G-171075...)
      const generatedId = 'G-' + Math.floor(Math.random() * 10000);

      // 2. Data to send to Database
      const grantData = {
        id: generatedId,
        ...this.newGrant
      };

      console.log("Saving to Database:", grantData);

      // 3. Success Feedback
      alert(`Grant ${generatedId} added successfully!`);
      
      // 4. Navigate back to dashboard to see the update
      this.router.navigate(['/admin-dashboard']);
    } else {
      alert("Please fill in all fields.");
    }
  }

  goToAdminProfile() {
      this.router.navigate(['/admin-profile']);
    }
    
  cancel() {
    this.router.navigate(['/admin-dashboard']);
  }
}