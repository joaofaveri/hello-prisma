import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

async function main() {
    // Connect to the client
    await prisma.$connect()
    
    // Prisma Client queries
    // Create example users
    // await prisma.user.create({
    //     data: {
    //         name: 'Rich',
    //         email: 'hello@prisma.com',
    //         posts: {
    //             create: {
    //                 title: 'My first post',
    //                 slug: 'my-first-post',
    //                 body: 'Lots of really interesting stuff'
    //             }
    //         }
    //     }
    // })

    // Add a couple of comments to the Post record
    await prisma.post.update({
        where: {
            slug: 'my-first-post'
        },
        data: {
            comments: {
                createMany: {
                    data: [
                        { comment: 'Great post!' },
                        {comment: 'Can\'t wait to read more!'}
                    ]
                }
            }
        }
    })

    // Get All Users
    // const allUsers = await prisma.user.findMany({
    //     include: {
    //         posts: true
    //     }
    // })
    // console.dir(allUsers, {depth: null})

    // Get All Posts
    const allPosts = await prisma.post.findMany({
        include: {
            comments: true
        }
    })
    console.dir(allPosts, {depth: null})
}

main()
    .catch((error) => {
    throw error
    })
    .finally(async () => {
    await prisma.$disconnect()
})