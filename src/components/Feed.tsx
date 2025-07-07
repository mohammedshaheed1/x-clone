import React from 'react'
import Post from './Post'
import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'
import InfiniteFeed from './InfiniteFeed'

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth()
  if (!userId) {
    return
  }



  const whereCondition = userProfileId ? { userId: userProfileId } : {
    parentPostId: null,
    userId: {
      in: [userId, ...((await prisma.follow.findMany({ where: { followerId: userId }, select: { followerId: true } })).map(follow => follow.followerId))]
    }
  }
const posts = await prisma.post.findMany({
  where: whereCondition,
  include: {
    user: {
      select: {
        displayName: true,
        username: true,
        img: true,
      },
    },
    rePost: {
      include: {
        user: {
          select: {
            displayName: true,
            username: true,
            img: true,
          },
        },
        _count:{select:{likes:true,rePosts:true,comments:true}},
          likes:{
          where:{userId:userId},select:{id:true}
          },
           rePosts:{
          where:{userId:userId},select:{id:true}
        }
        ,saves:{where:{userId:userId},select:{id:true}}
          
      },
       
    },
    _count:{select:{likes:true,rePosts:true,comments:true}},
    likes:{
      where:{userId:userId},select:{id:true}
    },
     rePosts:{
          where:{userId:userId},select:{id:true}
     }
     ,saves:{where:{userId:userId},select:{id:true}}
  },
  take: 3,
  skip: 0,
  orderBy: {
    createdAt: "desc",
  }
  
});


  //fetch posts from the current user and followings

  return (
    <div>
      {
        posts.map(post => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))
      }
      <InfiniteFeed />
    </div>
  )
}

export default Feed
