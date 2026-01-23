import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  // Hypothetical stats data that could eventually come from an API
  stats = {
    grantsPublished: '12,450',
    grantsApproved: '8,200',
    totalDisbursed: '$3.5 Billion',
    currentYear: new Date().getFullYear()
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Logic to run when the page loads (e.g., fetching real-time stats)
  }

  // Navigation logic for Citizen Signup
  CitizenSignup() {
    console.log('Navigating to Citizen Registration...');
    this.router.navigate(['citizen-signup']);
  }

  // Navigation logic for Admin Signup
  AdminSignup() {
    console.log('Navigating to Admin Registration...');
    this.router.navigate(['admin-signup']);
  }
  goToLogin() {
  console.log('Login link clicked');
  this.router.navigate(['/login']);
}
}