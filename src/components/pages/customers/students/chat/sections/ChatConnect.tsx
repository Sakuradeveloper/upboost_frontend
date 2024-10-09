import { useEffect, useState, useRef } from 'react';

const ChatComponent = () => {
    const [message, setMessage] = useState<string>(''); // Explicitly typed as string
    const [messages, setMessages] = useState<string[]>([]); // Explicitly typed as an array of strings
    const socketRef = useRef<WebSocket | null>(null);  // Use WebSocket | null for the ref

    useEffect(() => {
        // Create a new WebSocket connection
        socketRef.current = new WebSocket('ws://localhost:8000/ws/chat/');  

        // Handle WebSocket open event
        socketRef.current.onopen = () => {
            console.log('WebSocket connection established.');
        };

        // Handle WebSocket message event
        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);  // Add new message to the state
        };

        // Handle WebSocket error event
        socketRef.current.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        // Handle WebSocket close event
        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        // Clean up WebSocket when the component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.close();  // Close the WebSocket connection if it exists
            }
        };
    }, []);

    const sendMessage = () => {
        // Check if WebSocket connection is open before sending a message
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ message }));  // Send message as a JSON string
            setMessage('');  // Clear input field after sending message
        } else {
            console.log('WebSocket connection is not open yet.');
        }
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
