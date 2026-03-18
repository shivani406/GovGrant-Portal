import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-profile.html',
  styleUrls: ['./admin-profile.css']
})
export class AdminProfile implements OnInit {
  // 1. Admin Identity Data (to be fetched from DB/Session)
  adminDetails = {
    name: 'Mihika Upadhyay',
    email: 'admin.mihika@gov.in',
    role: 'Senior Grant Administrator',
    department: 'Ministry of Education & Technology',
    joinedDate: 'January 2024'
  };

  // 2. Statistics Data (calculated from DB)
  stats = {
    grantsApproved: 124,
    grantsRejected: 45,
    grantsPublished: 12
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // This is where you would call your Database Service to fetch 
    // the real stats for this specific admin.
    console.log("Fetching admin profile data...");
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}