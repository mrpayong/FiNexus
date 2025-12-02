import React from 'react'
import SettingsForm from './_components/settings-form'
import { Notable } from 'next/font/google'


const fontNotable = Notable({
  subsets: ["latin"],
  weight: [ "400"]
})

const SettingsPage = () => {
  return (
    <div className='p-6'>
      <h1 className={`${fontNotable.className} text-4xl md:text-[5rem]/[1] font-normal mb-6`}>User List</h1>
      <SettingsForm />
      {/* view detailes: about which accounts a user handles. IN CLIENT PAGE */}
    </div>
  )
}

export default SettingsPage
