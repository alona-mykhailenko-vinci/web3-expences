const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting to seed the database...');

  // First, create users
  console.log('Creating users...');
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      bankAccount: 'BE12 3456 7890 1234',
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      bankAccount: 'BE98 7654 3210 9876',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      name: 'Charlie',
      email: 'charlie@example.com',
      bankAccount: null, // Charlie doesn't have a bank account yet
    },
  });

  console.log(`✅ Created ${3} users`);

  // Create expenses with proper relations
  console.log('Creating expenses...');
  const expense1 = await prisma.expense.create({
    data: {
      date: new Date('2025-01-16T00:00:00Z'),
      description: 'Groceries for dinner party',
      amount: 85.50,
      payerId: alice.id,
      participants: {
        connect: [{ id: alice.id }, { id: bob.id }, { id: charlie.id }]
      }
    },
  });

  const expense2 = await prisma.expense.create({
    data: {
      date: new Date('2025-01-15T00:00:00Z'),
      description: 'Movie tickets',
      amount: 35.00,
      payerId: bob.id,
      participants: {
        connect: [{ id: alice.id }, { id: bob.id }]
      }
    },
  });

  const expense3 = await prisma.expense.create({
    data: {
      date: new Date('2025-01-14T00:00:00Z'),
      description: 'Coffee shop',
      amount: 12.75,
      payerId: charlie.id,
      participants: {
        connect: [{ id: bob.id }, { id: charlie.id }]
      }
    },
  });

  const expense4 = await prisma.expense.create({
    data: {
      date: new Date('2025-01-13T00:00:00Z'),
      description: 'Uber ride home',
      amount: 28.90,
      payerId: alice.id,
      participants: {
        connect: [{ id: alice.id }, { id: bob.id }, { id: charlie.id }]
      }
    },
  });

  console.log(`✅ Created ${4} expenses`);

  // Create transfers (money transfers between users)
  console.log('Creating transfers...');
  const transfer1 = await prisma.transfer.create({
    data: {
      amount: 30.00,
      date: new Date('2025-01-17T00:00:00Z'),
      sourceId: bob.id,
      targetId: alice.id,
    },
  });

  const transfer2 = await prisma.transfer.create({
    data: {
      amount: 15.50,
      date: new Date('2025-01-16T00:00:00Z'),
      sourceId: charlie.id,
      targetId: alice.id,
    },
  });

  const transfer3 = await prisma.transfer.create({
    data: {
      amount: 6.25,
      date: new Date('2025-01-15T00:00:00Z'),
      sourceId: charlie.id,
      targetId: bob.id,
    },
  });

  console.log(`✅ Created ${3} transfers`);
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });