import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Application {
    id: string;
    citizenName: string;
    grantType: string;
    status: string;
}

interface Grants {
    id: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-dashboard.html',
    styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
    // Changed to public so the HTML template can access it
    public applications: Application[] = [
        { id: 'APP-001', citizenName: 'Rahul Sharma', grantType: 'Education', status: 'Pending' },
        { id: 'APP-002', citizenName: 'Priya Patel', grantType: 'Healthcare', status: 'Pending' },
        { id: 'APP-003', citizenName: 'Amit Verma', grantType: 'Small Business', status: 'In Review' }
    ];

    public grants: Grants[] = [
        { id: 'G-001', title: 'Education Fund', description: 'Scholarships for university students.' },
        { id: 'G-002', title: 'Small Business', description: 'Funding for local startups and entrepreneurs.' },
        { id: 'G-003', title: 'Healthcare', description: 'Medical support and insurance subsidies.' }
    ];

    // Filtered list for searching
    public filteredApplications: Application[] = [...this.applications];

    constructor(private router: Router) {}

    // Change 1: Navigate to Admin Profile
    goToAdminProfile() {
      this.router.navigate(['/admin-profile']);
    }

    // Change 2: Navigate to Add Grant Page
    addNewGrant() {
      this.router.navigate(['/add-grant']);
    }

    // Angular logic for searching
    searchCitizen(event: any) {
        const query = event.target.value.toLowerCase();
        this.filteredApplications = this.applications.filter(app => 
            app.citizenName.toLowerCase().includes(query) || 
            app.id.toLowerCase().includes(query)
        );
    }

    viewApp(id: string) {
        console.log("Viewing application:", id);
        // You can add navigation logic here later
    }

    editGrant(id: string) {
        console.log("Editing grant with ID:", id);
        // Logic to open an edit form would go here
    }

}