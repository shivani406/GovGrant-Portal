import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrantService {
  // This is the URL of your Node.js server
  private apiUrl = 'http://localhost:3000/api/grants';

  constructor(private http: HttpClient) { }

  // This function fetches the data from the backend
  getGrants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  signup(userData: any) {
  return this.http.post('http://localhost:3000/api/signup', userData);
  }

  submitApplication(applicationData: any): Observable<any> {
  return this.http.post('http://localhost:3000/api/applications', applicationData);
  }

  login(credentials: any): Observable<any> {
  return this.http.post('http://localhost:3000/api/login', credentials);
  }

  getCitizenProfile(id: string): Observable<any> {
  return this.http.get(`http://localhost:3000/api/citizen-profile/${id}`);
  }

  adminSignup(adminData: any): Observable<any> {
  return this.http.post('http://localhost:3000/api/admin/signup', adminData);
  }

  adminLogin(credentials: any): Observable<any> {
  return this.http.post('http://localhost:3000/api/admin/login', credentials);
  }

  getAllGrants(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/api/admin/grants');
  }

  getAllApplications(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/admin/applications');
  }

  addGrant(grantData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/admin/grants', grantData);
  }

  getApplicationById(id: string) {
  return this.http.get<any>(`http://localhost:3000/api/applications/${id}`);
  }

  updateApplicationStatus(applicationId: string, status: string, adminId: string | null) {
  const payload = {
    application_id: applicationId,
    status: status, // This must be called 'status' to match the backend destructuring
    admin_id: adminId ? Number(adminId) : 1
  };
  
  console.log("Sending Payload to Server:", payload);
  return this.http.post('http://localhost:3000/api/admin/review-application', payload);
}
  getAdminProfile(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/administration/${id}`);
  }

  getAdminGrantsCount(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/admin/grants/count/${id}`);
  }
}