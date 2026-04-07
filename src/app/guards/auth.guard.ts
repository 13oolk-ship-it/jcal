import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async () => {
  const platformId = inject(PLATFORM_ID);

  // During SSR, allow access — let the browser handle auth
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const user = await supabase.getUser();
  if (user) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
