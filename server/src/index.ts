import ENV from "./env";
import express from "express";
import { indexRouter } from "./routes/IndexRouter";
import path from "path";
import { Server } from "socket.io";
import BlackjackGamestate from "./lib/BlackjackGamestate";

const app = express();

app.use(express.static(path.resolve(__dirname + "../../client/build")));

app.use("*", indexRouter);

app.listen(ENV.PORT);

console.log("Listening on ", ENV.PORT);

// Room ID is same as gameId
const rooms: Map<string, BlackjackGamestate> = new Map();

// Socket server
const io = new Server(3001);
io.on("connection", (socket) => {
    socket.on("new-game", (msg) => {
        const gameState = BlackjackGamestate.create();
        rooms.set(gameState.getId(), gameState);
        socket.join(gameState.getId());
        socket.emit("game-create-success", gameState);
    });

    socket.on("join-game", (msg) => {});
});
