import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Grant {
  id: number;
  name: string;
  category: string;
  amount: string;
  description: string;
}

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './citizen-dashboard.html',
  styleUrls: ['./citizen-dashboard.css']
})
export class CitizenDashboard {
  searchQuery: string = '';
  selectedCategory: string = 'All';

  grants: Grant[] = [
    { id: 1, name: 'Small Business Relief', category: 'Business', amount: '$5000', description: 'Support for local startups.' },
    { id: 2, name: 'Student Education Fund', category: 'Education', amount: '$2000', description: 'Assistance for tuition fees.' },
    { id: 3, name: 'Housing Subsidy', category: 'Housing', amount: '$10000', description: 'Help for first-time home buyers.' },
    { id: 4, name: 'Green Energy Grant', category: 'Environment', amount: '$3500', description: 'Solar panel installation support.' }
  ];

  get filteredGrants() {
    return this.grants.filter(grant => {
      const matchesSearch = grant.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || grant.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  applyForGrant(grant: Grant) {
    // Logic to update database would go here (Service call)
    console.log(`Applying for: ${grant.name}`);
    alert(`Success! Your request for "${grant.name}" has been sent for approval.`);
    
    // In a real app, you'd send this to your backend:
    // this.grantService.apply(grant.id).subscribe(...)
  }
}