"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState

const fetchNotifications = async () => {
    const res = await fetch('https://api.nasa.gov/DONKI/notifications?api_key=Vg2VhzsUJsKgBEGyVXdLA28gijzTsywiXkXKJPkr');
    const data = await res.json(); // Ensure data is returned
    return data; // Return data from the function
};

export default function Home() {
    const [notifications, setNotifications] = useState([]); // State for notifications
    const [loading, setLoading] = useState(true); // Optional loading state

    useEffect(() => {
        const getNotifications = async () => {
            const data = await fetchNotifications();
            setNotifications(data); // Update state with fetched notifications
            setLoading(false); // Set loading to false
        };
        getNotifications();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen w-full bg-black  text-white text-9xl">Loading...</div>;
    return (
        <div className='flex items-center justify-center bg-black min-h-screen h-fit w-full overflow-hidden '>
            <div className="flex flex-col h-full items-center justify-center w-1/2 gap-24 mt-24">
                <div className="text-slate-300 text-7xl font-bold">ALERTS</div>
                {notifications.map((notification,i) => (
                    <div
                        key={i} // Use the message_id from the notification
                        className="flex flex-col w-full h-full border-4 border-slate-400 text-white gap-6 p-8 rounded-lg shadow-lg shadow-blue-500"
                    >
                        <a href={notification['messageURL']} className="w-fit text-center font-bold text-3xl hover:text-blue-500 border-2 border-slate-800 p-2 px-4 bg-slate-700 rounded-lg">
                            Source
                        </a>
                        <div className="mx-auto h-full w-full break-words text-xl">
                            {notification['messageBody']}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
