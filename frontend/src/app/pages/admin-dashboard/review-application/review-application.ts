import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GrantService } from '../../../services/grant';


@Component({
  selector: 'app-review-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-application.html',
  styleUrls: ['./review-application.css']
})

export class ReviewApplication implements OnInit {
  applicationId: string | null = '';
  applicationData: any = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private grantService: GrantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.applicationId = this.route.snapshot.paramMap.get('id');
    this.fetchApplicationDetails(this.applicationId);
  }

   goToAdminProfile() {
    this.router.navigate(['/admin-profile']);
  }

  fetchApplicationDetails(id: string | null) {
    if (!id) return;
    this.grantService.getApplicationById(id).subscribe({
      next: (data:any) => {
        console.log("Data received from server:", data);
        this.applicationData = data;

        this.cdr.detectChanges();
      },
      error: (err:any) => console.error("Error fetching details:", err)
    });
  }

  approveApplication() {
    if (!this.applicationId) return;

    this.grantService.updateApplicationStatus(this.applicationId, 'Approved').subscribe({
      next: () => {
        alert("Application Approved successfully!");
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => alert("Failed to approve: " + err.message)
    });
  }

  

  rejectApplication() {
    const confirmed = confirm("Are you sure you want to reject this application?");
    if (confirmed && this.applicationId) {
      this.grantService.updateApplicationStatus(this.applicationId, 'Rejected').subscribe({
        next: () => {
          alert("Application Rejected.");
          this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => alert("Failed to reject: " + err.message)
      });
    }
  }
}