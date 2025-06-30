import React from 'react'
import Imag from './Imag'
import Link from 'next/link'

const PopularTags = () => {
  return (
    <div className='p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4'>
        <h1 className='text-xl font-bold text-textGrayLight '>{"What's"} Happening</h1>
        {/* Trends */}
        <div className='flex gap-4'>
            <div className='relative w-20 h-20 rounded-xl overflow-hidden'>
                <Imag path='general/event.png' alt="event" w={120} h={120} tr={true}/>
            </div>
            <div className='flex-1'>
              <h2 className='font-bold text-textGrayLight'>nadal v forder grand slm</h2>
              <span className='text-sm text-textGray'>Last night</span>
            </div>
        </div>
        {/* Topics */}
        <div className=''>
            <div className='flex items-center justify-between'>
               <span className='text-textGray font-sm' >Technology * Trending</span>
               <Imag path='icons/infoMore.svg' alt='info' w={16} h={16}/>
            </div>
            
             <h2 className='text-textGrayLight font-bold'>Open AI</h2>
             <span className='text-textGray text-sm'>20k posts</span>
            
        </div>
          {/* Topics */}
        <div className=''>
            <div className='flex items-center justify-between'>
               <span className='text-textGray font-sm' >Technology * Trending</span>
               <Imag path='icons/infoMore.svg' alt='info' w={16} h={16}/>
            </div>
            
             <h2 className='text-textGrayLight font-bold'>Open AI</h2>
             <span className='text-textGray text-sm'>20k posts</span>
            
        </div>
          {/* Topics */}
        <div className=''>
            <div className='flex items-center justify-between'>
               <span className='text-textGray font-sm' >Technology * Trending</span>
               <Imag path='icons/infoMore.svg' alt='info' w={16} h={16}/>
            </div>
            
             <h2 className='text-textGrayLight font-bold'>Open AI</h2>
             <span className='text-textGray text-sm'>20k posts</span>
            
        </div>
        <Link href='/' className='text-iconBlue'>Show More</Link>
    </div>
  )
}

export default PopularTags