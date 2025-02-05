import React, { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate, Link } from 'react-router-dom';
import { Pencil, Check, X, ArrowBigLeft } from 'lucide-react';

const ProfilePage = ({ isOwnProfile, user }) => {
    const [status, setStatus] = useState(user?.status || '');
    const [isEditing, setIsEditing] = useState(false);


    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/dashboard'); 
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSaveStatus = () => {
        setIsEditing(false);
        // Save status to the backend or state
        console.log('Status saved:', status);
    };


    const handleSendFriendRequest = () => {
        // Logic for sending a friend request
        console.log(`Friend request sent to ${user.name}`);
    };

    const handleUnfriend = () => {
        // Logic for unfriending
        console.log(`Unfriended ${user.name}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-20">
            {/* Top navigation area */}
            <div className="w-full flex items-center justify-start">
                <Button onClick={handleNavigate} className="flex items-center justify-center p-2 bg-blue-700 hover:bg-blue-900 rounded-xl">
                    <ArrowBigLeft className="h-12 w-12" />
                    Back
                </Button>
            </div>

            {/* Profile Picture */}
            <div className="w-40 h-40 relative">
                <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full border-4 border-gray-700 object-cover"
                />
                {/* {isOwnProfile && (
                    <Button className="absolute bottom-2 right-2 bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-full text-sm">
                        <Pencil />
                    </Button>
                )} */}
                
                <Button className="absolute bottom-2 right-2 bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-full text-sm">
                    <Pencil />
                </Button>                
            </div>

            {/* Status Section */}
            <div className="mt-6 w-full max-w-md ">
                <div className='flex space-x-3 items-center justify-center'>
                    <h2 className="text-lg  items-center justify-center flex">Name</h2>
                    <h2 className="text-lg  items-center justify-center flex">Username</h2>
                </div>
                <h2 className="text-lg my-3 font-bold items-center justify-center flex">✨Status✨</h2>
                {/* {isOwnProfile && isEditing ? (
                    <div>
                        <textarea
                            value={status}
                            onChange={handleStatusChange}
                            maxLength={50}
                            className="w-full bg-gray-800 border border-white p-2 rounded mt-2 text-white"
                        ></textarea>
                        <Button
                            onClick={handleSaveStatus}
                            className="mt-2 bg-blue-500 p-2 rounded text-white"
                        >
                            <Pencil />
                        </Button>
                    </div>
                ) : (
                    <p
                        className={`mt-2 flex justify-center items-center ${isOwnProfile ? 'hover:cursor-pointer' : ''}`}
                        onClick={() => isOwnProfile && setIsEditing(true)}
                    >
                        {status || 'No status set.'}
                    </p>
                )} */}
                {isEditing ? (
                    <div>
                        <textarea
                            value={status}
                            onChange={handleStatusChange}
                            maxLength={50}
                            className="w-full bg-gray-800 border border-white p-2 rounded mt-2 text-white"
                        ></textarea>
                        <Button
                            onClick={handleSaveStatus}
                            className="mt-2 bg-blue-500 p-2 rounded text-white"
                        >
                            <Pencil />
                        </Button>
                    </div>
                ) : (
                    <p
                        className={`mt-2 flex justify-center items-center ${isOwnProfile ? 'hover:cursor-pointer' : ''}`}
                        onClick={() => isOwnProfile && setIsEditing(true)}
                    >
                        {status || 'No status set.'}
                    </p>
                )}
                
            </div>


            {/* Add Friend Section */}
            {/* {isOwnProfile && ( */}
                <div className='flex justify-center items-center my-4 space-x-4'>
                    <Input type="text" placeholder="Search Username" className="text-gray-500 border-none rounded-xl bg-black">
                    </Input>
                    <Button className="bg-blue-700 hover:bg-blue-900 rounded-xl text-white">
                        Send request
                    </Button>
                </div>
            {/* )} */}


            {/* accept friend req */}
            {/* {isOwnProfile && ( */}
                <div className="p-4 bg-gray-700 rounded-xl">
                    {/* map here ---------- */}
                    <div className='flex space-x-4 items-center justify-center'>
                        <span>user1(username)</span>
                        {/* action buttons  */}
                        <Button
                            className="bg-blue-700 hover:bg-blue-900 text-white rounded"
                        >
                            <Check />
                        </Button>
                        <Button className="bg-red-700 hover:bg-red-900 text-white rounded">
                            <X />
                        </Button>
                    </div>
                </div>
            {/* )} */}



            {/* Unfriend Section */}
            {/* {!isOwnProfile && (
                <div className="mt-6">
                    <Button
                        onClick={handleUnfriend}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                    >
                        Unfriend
                    </Button>
                </div>
            )} */}
        </div>
    )
}

export default ProfilePage
