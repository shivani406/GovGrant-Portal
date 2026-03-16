import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citizen-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen-profile.html',
  styleUrls: ['./citizen-profile.css']
})
export class CitizenProfile {
  
  citizen: any = {
    id: '',
    name: '',
    phone: '',
    grants: [] 
  };

  getStatusClass(status: string) {
    return {
      'approved': status === 'Approved',
      'applied': status === 'Applied',
      'rejected': status === 'Rejected'
    };
  }
}