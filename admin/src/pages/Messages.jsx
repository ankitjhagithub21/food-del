import React, { useState, useEffect } from 'react';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/message`,{
              credentials:'include'
            });
            const data = await response.json();
            if (data.success) {
              
                
                setMessages(data.messages)
                
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold mb-5">Messages</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {messages.length === 0 ? (
                        <p>No messages found.</p>
                    ) : (
                        <ul>
                            {messages.map((msg, index) => (
                                <li key={index} className='border my-2 p-3 rounded-lg'>
                                   <h2 className='text-xl'>Name: {msg.username}</h2>
                                   <p>Message:{msg.message}</p>
                                   <p>Date:{msg.date.slice(0,10)}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
