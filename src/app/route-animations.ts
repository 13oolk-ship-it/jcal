import {
  trigger,
  transition,
  style,
  query,
  animate,
  group,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnim', [
  // Login → any authenticated page (slide up + fade)
  transition('LoginPage => *', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }),
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px) scale(.97)' }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('350ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 0, transform: 'translateY(-20px) scale(.97)' })),
      ], { optional: true }),
      query(':enter', [
        animate('450ms 100ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ], { optional: true }),
    ]),
  ]),

  // Any → Login (fade down)
  transition('* => LoginPage', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }),
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px) scale(.97)' }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 0, transform: 'translateY(30px) scale(.97)' })),
      ], { optional: true }),
      query(':enter', [
        animate('400ms 80ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ], { optional: true }),
    ]),
  ]),

  // Forward navigation: Dashboard → AddFood / AddMeal (slide left)
  transition('DashboardPage => AddFoodPage, DashboardPage => AddMealPage', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }),
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(60px)' }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 0, transform: 'translateX(-60px)' })),
      ], { optional: true }),
      query(':enter', [
        animate('350ms 50ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 1, transform: 'translateX(0)' })),
      ], { optional: true }),
    ]),
  ]),

  // Back navigation: AddFood / AddMeal → Dashboard (slide right)
  transition('AddFoodPage => DashboardPage, AddMealPage => DashboardPage', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }),
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-60px)' }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 0, transform: 'translateX(60px)' })),
      ], { optional: true }),
      query(':enter', [
        animate('350ms 50ms cubic-bezier(.4,0,.2,1)',
          style({ opacity: 1, transform: 'translateX(0)' })),
      ], { optional: true }),
    ]),
  ]),

  // Between sibling pages: AddFood ↔ AddMeal (cross-fade)
  transition('AddFoodPage <=> AddMealPage', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }),
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('250ms cubic-bezier(.4,0,.2,1)', style({ opacity: 0 })),
      ], { optional: true }),
      query(':enter', [
        animate('350ms 80ms cubic-bezier(.4,0,.2,1)', style({ opacity: 1 })),
      ], { optional: true }),
    ]),
  ]),
]);
