import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * Server-side token validation endpoint.
 * Keeps the MantraCare API call on the server to avoid CORS issues.
 */
export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Validate token against MantraCare's identity API
    const mantraResponse = await fetch('https://api.mantracare.com/user/user-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(8000),
    });

    if (!mantraResponse.ok) {
      return NextResponse.json(
        { error: 'Session could not be verified.' },
        { status: 401 }
      );
    }

    const mantraData = await mantraResponse.json();

    // Normalize the user_id — MantraCare may return it under different keys
    const userId: string | number | undefined =
      mantraData.user_id ?? mantraData.userId ?? mantraData.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'No user ID returned from identity service.' },
        { status: 401 }
      );
    }

    const userIdStr = String(userId);

    // Upsert user into public schema explicitly
    await sql`
      INSERT INTO public.ocd_users (id, created_at, updated_at)
      VALUES (${userIdStr}, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
    `;

    return NextResponse.json({ success: true, user_id: userIdStr });
  } catch (error: any) {
    console.error('[auth] Handshake error:', error);
    return NextResponse.json(
      { error: 'Session handshake failed. Please try again.' },
      { status: 500 }
    );
  }
}
