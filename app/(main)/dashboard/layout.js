'use server';
import React, { Suspense } from 'react'
import DashboardPage from './page';
import {BarLoader} from "react-spinners"
import { getStaff, getUnauthUser} from '@/actions/admin';
import NotFound from '@/app/not-found';
import { Notable} from 'next/font/google';

const fontNotable = Notable({
  subsets: ["latin"],
  weight: [ "400"]
})

const DashboardLayout = async () => {
  const user = await getStaff();


  if(!user.authorized){
    await getUnauthUser();
    return NotFound()
  }
  return (
    <div className='bg-[#F5F5F5] px-5'>
        <h1 className={`text-6xl md:text-[5rem]/[1] mb-5 w-full ${fontNotable.className} font-normal tracking-wider text-center md:text-start`}>Dashboard</h1>

        {/* Dashboard Page`` */}
        <Suspense 
            fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>}>
                <DashboardPage/>   
        </Suspense>

    </div>
  )
}

export default DashboardLayout;
