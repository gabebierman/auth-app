import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useSocketHook = (roomID, username) => {
    // create socket connection
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (!roomID || !username) return;
        // return conneciton outside of useEffect
        socketRef.current = io("http://localhost:8080", {
            query: {
                username,
                roomID,
            },
        });

        socketRef.current.on("new message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });
        socketRef.current.on("user connect", ({ username, time }) => {
            setMessages((curr) => [...curr, { time, body: `${username} has connected` }]);
        });
        socketRef.current.on("user disconnect", ({ username, time }) => {
            setMessages((curr) => [...curr, { time, body: `${username} has disconnected` }]);
        });

        return () => socketRef.current?.disconnect();
    }, [roomID, username]);

    function sendMessage(body) {
        socketRef.current.emit("new message", { body });
    }

    return { messages, sendMessage };
};

export default useSocketHook;
