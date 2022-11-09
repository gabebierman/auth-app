import React from "react";

function ChatDisplay({ username, body, time, userColor }) {
    return (
        <div>
            <span style={{ color: userColor ?? "black", fontWeight: "bold" }}>
                {username ?? "SYSTEM"}
            </span>
            <span
                style={{
                    color: "grey",
                    fontSize: "11px",
                    fontWeight: "lighter",
                    marginLeft: "10px",
                }}
            >
                {time}
            </span>
            <div>{body}</div>
        </div>
    );
}

export default ChatDisplay;
