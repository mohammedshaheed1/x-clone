"use client"
import { IKVideo } from 'imagekitio-react';

 const urlEndpoint= process.env.NEXT_PUBLIC_API_ENDPOINT 
type videoTypes={
    path:string;
    className?:string
}


const Video = ({path,className}:videoTypes) => {
    return (
     
            <IKVideo
               urlEndpoint={urlEndpoint}
                path={path}
                transformation={[{ width: "1920", height: "1080",q:"90" }]}
                controls
                className={className}
            />
       
    )
}

export default Video