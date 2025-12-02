import React from 'react'

const Footer = () => {
  return (
    <div 
        className={`top-0 w-full bg-white backdrop-blur-md 
        z-50 border-b rounded-b-lg  transition-colors 
        duration-300`}>
            <footer className="bg-[#E5E5E5] py-0 border-t-[1px] border-[#F4F6FA] ">
              <div className="container mx-auto px-4 text-center text-[#0D0D0D]">
                <p className='text-xs'>© 2025 Tristan Raphael A. Payong. All rights reserved.</p>
              </div>

            </footer>
      
    </div>
  )
}

export default Footer
