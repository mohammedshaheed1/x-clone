// import { PrismaClient } from '../src/generated/prisma';
// import { v4 as uuidv4 } from 'uuid';

// const prisma = new PrismaClient();

// async function main() {
//   // USERS
//   const usersData = [
//     {
//       id: uuidv4(),
//       email: 'alice@example.com',
//       username: 'alice',
//       displayName: 'Alice',
//       bio: 'Tech enthusiast.',
//       location: 'San Francisco',
//       job: 'Engineer',
//       website: 'https://alice.dev',
//       img: '/avatars/alice.png',
//       cover: '/covers/alice-cover.jpg',
//     },
//     {
//       id: uuidv4(),
//       email: 'bob@example.com',
//       username: 'bob',
//       displayName: 'Bob',
//       bio: 'Just Bob things.',
//       location: 'New York',
//       job: 'Writer',
//       website: 'https://bob.blog',
//       img: '/avatars/bob.png',
//       cover: '/covers/bob-cover.jpg',
//     },
//     {
//       id: uuidv4(),
//       email: 'carol@example.com',
//       username: 'carol',
//       displayName: 'Carol',
//       bio: 'Designing dreams.',
//       location: 'Berlin',
//       job: 'Designer',
//       website: 'https://carol.design',
//       img: '/avatars/carol.png',
//       cover: '/covers/carol-cover.jpg',
//     },
//   ];

//   const users = [];
//   for (const userData of usersData) {
//     const user = await prisma.user.upsert({
//       where: { email: userData.email },
//       update: {},
//       create: userData,
//     });
//     users.push(user);
//   }

//   // POSTS
//   const post1 = await prisma.post.create({
//     data: {
//       desc: 'This is Alice’s first post',
//       img: '/posts/alice1.jpg',
//       userId: users[0].id,
//     },
//   });

//   const post2 = await prisma.post.create({
//     data: {
//       desc: 'Bob enjoying the view!',
//       img: '/posts/bob1.jpg',
//       isSensitive: false,
//       userId: users[1].id,
//     },
//   });

//   const comment1 = await prisma.post.create({
//     data: {
//       desc: 'Nice view!',
//       userId: users[2].id,
//       parentPostId: post2.id,
//     },
//   });

//   const comment2 = await prisma.post.create({
//     data: {
//       desc: 'I agree!',
//       userId: users[0].id,
//       parentPostId: post2.id,
//     },
//   });

//   const repost = await prisma.post.create({
//     data: {
//       desc: 'Check this out!',
//       userId: users[2].id,
//       rePostId: post1.id,
//     },
//   });

//   // LIKES
//   await prisma.like.createMany({
//     data: [
//       { userId: users[1].id, postId: post1.id },
//       { userId: users[2].id, postId: post1.id },
//       { userId: users[0].id, postId: post2.id },
//       { userId: users[2].id, postId: comment1.id },
//     ],
//   });


//   // Create some follow relationships
// await prisma.follow.createMany({
//   data: [
//     {
//       followerId: users[0].id, // Alice follows Bob
//       followingId: users[1].id,
//     },
//     {
//       followerId: users[0].id, // Alice follows Carol
//       followingId: users[2].id,
//     },
//     {
//       followerId: users[1].id, // Bob follows Alice
//       followingId: users[0].id,
//     },
//     {
//       followerId: users[2].id, // Carol follows Alice
//       followingId: users[0].id,
//     },
//     {
//       followerId: users[2].id, // Carol follows Bob
//       followingId: users[1].id,
//     },
//   ],
// });


//   console.log('🌱 Seeded users, posts, comments, reposts, and likes.');
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// import { PrismaClient } from '../src/generated/prisma';

// const prisma = new PrismaClient();

// async function main() {
//   // Clear all tables before seeding
//   await prisma.like.deleteMany();
//   await prisma.savedPosts.deleteMany();
//   await prisma.follow.deleteMany();
//   await prisma.post.deleteMany();
//   await prisma.user.deleteMany();

//   const users: any[] = [];
//   const posts: any[] = [];
//   const comments: any[] = [];
//   const reposts: any[] = [];

//   for (let i = 1; i <= 5; i++) {
//     const user = await prisma.user.create({
//       data: {
//         email: `user${i}@example.com`,
//         username: `user${i}`,
//         displayName: `User ${i}`,
//         bio: `Hi I'm user${i}. Welcome to my profile!`,
//         location: `USA`,
//         job: `Developer`,
//         website: `https://google.com`,
//         img: null,
//         cover: null,
//       },
//     });
//     users.push(user);
//   }

