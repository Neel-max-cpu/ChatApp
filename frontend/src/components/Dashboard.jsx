import React from 'react'
import { SidebarProvider } from './ui/sidebar'
import { Input } from './ui/input'
import Mainfriend from './Mainfriend'
import { Button } from './ui/button'


// button
import { Send, SendHorizontal } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className='flex h-screen bg-gray-950'>
            {/* left component */}
            <div className='h-full w-1/6'>
                {/* left component */}
                <SidebarProvider className="bg-[#272932] border-r-2 border-gray-700 shadow-gray-400 shadow-md">
                    <Mainfriend className="h-full w-full" />
                </SidebarProvider>
            </div>


            {/* right component */}
            <div className="h-screen w-5/6 flex">
                {/* Right component */}
                <div className="w-full h-full flex flex-col">
                    {/* Top part (Header with name and profile picture) */}
                    <div className="w-full bg-gray-800  flex items-center p-4">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbkECXtEG_6-RV7CSNgNoYUGZE-JCliYm9g&s"
                            alt="Profile"
                            className="w-10 h-10 mr-4 border-2 border-gray-50 rounded-full hover:cursor-pointer"
                        />
                        <span className="text-white font-medium text-lg hover:cursor-pointer">Person's Name</span>
                    </div>
                    {/* line */}
                    <hr className="border-t-2 border-gray-400 my-0" />

                    {/* Middle part (Chat display) */}
                    <div className="w-full flex-1 bg-gray-900 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
                        {/* Chat content */}
                        <div className="p-4 space-y-4">
                            {/* Incoming message */}
                            <div className="text-white bg-blue-500 rounded-xl p-3 w-fit max-w-[70%]">
                                Hello! Hi there!
                            </div>

                            {/* Outgoing message */}
                            <div className="text-white bg-gray-600 rounded-xl p-3 w-fit ml-auto max-w-[70%]">
                                I am Fine! How are you?
                            </div>                           
                            {/* Add more messages */}
                        </div>
                    </div>


                    {/* line */}
                    <hr className="border-t-2 border-gray-400 my-0" />

                    {/* Bottom part (Input area) */}
                    <div className="w-full bg-gray-800 p-4 flex items-center">
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 rounded-xl border-gray-500 p-2 bg-gray-700 border-none  placeholder:text-gray-400 text-gray-300"
                        />
                        <Button className="ml-4 bg-blue-700 text-white p-4 rounded-xl hover:bg-blue-900">
                            <SendHorizontal />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
