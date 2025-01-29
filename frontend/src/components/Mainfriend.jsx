import { useState, useEffect } from 'react'
import { SidebarContent, SidebarFooter, SidebarHeader } from './ui/sidebar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { use } from 'react'
import { useNavigate, Link } from 'react-router-dom';


import axios from "axios";

// json file -- for checking
// import friendlist from "../assets/friendlist.json"
import img from "../assets/defaultPic.jpg"



const Mainfriend = ({ onUserClick }) => {
    const [friends, setFriends] = useState([]);
    const [chats, setChats] = useState({});     // To track latest messages per user


    const navigate = useNavigate();
    // would be user's profile ---------
    const handleNavigate = () => {
        navigate('/profile');
    };

    // for joson
    /*
    useEffect(() => {
        setFriends(friendlist);
    }, []);
    */

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const token = localStorage.getItem("token"); // Ensure token exists                                          

                const response = await axios.get("http://localhost:5000/api/friends/allfriends", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // console.log("Friends API Response:", response.data); // Debugging

                if (Array.isArray(response.data)) {
                    setFriends(response.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching friends:", error.response?.data || error.message);
            }
        };

        fetchFriends();
    }, []);



    return (
        <div className='h-screen w-full bg-gray-900 flex flex-col'>
            {/*search username*/}
            <SidebarHeader className="bg-gray-800 p-4">
                <Input type="text" placeholder="Search Users" className="placeholder:text-gray-500 text-gray-300 border-none bg-gray-900 rounded-xl">
                </Input>
                <Button className="bg-blue-700 hover:bg-blue-900 rounded-xl text-white">
                    Search
                </Button>
            </SidebarHeader>
            {/* line */}
            <hr className="border-t-2 border-gray-400 my-0" />

            {/* friend list for json hard coded--- */}
            {/* <SidebarContent className="flex-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
                <div className="p-4">
                    {friends.map((friend, index) => (
                        <div key={friend.id}> */}
            {/* Friend Card */}
            {/* <div onClick={() => onUserClick(friend)} className="flex items-center py-4 hover:cursor-pointer hover:bg-gray-800">
                                <img
                                    src={friend.profilePic}
                                    alt={`${friend.username}'s profile`}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <span className="text-gray-300">{friend.username}</span>
                            </div> */}
            {/* Divider Line */}
            {/* {index !== friends.length - 1 && (
                                <hr className="border-t border-gray-700" />
                            )}
                        </div>
                    ))}
                </div>
            </SidebarContent> */}


            <SidebarContent className="flex-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
                <div className="p-4">
                    {friends.map((friend, index) => (
                        <div key={friend._id}> {/* Use friend._id instead of index */}
                            {/* Friend Card */}
                            <div onClick={() => onUserClick(friend)} className="flex items-center py-4 hover:cursor-pointer hover:bg-gray-800">
                                <img
                                    src={friend.profilePic || img} // Default profile pic
                                    alt={`${friend.username}'s profile`}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <span className="text-gray-300">{friend.name}</span>
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


