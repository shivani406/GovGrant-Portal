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
  console.log("Starting profile fetch for ID:", id);

  // Test ONLY the admin profile first
  this.grantService.getAdminProfile(id).subscribe({
    next: (data) => {
      console.log("ADMIN DATA RECEIVED:", data);
      this.adminDetails = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error("ADMIN API FAILED:", err)
  });

  // Test Grants count separately
  this.grantService.getAllGrants().subscribe({
    next: (data) => {
      console.log("GRANTS RECEIVED:", data.length);
      this.stats.grantsPublished = data.length;
    },
    error: (err) => console.error("GRANTS API FAILED:", err)
  });

  // Test Applications separately
  this.grantService.getAllApplications().subscribe({
    next: (data) => {
      console.log("APPS RECEIVED:", data.length);
      this.stats.grantsApproved = data.filter((a: any) => a.application_status === 'Approved').length;
      this.stats.grantsRejected = data.filter((a: any) => a.application_status === 'Rejected').length;
    },
    error: (err) => console.error("APPS API FAILED:", err)
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