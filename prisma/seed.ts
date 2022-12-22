import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const bob = await prisma.users.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: '$2b$08$0qmgn6CN9V6n4m5YyN82Pe42vNFuEXj2h3Nc/xFjmMLPChh5jSHma',
      driver_license: '123',
      avatar: '',
      isAdmin: true
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })