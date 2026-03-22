import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GrantService } from '../../../services/grant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-profile.html',
  styleUrls: ['./admin-profile.css']
})
export class AdminProfile implements OnInit {
  
  adminDetails: any = null;

 stats = {
    grantsApproved: 0,
    grantsRejected: 0,
    grantsPublished: 0
  };

  constructor(
    private router: Router, 
    private grantService: GrantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  // 1. Grab the ID directly from the key you used in Login
  const id = localStorage.getItem('admin_id');
  
  if (id) {
    console.log("Found Admin ID in storage:", id);
    // Convert string "18" to number 18 and load
    this.loadCompleteProfile(Number(id));
  } else {
    console.error("No admin_id found in localStorage. Redirecting...");
    this.router.navigate(['/admin-login']);
  }
}

  loadCompleteProfile(id: number) {
  // 1. Fetch Admin Details
  this.grantService.getAdminProfile(id).subscribe({
    next: (data) => {
      this.adminDetails = data;
      this.cdr.detectChanges();
    }
  });

  // 2. Fetch specific count of grants published by THIS admin
  this.grantService.getAdminGrantsCount(id).subscribe({
    next: (data) => {
      
      this.stats.grantsPublished = data.count;
      this.cdr.detectChanges();
    }
  });

  // 3. Fetch applications and filter by LOWERCASE status
  this.grantService.getAllApplications().subscribe({
  next: (data: any[]) => {
    console.log("Raw Applications for Stats:", data);
    
    // Use .toLowerCase() to ensure it matches regardless of how it's stored in SQL
    this.stats.grantsApproved = data.filter(a => 
      a.application_status?.toLowerCase() === 'approved'
    ).length;

    this.stats.grantsRejected = data.filter(a => 
      a.application_status?.toLowerCase() === 'rejected'
    ).length;

    this.cdr.detectChanges();
  }
});
  this.grantService.getAdminGrantsCount(id).subscribe({
    next: (data) => {
      console.log("MY GRANTS COUNT:", data.count);
      this.stats.grantsPublished = data.count;
      this.cdr.detectChanges(); // Ensure the UI sees the change
    },
    error: (err) => console.error("GRANTS COUNT API FAILED:", err)
  });

}
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}