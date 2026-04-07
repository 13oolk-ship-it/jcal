import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    data: { animation: 'LoginPage' },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    data: { animation: 'DashboardPage' },
  },
  {
    path: 'add-food',
    loadComponent: () => import('./pages/add-food/add-food.component').then(m => m.AddFoodComponent),
    canActivate: [authGuard],
    data: { animation: 'AddFoodPage' },
  },
  {
    path: 'add-meal',
    loadComponent: () => import('./pages/add-meal/add-meal.component').then(m => m.AddMealComponent),
    canActivate: [authGuard],
    data: { animation: 'AddMealPage' },
  },
  {
    path: 'manage-foods',
    loadComponent: () => import('./pages/manage-foods/manage-foods.component').then(m => m.ManageFoodsComponent),
    canActivate: [authGuard],
    data: { animation: 'ManageFoodsPage' },
  },
  { path: '**', redirectTo: 'dashboard' },
];
