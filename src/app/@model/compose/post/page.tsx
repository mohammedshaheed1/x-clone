"use client"
import Imag from '@/components/Imag'
import { useRouter } from 'next/navigation'
import React from 'react'

const PostModel = () => {
   const router=useRouter()
   const closeModel=()=>{
       router.back()
   }
  return (
    <div className='absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center'>
  
      <div className='py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12'>
           {/* top */}
          <div className='flex items-center justify-between '>
             <div className='cursor-pointer' onClick={closeModel}>X</div>
             <div className='text-iconBlue font-bold'>Drafts</div>
          </div>
             {/* center */}
          <div className='py-8 flex gap-4'>
             <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                <Imag path='general/avatar.png' alt='shan' w={100} h={100} tr={true}/>
             </div>
             <input className='flex-1 bg-transparent outline-none text-lg ' type='text' placeholder='what is happening?!'/>
          </div>
             {/* bottom */}
          <div className='flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4'>
            <div className='flex gap-4 flex-wrap'>
                                <Imag path='icons/image.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
                 <Imag path='icons/gif.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/poll.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/emoji.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/schedule.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/location.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
          
            </div>
            {/* <button className='py-2 px-5 text-black bg-white rounded-full font-bold'>Post</button> */}
          </div>
      </div>

    </div>
  )
}

export default PostModel