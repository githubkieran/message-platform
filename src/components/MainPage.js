import React, { useState, useEffect } from "react";
import './Style.css';
import axios from "axios";

function MainPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Fetch messages when component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/messages')
        .then(response => {
            setMessages(response.data);
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            alert('Error fetching messages.');
        });
    }, []);

const handlePost = () => {
    if (newMessage.trim()) {
        const currentTimestamp = new Date().toLocaleString();
        const messageObject = {
            text: newMessage,
            timeStamp: currentTimestamp
        };
        axios.post('http://localhost:5000/api/messages', messageObject)
        .then(response => {
            setMessages(prevMessages => [...prevMessages, messageObject]);
            setNewMessage(""); //clears the textarea after posting
        })
        .catch(error => {
            console.error('Error posting message: ', error);
            alert('Error posting message.');
        });
    } else {
        alert("You cannot post an empty message.");
    }
};
    return (
        <div className="mainContainer">
            <div className="contentWrapper">
                <h1>Messaging Platform</h1>
                <p>
                    This is a messaging platform. Make an account for free and then post anonymously! 
                    (but please behave). <br />
                    *All messages are deleted after one hour.*
                </p>
                <h3>Current Messages:</h3>
                <div>
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div key={index} className="messageItem">
                                <p>{message.content}</p>
                                <small>{message.timestamp}</small>
                            </div>
                        ))
                    ) : (
                        <p className="noMsg">No messages yet. Start the conversation in the New Message box below!</p>
                    )}
                </div>
                <div>
                    <h3>New Message</h3>
                    <textarea 
                        placeholder="Enter message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea> <br />
                    <input type="submit" value={"Post"} onClick={handlePost}></input>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
