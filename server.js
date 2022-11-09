const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
    // how to determine which room they are joining

    // how to determine WHO they are or have that be provided by the FE

    // join desired room

    socket.join("");

    //tell room that user has joined

    io.to("").emit("join notification");

    socket.on("disconnect", () => {});
});

server.listen(PORT, () => console.log(`socket.io server funcitonal on port ${PORT}`));
