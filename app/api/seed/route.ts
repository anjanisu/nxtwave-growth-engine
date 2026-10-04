import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase, resetDatabase } from '@/lib/seedData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({ action: 'seed' }));
    const action = body.action || 'seed';

    if (action === 'reset') {
      const res = await resetDatabase();
      return NextResponse.json({ success: true, message: res.message });
    }

    const res = await seedDatabase();
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${res.registrations} realistic registrations and ${res.attendees} verified attendees across ${res.colleges} colleges!`,
      data: res,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Seeding failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
