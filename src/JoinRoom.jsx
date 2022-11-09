import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";

function JoinRoom() {
    const [roomID, setRoomID] = useState("");
    const navigate = useNavigate();
    return (
        <>
            <div>JoinRoom</div>
            <input
                id="room-id"
                onChange={(e) => setRoomID(e.target.value)}
                placeholder="Enter 4 digit Room ID"
            ></input>
            <button
                disabled={roomID.length < 4}
                onClick={() => {
                    navigate(`/room/${roomID}`);
                }}
            >
                Join room
            </button>
        </>
    );
}

export default JoinRoom;
