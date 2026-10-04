import { seedDatabase } from '../lib/seedData';

async function main() {
  console.log('Seeding initial demo dataset...');
  const res = await seedDatabase();
  console.log(`Seeded ${res.registrations} registrations and ${res.attendees} attendees across ${res.colleges} colleges.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
