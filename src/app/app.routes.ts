import { Routes } from '@angular/router';
import { Layout } from './shared/componentss/layout/layout';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { Login } from './features/login/login';
import { authGuard } from './core/auth/auth.guard';
import { AppoinmentsPage } from './features/appointment/pages/appoinments-page/appoinments-page';

export const routes: Routes = [
  // Esto manda a cualquiera que entre a la raíz directamente al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { 
    path: 'login', 
    component: Login 
  },

  {
    path: '', // Este grupo se encarga de las rutas protegidas
    component: Layout,
    canActivate: [authGuard],
    children: [
      // Ya no hace falta el redirect aquí porque lo hace el de arriba
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page').then(m => m.DashboardPage)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./features/appointment/pages/appoinments-page/appoinments-page').then(m => m.AppoinmentsPage)
      },
      {
        path: 'employees',
        loadComponent: () => import('./features/employees/pages/employees-page/employees-page').then(m => m.EmployeesPage)
      },
      {
        path: 'billing',
        loadComponent: () => import('./features/billing/pages/billing-page/billing-page').then(m => m.BillingPage)
      },

    {
      path: 'configuration',
      loadComponent: () => import('./features/configuration/pages/configuration-page/configuration-page').then(m => m.ConfigurationPage)
    }
    ]
  },

  { path: '**', redirectTo: 'login' }
];