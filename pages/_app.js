import '@/styles/globals.css'
import { useState } from 'react';
import Router from 'next/router';


export default function App({ Component, pageProps }) {
  const [loading, setLoading]=useState(false);
  Router.events.on('routeChangeStart', (url)=>{
    setLoading(true);
  })
  Router.events.on('routeChangeComplete', (url)=>{
    setTimeout(()=> {setLoading(false)},1000);
  })

  return (
    <>
    {loading && (
      <div className='flex justify-center items-center bg-white loading'>
      <img src='loading.svg' alt='Loading...'/> 
      </div>
    )}
  <Component {...pageProps} />
  </>)
}
