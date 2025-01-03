import { useState, useEffect } from 'react'
import { SidebarContent, SidebarFooter, SidebarHeader } from './ui/sidebar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { use } from 'react'
import { useNavigate, Link } from 'react-router-dom';

// json file
import friendlist from "../assets/friendlist.json"

const Mainfriend = () => {
    const [friends, setFriends] = useState([]);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/profile'); 
    };

    useEffect(() => {
        setFriends(friendlist);
    }, []);

    return (
        <div className='h-screen w-full bg-gray-900 flex flex-col'>
            {/*search username*/}
            <SidebarHeader className="bg-gray-800 p-4">
                <Input type="text" placeholder="Search Friend" className="placeholder:text-gray-500 text-gray-300 border-none bg-gray-900 rounded-xl">
                </Input>
                <Button className="bg-blue-700 hover:bg-blue-900 rounded-xl text-white">
                    Search
                </Button>
            </SidebarHeader>
            {/* line */}
            <hr className="border-t-2 border-gray-400 my-0" />

            {/* friend list */}
            <SidebarContent className="flex-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
                <div className="p-4">
                    {friends.map((friend, index) => (
                        <div key={friend.id}>
                            {/* Friend Card */}
                            <div className="flex items-center py-4">
                                <img
                                    src={friend.profilePic}
                                    alt={`${friend.username}'s profile`}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <span className="text-gray-300">{friend.username}</span>
                            </div>
                            {/* Divider Line */}
                            {index !== friends.length - 1 && (
                                <hr className="border-t border-gray-700" />
                            )}
                        </div>
                    ))}
                </div>
            </SidebarContent>

            {/* footer */}
            <SidebarFooter className="bg-gray-800 p-2 border-t-2 border-gray-400">
                {/* <Input type="text" placeholder="Search Username" className="text-gray-500 border-none rounded-xl bg-gray-900">
                </Input>
                <Button className="bg-blue-700 hover:bg-blue-900 rounded-xl text-white">
                    Send request
                </Button> */}

                <div className="flex items-center">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvCvhJhHOUxxRoXZGNwYomsL9ms-atp-p9eA&s"
                        className="w-10 h-10 rounded-full mr-4 hover:pointer"
                        onClick={handleNavigate}
                    />
                    <span onClick={handleNavigate} className="text-gray-300 hover:cursor-pointer">Main User</span>
                </div>

            </SidebarFooter>
        </div>
    )
}

export default Mainfriend


