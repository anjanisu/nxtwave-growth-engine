import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PREDEFINED_COLLEGES } from '@/lib/colleges';

export async function GET() {
  try {
    let colleges = await prisma.college.findMany({
      orderBy: { name: 'asc' },
    });

    if (colleges.length === 0) {
      // Auto-populate predefined colleges if DB is empty
      for (const c of PREDEFINED_COLLEGES) {
        await prisma.college.create({
          data: {
            slug: c.slug,
            name: c.name,
            city: c.city,
            state: c.state,
            coordinatorName: c.coordinatorName,
            channelType: c.channelType,
          },
        });
      }
      colleges = await prisma.college.findMany({ orderBy: { name: 'asc' } });
    }

    return NextResponse.json({ success: true, colleges });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch colleges';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
