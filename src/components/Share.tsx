"use client"
import React, { useState } from 'react'
import Imag from './Imag'
import { shareAction } from '@/actions'
import Image from 'next/image'
import ImageEditor from './ImageEditor'

const Share = () => {

   const [media,setMedia]=useState<File|null>(null)
   const [isEditorOpen,setIsEditorOpen]=useState(false)
   const [setting,setSettings]=useState<{type:'original'| 'wide'|'square';sensitive:boolean}>({
      type:"original",
      sensitive:false
   })

   const handlemediaChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
           setMedia(e.target.files[0])
        }
   }

   const previewURl=media ? URL.createObjectURL(media) :null


  return (
    <form className='p-4 flex gap-4' action={(formData)=>shareAction(formData,setting)}>
      {/* avatar */}
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Imag path='/general/avatar.png' alt='' w={100} h={100} tr={true} />
      </div>
      {/* others */}
      <div className='flex-1 flex flex-col gap-4'>
        <input type='text' placeholder='what is happening' name='desc' className='bg-transparent outline-none placeholder:text-textGray text-xl' />
        <div className='flex items-center justify-between gap-4 flex-wrap'>
          <div className='flex gap-4 flex-wrap'>
            <input type='file' onChange={handlemediaChange} name='file' className='hidden' id='file'/>
            {/* PREVIEW IMAGE */}
            {  media?.type.includes('image')&&
               previewURl && (<div className='relative rounded-xl overflow-hidden'>
                 <Image src={previewURl} alt='' width={600} height={600}  className={`w-full ${setting.type === 'original' ? "h-full object-contain" : setting.type === 'square' ? "aspect-square object-cover" : "aspect-video object-cover"} `}/>
                 <div className='absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer' onClick={()=>setIsEditorOpen(true)}>Edit</div>
                  <div className='absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer fold-bold text-sm' onClick={()=>setMedia(null)}>X</div>
               </div>)
            }

            {
              media?.type.includes("video")&& previewURl&&(
                <div className='relative'>
                  <video src={previewURl} controls/>
                  <div className='absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer fold-bold text-sm' onClick={()=>setMedia(null)}>X</div>
                </div>
              )
            }
            {isEditorOpen && previewURl && <ImageEditor onClose={()=>setIsEditorOpen(false)} previewUrl={previewURl} settings={setting} setSettings={setSettings}/> }
            <label htmlFor='file'>
                 <Imag path='icons/image.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            </label>

            <Imag path='icons/gif.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/poll.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/emoji.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/schedule.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
            <Imag path='icons/location.svg' alt='' w={20} h={20} className='rounded-lg mt-2' tr={true} />
          </div>
          <button className='bg-white text-black font-bold rounded-full py-2 px-4 '>Post</button>
        </div>
      </div>
    </form>
  )
}

export default Share