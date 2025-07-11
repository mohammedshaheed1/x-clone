import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import { ClerkProvider } from "@clerk/nextjs";

export default function BoardLayout({
  children,
  model
}: Readonly<{
  children: React.ReactNode;
  model:React.ReactNode;
}>) {
  return (
    
  <ClerkProvider>
          <div className='max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl-max-w-screen-xxl mx-auto flex justify-between '>
              <div className='px-2 xsm:px-4 xxl:px-4'><LeftBar/></div>
               <div className='flex-1 lg:min-w-[600px] border-x-[1px] border-borderGray'>
                {children}
                {model}
                </div>
                <div className='hidden ml-4 md:ml-8 lg:flex flex-1'><RightBar/></div>
          </div>
    </ClerkProvider>
    
  );
}
