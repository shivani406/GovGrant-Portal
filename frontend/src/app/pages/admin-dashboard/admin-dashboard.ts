import { Component, OnInit , ChangeDetectorRef } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GrantService } from '../../services/grant';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit { // 1. Implement OnInit
  // We start with empty arrays instead of hardcoded data
  public applications: any[] = [];
  public grants: any[] = [];
  public filteredApplications: any[] = [];

  constructor(
    private router: Router, 
    private grantService: GrantService,
    private cdr: ChangeDetectorRef
  ) {}

  // 3. This runs automatically when the component loads
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Fetch Grants from MySQL
    this.grantService.getAllGrants().subscribe({
      next: (data:any) => {
        
        this.grants = [...data];

        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error fetching grants:", err)
    });

    // Fetch Incoming Applications from MySQL
    this.grantService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = [...data];
        this.filteredApplications = [...data];

        this.filteredApplications = [...this.applications];

        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error fetching applications:", err)
    });
  }

  // Navigation Logic
  goToAdminProfile() {
    this.router.navigate(['/admin-profile']);
  }

  addNewGrant() {
    this.router.navigate(['/add-grant']);
  }

  viewApp(id: string) {
    // Navigate to the review page using the real DB ID
    this.router.navigate(['/review-application', id]);
  }

  // Searching logic (now works on real DB data)
  searchCitizen(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredApplications = this.applications.filter(app => 
      app.applicant_name?.toLowerCase().includes(query) || 
      app.application_id?.toString().includes(query)
    );
  }

  editGrant(id: string) {
    console.log("Editing grant with ID:", id);
  }
}