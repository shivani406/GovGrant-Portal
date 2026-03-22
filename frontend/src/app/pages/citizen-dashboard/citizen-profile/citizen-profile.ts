import { Component , OnInit , ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrantService } from '../../../services/grant';

@Component({
  selector: 'app-citizen-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen-profile.html',
  styleUrls: ['./citizen-profile.css']
})

export class CitizenProfile implements OnInit {
  
  citizen: any = null;

  constructor(
    private grantService: GrantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Get the ID we saved in Login
    const loggedInId = localStorage.getItem('citizen_id');

    if (!loggedInId) {
    console.error("❌ No Citizen ID found! Redirecting to login...");
    // this.router.navigate(['/login']); // Optional: Add Router to your constructor
    return;
  }
    if (loggedInId) {
      // 2. Fetch the data from MySQL
      this.grantService.getCitizenProfile(loggedInId).subscribe({
        next: (data) => {
          this.citizen = {
            id: data.profile.citizen_id,
            name: data.profile.citizen_name,
            email: data.profile.citizen_email,
            phone: data.profile.citizen_phone_number,
            applications: data.applications // Array of their submitted forms
          };
          console.log("✅ Profile Loaded:", this.citizen);
          this.cdr.detectChanges();
        },
        error: (err) => console.error("❌ Could not load profile", err)
      });
    }
  }

  getStatusClass(status: string) {
    // Note: If you don't have a 'status' column yet, it will default to 'Applied'
    const s = status || 'Applied'; 
    return {
      'approved': s === 'Approved',
      'applied': s === 'Applied',
      'rejected': s === 'Rejected'
    };
  }
}