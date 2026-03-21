import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GrantService } from '../../services/grant';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen-dashboard.html',
  styleUrls: ['./citizen-dashboard.css']
})
export class CitizenDashboard implements OnInit {
  grants: any[] = [];

  constructor(
    private router: Router,
    private grantService: GrantService,
    private cdr: ChangeDetectorRef 
  ) { } // Added missing closing brace here

  ngOnInit(): void {
    console.log("Dashboard Initialized - Fetching Data...");
    this.fetchGrants();
  }

  fetchGrants() {
    this.grantService.getGrants().subscribe({
      next: (data: any[]) => {
        // We use the spread operator to ensure a fresh reference for the array
        this.grants = [...data]; 
        
        console.log('Grants loaded from SQL:', this.grants);
        
        // This forces Angular to re-render the HTML immediately
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error fetching grants from backend:', err);
      }
    });
  }

  onApply(grantId: number) {
    console.log('Applying for Grant ID:', grantId);
    // This will navigate to your application form
    this.router.navigate(['/apply', grantId]);
  }

  viewProfile() {
    this.router.navigate(['/citizen-profile']); 
  }
}