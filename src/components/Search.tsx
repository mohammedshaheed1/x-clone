import React from 'react'
import Imag from './Imag'

const Search = () => {
  return (
    <div className='bg-inputGray py-2 px-4 flex items-center gap-4 rounded-full'>
      <Imag path='icons/explore.svg' alt='Search' w={16} h={16}/>
      <input type='text' placeholder='Search' className='bg-transparent outline-none placeholder:text-textGray'/>
    </div>
  )
}

export default Search