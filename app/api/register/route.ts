import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PREDEFINED_COLLEGES } from '@/lib/colleges';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, email, whatsapp, collegeSlug, branch, graduationYear, projectInterest } = body;

    if (!studentName || !email || !collegeSlug) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and college selection are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Duplicate email check
    const existing = await prisma.registration.findUnique({
      where: { email: normalizedEmail },
      include: { college: true },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `Email "${normalizedEmail}" is already registered for this workshop under ${existing.college.name}.`,
          isDuplicate: true,
          registration: existing,
        },
        { status: 409 }
      );
    }

    // 2. Ensure target college exists
    let college = await prisma.college.findUnique({
      where: { slug: collegeSlug },
    });

    if (!college) {
      const predefined = PREDEFINED_COLLEGES.find((c) => c.slug === collegeSlug);
      college = await prisma.college.create({
        data: {
          slug: collegeSlug,
          name: predefined ? predefined.name : collegeSlug.toUpperCase().replace(/-/g, ' '),
          city: predefined ? predefined.city : 'General',
          state: predefined ? predefined.state : 'General',
          coordinatorName: predefined ? predefined.coordinatorName : 'Campus Coordinator',
          channelType: predefined ? predefined.channelType : 'CLUB',
        },
      });
    }

    // 3. Create Registration record
    const registration = await prisma.registration.create({
      data: {
        studentName: studentName.trim(),
        email: normalizedEmail,
        whatsapp: whatsapp?.trim() || '',
        collegeSlug: college.slug,
        branch: branch || 'Computer Science & Engg (CSE)',
        graduationYear: parseInt(graduationYear, 10) || 2025,
        projectInterest: projectInterest || 'Generative AI App & LLM Wrapper',
      },
      include: { college: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful! You are enrolled for Build Your First AI Project in 60 Minutes.',
      registration,
      whatsappGroupUrl: 'https://chat.whatsapp.com/NxtWaveGrowthAiDemo2026',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
