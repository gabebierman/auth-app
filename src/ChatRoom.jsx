import React, { useState } from "react";
import useSocketHook from "./useSocket";
import { auth } from "./firebase.config";
import { useParams } from "react-router-dom";
import ChatDisplay from "./ChatDisplay";

function ChatRoom() {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const { messages, sendMessage } = useSocketHook(id, auth.currentUser?.displayName);
    return (
        <div>
            <div>
                {messages.map((m, idx) => (
                    <ChatDisplay key={idx} {...m} />
                ))}
            </div>
            <div>
                <label htmlFor="msg">message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="msg"
                ></textarea>
                <button
                    disabled={message.length === 0}
                    onClick={() => {
                        sendMessage(message);
                        setMessage("");
                    }}
                >
                    send
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
