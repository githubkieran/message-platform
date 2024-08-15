import React, { useState } from "react";
import './Style.css';

function MainPage() {
    //logic
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handlePost = () => {
        if (newMessage.trim()) {
            const currentTimestamp = new Date().toLocaleString();
            const messageObject = {
                text: newMessage,
                timeStamp: currentTimestamp
            };
            setMessages([...messages, messageObject]);
            setNewMessage(""); //clears textarea after post
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
                                <p>{message.text}</p>
                                <small>{message.timeStamp}</small>
                            </div>
                        ))
                    ) : (
                        <p>No messages yet. Start the conversation in the New Message box below!.</p>
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
