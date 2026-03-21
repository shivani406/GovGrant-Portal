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

}