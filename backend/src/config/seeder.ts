import { PrismaClient } from '@prisma/client'
import songSeeder from '../models/seeders/songSeed'

const prisma = new PrismaClient()


async function main() {
  await Promise.all([
    songSeeder(),
  ])
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
