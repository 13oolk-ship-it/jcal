import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const profileGuard: CanActivateFn = async () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return true;

  const supabase = inject(SupabaseService);
  const router = inject(Router);

  try {
    const profile = await supabase.getProfile();
    if (profile?.weight && profile?.height && profile?.age && profile?.gender && profile?.goal_type && profile?.activity_level) {
      return true;
    }
  } catch {
    // Profile doesn't exist yet
  }

  router.navigate(['/profile-setup']);
  return false;
};
