const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('=== USERS ===');
  const users = await prisma.user.findMany();
  console.log(users);
  
  console.log('\n=== EXPENSES ===');
  const expenses = await prisma.expense.findMany({
    include: {
      payer: true,
      participants: true
    }
  });
  console.log(expenses);
  
  console.log('\n=== TRANSFERS ===');
  const transfers = await prisma.transfer.findMany({
    include: {
      source: true,
      target: true
    }
  });
  console.log(transfers);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });