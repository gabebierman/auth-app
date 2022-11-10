const COLORS = require("./colors");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 8080;
const BANNED_WORDS = [
    "bruins",
    "manchester",
    "manchester united",
    "manchester city",
    "can you cover my shift",
];

io.on("connection", (socket) => {
    // how to determine which room they are joining
    // how to determine WHO they are or have that be provided by the FE

    const { roomID, username } = socket.handshake.query;
    const userColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    // join desired room

    socket.join(roomID);

    //tell room that user has joined

    io.to(roomID).emit("user connect", { username, time: new Date() });

    // handle when a user sends a message

    socket.on("new message", ({ body }) => {
        if (BANNED_WORDS.some((word) => body.toLowerCase().includes(word))) {
            io.to(socket.id).emit("banned message", {
                time: new Date(),
                userColor: "red",
                username: "WARNING",
                body: "You have used a word or phrase that is not allowed on this server. Quit it. Only you can see this message.",
            });
            return;
        }
        io.to(roomID).emit("new message", { username, userColor, body, time: new Date() });
    });

    // handle when a user disconnects

    socket.on("disconnect", () => {
        io.to(roomID).emit("user disconnect", { username });
    });
});

server.listen(PORT, () => console.log(`socket.io server funcitonal on port ${PORT}`));
