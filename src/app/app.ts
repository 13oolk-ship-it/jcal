import { Component, signal } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { routeAnimations } from './route-animations';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeAnimations],
})
export class App {
  protected readonly title = signal('nubcal-app');

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
