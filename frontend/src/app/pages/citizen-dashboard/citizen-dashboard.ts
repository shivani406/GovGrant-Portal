import { Component, OnInit } from '@angular/core';

// Define a structure for your Grant data
interface Grant {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-citizen-dashboard',
  templateUrl: './citizen-dashboard.html',
  styleUrls: ['./citizen-dashboard.css']
})
export class CitizenDashboard implements OnInit {

  grants: Grant[] = [
    { id: 'G-101', title: 'Small Business Relief', description: 'Financial aid for local startups affected by the pandemic.' },
    { id: 'G-102', title: 'Higher Education Scholarship', description: 'Covers tuition for STEM students in underrepresented areas.' },
    { id: 'G-103', title: 'Sustainable Farming Grant', description: 'Funds for implementing eco-friendly irrigation systems.' },
    { id: 'G-104', title: 'Art & Culture Grant', description: 'Support for local community murals and public galleries.' }
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

  onApply(grantId: string) {
    console.log('Applying for Grant ID:', grantId);
    // Logic to open application form or navigate to apply page
    alert(`Redirecting to application for ${grantId}`);
  }
  viewProfile() {
  console.log("Navigating to user profile...");
  //this.router.navigate(['/profile']);
}
}