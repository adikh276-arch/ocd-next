import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const timestamp = await sql`SELECT NOW() as now`;
    const usersCount = await sql`SELECT count(*) FROM public.ocd_users`;
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      timestamp: timestamp[0].now,
      users: usersCount[0].count,
      environment: process.env.NODE_ENV,
      basePath: '/ocd'
    });
  } catch (error: any) {
    console.error('[Health] Database connection failed:', error);
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      error: error.message
    }, { status: 500 });
  }
}
