import React from 'react'
import { SidebarProvider } from './ui/sidebar'
import Mainfriend from './Mainfriend'

const Dashboard = () => {
    return (
        <div className='flex h-screen bg-gray-950'>
            <div className='h-full w-1/6'>                
                {/* left component */}
                <SidebarProvider className="bg-[#272932] border-r-2 border-gray-700 shadow-gray-400 shadow-md">
                    <Mainfriend className="h-full w-full" />
                </SidebarProvider>
            </div>
            <div className='h-screen w-5/6'>
                {/* right component */}
            </div>
        </div>
    )
}

export default Dashboard
