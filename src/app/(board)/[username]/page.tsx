import Feed from '@/components/Feed'
import FollowButton from '@/components/FollowButton'
import Imag from '@/components/Imag'
import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound, unauthorized } from 'next/navigation'
import React from 'react'

const page = async({params}:{params:{username:string}}) => {
  const {userId}=await auth()
  const user =await prisma.user.findUnique({
    where:{username:params.username},
    include:{_count:{select:{followers:true,followings:true}},followings:userId?{where:{followerId:userId}}:undefined}
  })

  if(!user){
     return  notFound
  }
  return (
    <div className=''>
     {/* Profile title */}
     <div className='flex items-center gap-8 sticky top-0  blackdrop-blur-md p-4 z-10 bg-[#0000084]'>
        <Link href='/'>
        <Imag path='icons/back.svg' alt='black' w={24} h={24}/>
        </Link>
        <h1 className='font-bold text-lg'>{user.displayName}</h1>
     </div>
     {/* info */}
     <div className=''>
       {/* cover && avatar */}
       <div className='relative w-full'>
        {/* cover */}
            <div className='w-full aspect-[3/1] relative'>
              <Imag path={user.cover||'general/cover.jpg'} alt='' w={600} h={200} tr={true}/>
            </div>
            {/* avatar */}
             <div className='w-1/6 aspect-square  rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2'>
              <Imag path={user.img||'general/avatar.png'} alt='' w={100} h={600} tr={true}/>
            </div>
       </div>
       <div className='flex w-full items-center justify-end gap-2 p-2'>
          <div className='w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer'>
             <Imag path='icons/more.svg' alt='more' w={20} h={20}/>
          </div>
          <div className='w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer'>
             <Imag path='icons/explore.svg' alt='more' w={20} h={20}/>
          </div>
          <div className='w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer'>
             <Imag path='icons/message.svg' alt='more' w={20} h={20}/>
          </div>
        {userId && <FollowButton userId={user.id} isFollowed={!!user.followings.length}/>}
       </div>

       {/* user info  */}
       <div className='p-4 flex flex-col gap-2'>
           {/* username and handle */}
           <div className=''>
               <h1 className='text-2xl font-bold'>{user.displayName}</h1>
               <span className='text-textGray text-sm'>@{user.username}</span>
           </div>
           {user.bio&&
           <p>{user.bio} channel creation</p>}
           {/* job and location and date */}
           <div className='flex gap-4 text-textGray text-[15px]'>
            { user.location && <div className='flex items-center gap-2'>
              <Imag path='icons/userLocation.svg' alt='location' w={20} h={20}/>
              <span>{user.location}</span>
              </div>}
                <div className='flex items-center gap-2'>
              <Imag path='icons/date.svg' alt='location' w={20} h={20}/>
              <span>jointed {new Date (user.createdAt.toString()).toLocaleDateString("en-US",{month:"long",year:'numeric'})}</span>
              </div>
           </div>
       {/* Followings & Follower */}
       <div className='flex gap-4'>
         <div className='flex items-center gap-2'>
           <span className='font-bold'>{user._count.followers}</span>
           <span className='text-textGray text-[15px]'>Followers</span>
         </div>
          <div className='flex items-center gap-2'>
           <span className='font-bold'>{user._count.followings}</span>
           <span className='text-textGray text-[15px]'>Following</span>
         </div>
       </div>
       </div>
     </div>
     {/* feed */}
     <Feed userProfileId={user?.id}/>
    </div>
  )
}

export default page