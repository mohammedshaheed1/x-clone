import Link from 'next/link'
import React from 'react'
import Imag from './Imag'

const Recomendations = () => {
  return (
    <div className='p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4'>
      {/* USER CARD */}
      <div className='flex items-center justify-between'>
        {/* Image and user info */}
        <div className='flex items-center gap-2'>
          <div className='relative rounded-full overflow-hidden w-10 h-10'>
            <Imag path='general/avatar.png' alt='John Doe' w={100} h={100} tr={true} />
          </div>
          <div>
            <h1 className='text-md font-bold'>John Doe</h1>
            <span className='text-textGray text-sm'>@johnDoe</span>
          </div>
        </div>
        {/* Follow Button */}
        <button className=' py-1 px-4  text-sm font-semibold text-iconBlue hover:underline'>
          Follow
        </button>
      </div>

      <Link href='/' className='text-iconBlue text-sm hover:underline'>
        Show More
      </Link>
    </div>
  )
}

export default Recomendations
