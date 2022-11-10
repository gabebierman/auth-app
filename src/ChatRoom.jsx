import React, { useState, useEffect, useRef } from "react";
import useSocketHook from "./useSocket";
import { auth } from "./firebase.config";
import { useParams } from "react-router-dom";
import ChatDisplay from "./ChatDisplay";

function ChatRoom() {
    const { id } = useParams();
    const divRef = useRef(null);
    const [message, setMessage] = useState("");
    const { messages, sendMessage } = useSocketHook(id, auth.currentUser?.displayName);
    useEffect(() => {
        divRef.current?.scrollTo({
            top: divRef.current?.scrollHeight,
        });
    }, [messages]);

    return (
        <div>
            <div
                ref={divRef}
                style={{
                    height: "400px",
                    width: "90%",
                    margin: "2px",
                    border: "1px solid black",
                    overflowY: "scroll",
                }}
            >
                {messages.map((m, idx) => (
                    <ChatDisplay key={idx} {...m} />
                ))}
            </div>
            <form>
                <label htmlFor="msg"></label>
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
            </form>
        </div>
    );
}

export default ChatRoom;
