import { prisma } from './prisma';
import { PREDEFINED_COLLEGES } from './colleges';

const FIRST_NAMES = [
  'Aarav', 'Ananya', 'Rohan', 'Priya', 'Aditya', 'Sneha', 'Vikram', 'Neha', 'Rahul', 'Kavya',
  'Siddharth', 'Ishita', 'Arjun', 'Meera', 'Karthik', 'Pooja', 'Varun', 'Divya', 'Yash', 'Riya',
  'Gautam', 'Tanvi', 'Abhinav', 'Shreya', 'Dev', 'Anushka', 'Manish', 'Simran', 'Nikhil', 'Tarun'
];

const LAST_NAMES = [
  'Sharma', 'Verma', 'Reddy', 'Rao', 'Patel', 'Nair', 'Kulkarni', 'Joshi', 'Gupta', 'Singh',
  'Mehta', 'Gowda', 'Babu', 'Chowdary', 'Das', 'Sen', 'Deshmukh', 'Pillai', 'Iyer', 'Bhat'
];

const BRANCHES = ['Computer Science & Engg (CSE)', 'Information Tech (IT)', 'Electronics (ECE)', 'AI & Data Science', 'Electrical (EEE)', 'Mechanical Engg'];
const PROJECTS = [
  'Generative AI App & LLM Wrapper',
  'Autonomous AI Agent System',
  'Computer Vision & OCR Pipeline',
  'AI Knowledge Base RAG Assistant',
];

export async function seedDatabase() {
  // Clear existing records safely
  await prisma.attendance.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.college.deleteMany({});

  // 1. Create Colleges
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

  // 2. Define college seed target counts (Registrations, Attendees)
  const SEED_TARGETS = [
    { slug: 'jntu-hyd', signups: 64, attendees: 52 },
    { slug: 'vnit-nagpur', signups: 58, attendees: 44 },
    { slug: 'vit-vellore', signups: 55, attendees: 39 },
    { slug: 'iit-bombay', signups: 42, attendees: 35 },
    { slug: 'kiit-bhubaneswar', signups: 45, attendees: 31 },
    { slug: 'coep-pune', signups: 38, attendees: 29 },
    { slug: 'bits-pilani', signups: 28, attendees: 23 },
    { slug: 'srm-chennai', signups: 72, attendees: 22 }, // High Volume / Low Attendance Alert
    { slug: 'bmsce-bangalore', signups: 22, attendees: 17 },
    { slug: 'nit-warangal', signups: 20, attendees: 15 },
    { slug: 'anna-univ', signups: 48, attendees: 16 }, // High Volume / Low Attendance Alert
    { slug: 'iiit-hyd', signups: 12, attendees: 10 },
    { slug: 'gitam-vizag', signups: 15, attendees: 10 },
    { slug: 'other-colleges', signups: 8, attendees: 5 },
  ];

  let totalSeededRegistrations = 0;
  let totalSeededAttendees = 0;

  // Base timestamp (7 days ago to simulate campaign timeline)
  const now = new Date();
  const campaignStartDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (const target of SEED_TARGETS) {
    for (let i = 0; i < target.signups; i++) {
      const firstName = FIRST_NAMES[(i + totalSeededRegistrations) % FIRST_NAMES.length];
      const lastName = LAST_NAMES[(i * 3 + totalSeededRegistrations) % LAST_NAMES.length];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${target.slug}.${i + 1}@student.edu.in`;
      const whatsapp = `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`;
      const branch = BRANCHES[i % BRANCHES.length];
      const projectInterest = PROJECTS[i % PROJECTS.length];

      // Random timestamp over 7-day campaign
      const daysOffset = Math.random() * 6.5;
      const registeredAt = new Date(campaignStartDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);

      const registration = await prisma.registration.create({
        data: {
          studentName: name,
          email,
          whatsapp,
          collegeSlug: target.slug,
          branch,
          graduationYear: 2025, // Final year engineering students
          projectInterest,
          registeredAt,
        },
      });

      totalSeededRegistrations++;

      // Check if student attended
      if (i < target.attendees) {
        // Attendance marked 1 to 3 hours after registration or during workshop window
        const attendedAt = new Date(registeredAt.getTime() + (1 + Math.random() * 2) * 60 * 60 * 1000);
        await prisma.attendance.create({
          data: {
            registrationId: registration.id,
            attendedAt,
          },
        });
        totalSeededAttendees++;
      }
    }
  }

  return {
    registrations: totalSeededRegistrations,
    attendees: totalSeededAttendees,
    colleges: SEED_TARGETS.length,
  };
}

export async function resetDatabase() {
  await prisma.attendance.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.college.deleteMany({});

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
  return { message: 'Database reset successfully' };
}
