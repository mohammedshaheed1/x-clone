// "use client";
// import { Image } from '@imagekit/next';

// type ImagProps = {
//   path: string;
//   w?: number;
//   h?: number;
//   alt?: string 
//   className?: string;
//   tr?:boolean;
// }



// const Imag = ({path,w,h,alt,className,tr}:ImagProps) => {

//   const urlEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

//   return (
//     <div className=''>
//      <Image
//       urlEndpoint={urlEndpoint} // New prop
//       src={path}
//       width={w ?? 200}
//       height={h ?? 200}
//       alt={alt ?? ""}
//       {...(tr? {transformation:[{width:`${w}`, height:`${h}`}]}:{width:w, height:h})}
//       className={className}

//     />
//     </div>
//   )
// }

// export default Imag


"use client";
import { Image } from "@imagekit/next";
import { useEffect, useState } from "react";

type ImagProps = {
  path: string;
  w?: number;
  h?: number;
  alt?: string;
  className?: string;
  tr?: boolean;
};

const Imag = ({ path, w = 200, h = 200, alt = "", className, tr }: ImagProps) => {
  const [mounted, setMounted] = useState(false);
  const urlEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Image
        urlEndpoint={urlEndpoint!}
        src={path}
        alt={alt}
        width={w}
        height={h}
        // lqip={{active:true,quality:20}}
        className={className}
        {...(tr ? { transformation: [{ width: w, height: h }] } : {})}
      />
    </div>
  );
};

export default Imag;