//   for (let i = 0; i < users.length; i++) {
//     for (let j = 1; j <= 5; j++) {
//       const post = await prisma.post.create({
//         data: {
//           desc: `Post ${j} by ${users[i].username}`,
//           userId: users[i].id,
//           img: null,
//           video: null,
//           isSensitive: false,
//           rePostId: null,
//           parentPostId: null,
//         },
//       });
//       posts.push(post);
//     }
//   }

//   await prisma.follow.createMany({
//     data: [
//       { followerId: users[0].id, followingId: users[1].id },
//       { followerId: users[0].id, followingId: users[2].id },
//       { followerId: users[1].id, followingId: users[3].id },
//       { followerId: users[2].id, followingId: users[4].id },
//       { followerId: users[3].id, followingId: users[0].id },
//     ],
//   });

//   await prisma.like.createMany({
//     data: posts.slice(0, 5).map((post, i) => ({
//       userId: users[i].id,
//       postId: post.id,
//     })),
//   });

//   for (let i = 0; i < posts.length; i++) {
//     const comment = await prisma.post.create({
//       data: {
//         desc: `Comment on Post ${posts[i].id} by ${users[(i + 1) % 5].username}`,
//         userId: users[(i + 1) % 5].id,
//         parentPostId: posts[i].id,
//         img: null,
//         video: null,
//         isSensitive: false,
//         rePostId: null,
//       },
//     });
//     comments.push(comment);
//   }

//   for (let i = 0; i < posts.length; i++) {
//     const repost = await prisma.post.create({
//       data: {
//         desc: `Repost of Post ${posts[i].id} by ${users[(i + 2) % 5].username}`,
//         userId: users[(i + 2) % 5].id,
//         rePostId: posts[i].id,
//         img: null,
//         video: null,
//         isSensitive: false,
//         parentPostId: null,
//       },
//     });
//     reposts.push(repost);
//   }

//   await prisma.savedPosts.createMany({
//     data: posts.slice(1, 6).map((post, i) => ({
//       userId: users[i].id,
//       postId: post.id,
//     })),
//   });
// }

// main()
//   .then(async () => {
//     console.log('✅ Seed completed.');
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error('❌ Seed error:', e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Clearing old data...');
  await prisma.like.deleteMany();
  await prisma.savedPosts.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('👥 Creating users...');
  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          username: `user${i + 1}`,
          displayName: `User ${i + 1}`,
          bio: `Hi I'm user${i + 1}. Welcome to my profile!`,
          location: `USA`,
          job: `Developer`,
          website: `https://google.com`,
          img: null,
          cover: null,
        },
      })
    )
  );

  console.log('📝 Creating posts...');
  const posts: any[] = [];
  for (const user of users) {
    for (let j = 1; j <= 5; j++) {
      const post = await prisma.post.create({
        data: {
          desc: `Post ${j} by ${user.username}`,
          userId: user.id,
          img: null,
          video: null,
          isSensitive: false,
        },
      });
      posts.push(post);
    }
  }

  console.log('🔁 Creating followers...');
  await prisma.follow.createMany({
    data: [
      { followerId: users[0].id, followingId: users[1].id },
      { followerId: users[0].id, followingId: users[2].id },
      { followerId: users[1].id, followingId: users[3].id },
      { followerId: users[2].id, followingId: users[4].id },
      { followerId: users[3].id, followingId: users[0].id },
    ],
  });

  console.log('❤️ Adding likes...');
  await prisma.like.createMany({
    data: posts.slice(0, 5).map((post, i) => ({
      userId: users[i].id,
      postId: post.id,
    })),
  });

  console.log('💬 Creating comments...');
  for (let i = 0; i < posts.length; i++) {
    await prisma.post.create({
      data: {
        desc: `Comment on Post ${posts[i].id} by ${users[(i + 1) % 5].username}`,
        userId: users[(i + 1) % 5].id,
        parentPostId: posts[i].id,
        img: null,
        video: null,
        isSensitive: false,
      },
    });
  }

  console.log('🔁 Creating reposts...');
  for (let i = 0; i < posts.length; i++) {
    await prisma.post.create({
      data: {
        desc: `Repost of Post ${posts[i].id} by ${users[(i + 2) % 5].username}`,
        userId: users[(i + 2) % 5].id,
        rePostId: posts[i].id,
        img: null,
        video: null,
        isSensitive: false,
      },
    });
  }

  console.log('📌 Saving posts...');
  await prisma.savedPosts.createMany({
    data: posts.slice(1, 6).map((post, i) => ({
      userId: users[i].id,
      postId: post.id,
    })),
  });
}

main()
  .then(() => {
    console.log('✅ Seed completed.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Seed error:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
