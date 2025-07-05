import React from 'react'
import Post from './Post'
import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

const Feed = async({userProfileId}:{userProfileId?:string}) => {
  const {userId}=await auth()
  if(!userId){
    return
  }



 const whereCondition = userProfileId?{userId:userProfileId}:{
  parentPostId:null,
  userId:{
    in:[userId,...((await prisma.follow.findMany({where:{followerId:userId},select:{followerId:true}})).map(follow=>follow.followerId))]
  }
 }

  const posts=await prisma.post.findMany({where:whereCondition})
  console.log("posts",posts)
  //fetch posts from the current user and followings

  return (
    <div>
         {/* {
          posts.map(post=>(
            <div key={post.id}>
               <Post/>
            </div>
          ) )
         } */}
    </div>
  )
}

export default Feed
