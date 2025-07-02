import { PrismaClient } from '../src/generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // USERS
  const usersData = [
    {
      id: uuidv4(),
      email: 'alice@example.com',
      username: 'alice',
      displayName: 'Alice',
      bio: 'Tech enthusiast.',
      location: 'San Francisco',
      job: 'Engineer',
      website: 'https://alice.dev',
      img: '/avatars/alice.png',
      cover: '/covers/alice-cover.jpg',
    },
    {
      id: uuidv4(),
      email: 'bob@example.com',
      username: 'bob',
      displayName: 'Bob',
      bio: 'Just Bob things.',
      location: 'New York',
      job: 'Writer',
      website: 'https://bob.blog',
      img: '/avatars/bob.png',
      cover: '/covers/bob-cover.jpg',
    },
    {
      id: uuidv4(),
      email: 'carol@example.com',
      username: 'carol',
      displayName: 'Carol',
      bio: 'Designing dreams.',
      location: 'Berlin',
      job: 'Designer',
      website: 'https://carol.design',
      img: '/avatars/carol.png',
      cover: '/covers/carol-cover.jpg',
    },
  ];

  const users = [];
  for (const userData of usersData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
    users.push(user);
  }

  // POSTS
  const post1 = await prisma.post.create({
    data: {
      desc: 'This is Alice’s first post',
      img: '/posts/alice1.jpg',
      userId: users[0].id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      desc: 'Bob enjoying the view!',
      img: '/posts/bob1.jpg',
      isSensitive: false,
      userId: users[1].id,
    },
  });

  const comment1 = await prisma.post.create({
    data: {
      desc: 'Nice view!',
      userId: users[2].id,
      parentPostId: post2.id,
    },
  });

  const comment2 = await prisma.post.create({
    data: {
      desc: 'I agree!',
      userId: users[0].id,
      parentPostId: post2.id,
    },
  });

  const repost = await prisma.post.create({
    data: {
      desc: 'Check this out!',
      userId: users[2].id,
      rePostId: post1.id,
    },
  });

  // LIKES
  await prisma.like.createMany({
    data: [
      { userId: users[1].id, postId: post1.id },
      { userId: users[2].id, postId: post1.id },
      { userId: users[0].id, postId: post2.id },
      { userId: users[2].id, postId: comment1.id },
    ],
  });


  // Create some follow relationships
await prisma.follow.createMany({
  data: [
    {
      followerId: users[0].id, // Alice follows Bob
      followingId: users[1].id,
    },
    {
      followerId: users[0].id, // Alice follows Carol
      followingId: users[2].id,
    },
    {
      followerId: users[1].id, // Bob follows Alice
      followingId: users[0].id,
    },
    {
      followerId: users[2].id, // Carol follows Alice
      followingId: users[0].id,
    },
    {
      followerId: users[2].id, // Carol follows Bob
      followingId: users[1].id,
    },
  ],
});


  console.log('🌱 Seeded users, posts, comments, reposts, and likes.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
