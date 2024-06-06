import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Test({user}) {
  const [showNav, setShowNav] = useState(false);
  
  return (
    <nav className="bg-gray-900 p-3 m-1 rounded-md md:m-0 md:rounded-none z-10 sticky top-0">
      <div className="container mx-auto flex justify-between md:items-center mt-2">
          <Link href={'/'} className='text-white font-bold text-xl flex gap-1'>
            <Image className='h-7 ' src='/favicon.ico' alt=''/>
            Madrasa Kalamela</Link>
             <div className="p-0"> 
                <div className="text-right m-auto p-0 text-white mt-2">
              <button onClick={()=>setShowNav(showNav?false:true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
                </div>
                <div
          className={'flex flex-col text-right '+ (showNav ? 'block' : 'hidden')}
        >
          <Link href="/programme" className="text-white m-2 text-xl md:mx-4 hover:text-slate-400">
            Programmes
          </Link>
          {user?.email && (
            <>
          <Link href="/admin" className="text-white m-2 md:mx-4 text-xl hover:text-slate-400">
            Admin Dashboard
          </Link>
          </>)}
          {user?.username && (
            <>
          <Link href="/madrasa" className="text-white m-2 md:mx-4 text-xl hover:text-slate-400">
            Madrasa Dashboard
          </Link>
          </>)}
          <Link href="/stagemanage" className="text-white m-2 text-xl md:mx-4 hover:text-slate-400">
            Stages
          </Link>
          <Link href="/results" className="text-white m-2 md:mx-4 text-xl hover:text-slate-400">
            Results
          </Link>
          <Link href="/message" className="text-white m-2 md:mx-4 text-xl hover:text-slate-400">
            Messages
          </Link>
          <Link href="/contact" className="text-white m-2 md:mx-4 text-xl hover:text-slate-400">
            Contact
          </Link>
        </div>
             </div>
      </div>
    </nav>
  );
};
