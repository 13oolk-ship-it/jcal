import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { profileGuard } from './guards/profile.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    data: { animation: 'LoginPage' },
  },
  {
    path: 'profile-setup',
    loadComponent: () => import('./pages/profile-setup/profile-setup.component').then(m => m.ProfileSetupComponent),
    canActivate: [authGuard],
    data: { animation: 'ProfileSetupPage' },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'DashboardPage' },
  },
  {
    path: 'add-food',
    loadComponent: () => import('./pages/add-food/add-food.component').then(m => m.AddFoodComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'AddFoodPage' },
  },
  {
    path: 'add-meal',
    loadComponent: () => import('./pages/add-meal/add-meal.component').then(m => m.AddMealComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'AddMealPage' },
  },
  {
    path: 'manage-foods',
    loadComponent: () => import('./pages/manage-foods/manage-foods.component').then(m => m.ManageFoodsComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'ManageFoodsPage' },
  },
  {
    path: 'add-workout',
    loadComponent: () => import('./pages/add-workout/add-workout.component').then(m => m.AddWorkoutComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'AddWorkoutPage' },
  },
  {
    path: 'manage-workouts',
    loadComponent: () => import('./pages/manage-workouts/manage-workouts.component').then(m => m.ManageWorkoutsComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'ManageWorkoutsPage' },
  },
  {
    path: 'manage-exercises',
    loadComponent: () => import('./pages/manage-exercises/manage-exercises.component').then(m => m.ManageExercisesComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'ManageExercisesPage' },
  },
  {
    path: 'notification-settings',
    loadComponent: () => import('./pages/notification-settings/notification-settings.component').then(m => m.NotificationSettingsComponent),
    canActivate: [authGuard, profileGuard],
    data: { animation: 'NotificationSettingsPage' },
  },
  { path: '**', redirectTo: 'dashboard' },
];
