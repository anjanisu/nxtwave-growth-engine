import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const registration = await prisma.registration.findUnique({
    where: { email: normalizedEmail },
    include: {
      college: true,
      attendance: true,
    },
  });

  if (!registration) {
    return NextResponse.json(
      { success: false, error: 'No student registration found with this email address.' },
      { status: 444 }
    );
  }

  return NextResponse.json({
    success: true,
    registration,
    isAlreadyAttended: !!registration.attendance,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email parameter required.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const registration = await prisma.registration.findUnique({
      where: { email: normalizedEmail },
      include: {
        college: true,
        attendance: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, error: `Student with email "${normalizedEmail}" is not registered.` },
        { status: 404 }
      );
    }

    if (registration.attendance) {
      return NextResponse.json({
        success: true,
        message: 'Attendance already verified!',
        attendance: registration.attendance,
        registration,
        isAlreadyAttended: true,
      });
    }

    const attendance = await prisma.attendance.create({
      data: {
        registrationId: registration.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Attendance successfully marked! Welcome to Build Your First AI Project in 60 Minutes.',
      attendance,
      registration,
      isAlreadyAttended: false,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Check-in failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
