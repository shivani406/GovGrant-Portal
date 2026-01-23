import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AdminSignup } from './pages/admin-signup/admin-signup';
import { CitizenSignup } from './pages/citizen-signup/citizen-signup';
import { CitizenLogin } from './pages/citizen-login/citizen-login';
import { AdminLogin } from './pages/admin-login/admin-login';
import { LoginSelection } from './pages/login/login';
import { CitizenDashboard } from './pages/citizen-dashboard/citizen-dashboard';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'admin-signup', component: AdminSignup },  
  { path: 'citizen-signup', component: CitizenSignup },
  { path: 'citizen-login', component: CitizenLogin },
  { path: 'admin-login', component: AdminLogin },
  { path: 'login', component: LoginSelection },
  { path: 'citizen-dashboard' , component: CitizenDashboard}
];

