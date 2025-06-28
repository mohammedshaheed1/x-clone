import React from 'react'
import Imag from './Imag'
import Postinfo from './Postinfo'
import PostInteractions from './PostInteractions'
import { imageKit } from '@/utils'
import Video from './Video'

interface FileDetailsResponse{
    width:number;
    height:number;
    filePath:string;
    url:string;
    fileType:string;
    customMetaData?:{sensitive:boolean}
}

const Post = async() => {


  const getFileDetails=async(fileId:string):Promise<FileDetailsResponse>=>{
        return new Promise((resolve,reject)=>{
            imageKit.getFileDetails(fileId,function(error,result){
               if(error)reject(error);
               else resolve(result as FileDetailsResponse)
            })
        })
  }

  const fileDetails=await getFileDetails('685fc94fb13a102537de3bec')


  return (
    <div className='p-4 border-y-[1px] border-borderGray'>
        {/* Post type */}
         <div className='flex items-center gap-2  text-sm text-textGray mb-2 fond-fold'>
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
  <path fill="#71767b"
        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"

  />
</svg>
            <span> sha dev reposted</span>
         </div>
         {/* POST CONTENT */}
         <div className='flex gap-4'>
            {/* avatar */}
           <div className='relative w-10 h-10 rounded-full overflow-hidden'> 
               <Imag path='/general/avatar.png' alt='' w={100} h={100}  tr={true} />
           </div>
           {/* content */}
           <div className='flex-1 flex flex-col gap-2'>
            {/* top */}
              <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2 flex-wrap'>
                    <h1 className='text-md font-bold'>sm dev</h1>
                    <span className='text-textGray'>@smdev</span>
                    <span className='text-textGray'>1 day ago</span>
                </div>
                <Postinfo/>
              </div>
              {/* text and media */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              {/* <Imag path='/general/post.jpeg' alt='' w={600} h={600} className='rounded-lg mt-2' tr={true}/> */}
              {
                fileDetails && fileDetails.fileType==='image'?(
                <Imag path={fileDetails.filePath} alt="" w={fileDetails.width} h={fileDetails.height} className={fileDetails.customMetaData?.sensitive?"blur-lg":""}/>):
                (<Video path={fileDetails.filePath} className={fileDetails.customMetaData?.sensitive?"blur-lg":""}/>)
              }
              <PostInteractions/>
           </div>
         </div>
    </div>
  )
}

export default Post