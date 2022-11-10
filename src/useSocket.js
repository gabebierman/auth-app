import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const useSocketHook = (roomID, username) => {
    // create socket connection
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
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
        socketRef.current.on("banned message", (msg) => {
            setMessages((curr) => [...curr, msg]);
        });
        socketRef.current.on("room full", () => {
            console.log(`${roomID} is full`);
            navigate("/join-room");
        });

        return () => socketRef.current?.disconnect();
    }, [roomID, username]);

    function sendMessage(body) {
        socketRef.current.emit("new message", { body });
    }

    return { messages, sendMessage };
};

export default useSocketHook;
