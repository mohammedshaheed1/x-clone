import { prisma } from "@/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const userProfileId =searchParams.get("user")
    const page =searchParams.get("cursor") || 1
    const LIMIT=3
    const { userId } = await auth()
    if (!userId) {
        return
    }

    const whereCondition = userProfileId !=="undefined" ? { userId: userProfileId as string } : {
        parentPostId: null,
        userId: {
            in: [userId, ...((await prisma.follow.findMany({ where: { followerId: userId }, select: { followerId: true } })).map(follow => follow.followerId))]
        }
    }

 const posts = await prisma.post.findMany({
  where: whereCondition,
  take: LIMIT,
  skip: (Number(page) - 1) * LIMIT,
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
      likes:{where:{userId:userId},select:{id:true}},
       rePosts:{
          where:{userId:userId},select:{id:true}
        }
        ,saves:{where:{userId:userId},select:{id:true}}
      },
    },
   _count:{select:{likes:true,rePosts:true,comments:true}},
   likes:{where:{userId:userId},select:{id:true}},
    rePosts:{
          where:{userId:userId},select:{id:true}
        }
    ,saves:{where:{userId:userId},select:{id:true}}
  },
});

    const totalPosts=await prisma.post.count({where:whereCondition})
    const hasMore=Number(page)*LIMIT<totalPosts;
    return  Response.json({posts,hasMore})
}