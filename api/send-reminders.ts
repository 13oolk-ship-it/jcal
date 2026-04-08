import type { VercelRequest, VercelResponse } from '@vercel/node';

const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

// --- Config from environment ---
const VAPID_PUBLIC_KEY = process.env['VAPID_PUBLIC_KEY'] || '';
const VAPID_PRIVATE_KEY = process.env['VAPID_PRIVATE_KEY'] || '';
const VAPID_EMAIL = process.env['VAPID_EMAIL'] || 'mailto:admin@j-nubcal.vercel.app';
const SUPABASE_URL = process.env['SUPABASE_URL'] || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env['SUPABASE_SERVICE_ROLE_KEY'] || '';
const CRON_SECRET = process.env['CRON_SECRET'] || '';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify this is called by Vercel Cron or has the secret
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Missing Supabase config' });
  }

  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return res.status(500).json({ error: 'Missing VAPID keys' });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Get current time in Bangkok timezone (ICT = UTC+7)
  const now = new Date();
  const bangkokTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const currentHH = String(bangkokTime.getUTCHours()).padStart(2, '0');
  const currentMM = String(bangkokTime.getUTCMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHH}:${currentMM}`;

  // Query users who have reminders enabled and whose reminder time matches current time (within a 5-min window)
  // We check exact HH:MM match since cron runs every minute
  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, push_subscription, workout_reminder_time')
    .eq('reminder_enabled', true)
    .not('push_subscription', 'is', null)
    .not('workout_reminder_time', 'is', null);

  if (error) {
    console.error('Supabase query error:', error);
    return res.status(500).json({ error: 'Database query failed' });
  }

  // Filter users whose reminder time matches (exact minute match)
  const matchingUsers = (users || []).filter(
    (u: { workout_reminder_time: string }) => u.workout_reminder_time === currentTimeStr
  );

  let sent = 0;
  let failed = 0;

  for (const user of matchingUsers) {
    try {
      const subscription = typeof user.push_subscription === 'string'
        ? JSON.parse(user.push_subscription)
        : user.push_subscription;

      const payload = JSON.stringify({
        title: '🏋️ Workout Time!',
        body: 'Time to get moving! Tap to log your workout.',
        url: '/add-workout',
      });

      await webpush.sendNotification(subscription, payload);
      sent++;
    } catch (err: any) {
      console.error(`Push failed for user ${user.id}:`, err?.statusCode, err?.body);
      failed++;

      // Remove expired/invalid subscriptions (410 Gone or 404)
      if (err?.statusCode === 410 || err?.statusCode === 404) {
        await supabase
          .from('profiles')
          .update({ push_subscription: null, reminder_enabled: false })
          .eq('id', user.id);
      }
    }
  }

  return res.status(200).json({
    ok: true,
    time: currentTimeStr,
    checked: users?.length ?? 0,
    matched: matchingUsers.length,
    sent,
    failed,
  });
}
