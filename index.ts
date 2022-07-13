import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

async function main() {
    // Connect to the client
    await prisma.$connect()
    // Prisma Client queries
    const allUsers = await prisma.user.findMany()
    console.log(allUsers);
}

main()
    .catch((error) => {
    throw error
    })
    .finally(async () => {
    await prisma.$disconnect()
})