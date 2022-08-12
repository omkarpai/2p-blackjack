import ENV from "./env";
import express from "express";
import { indexRouter } from "./routes/IndexRouter";
import path from "path";
import { Server, Socket } from "socket.io";
import BlackjackGamestate from "./lib/BlackjackGamestate";
import log from "./logger/Logger";

const app = express();

app.use(express.static(path.resolve(__dirname + "../../client/build")));

app.use("*", indexRouter);

app.listen(ENV.PORT);

log(`Listening on ${ENV.PORT}`);

// ________________ GAMESTATES ________________
// Room ID is same as gameId
const rooms: Map<string, BlackjackGamestate> = new Map();

// ________________ SOCKETID to GAMEID MAP ______________________
const socketIdToGameIdMap: Map<string, string> = new Map();

const handleGameError = (e: any, socket: Socket) => {
    const message = e.message;
    log(message);
    socket.emit("game-error", new GameError({ message }));
};

const getGamestate = (gameId: string): BlackjackGamestate => {
    const gameState = rooms.get(gameId);
    if (!gameState) throw Error(`Unable to find gameState for ID ${gameId}`);
    return gameState;
};

// Socket server
const io = new Server(3001);
io.on("connection", (socket) => {
    socket.on("new-game", () => {
        const gameState = BlackjackGamestate.create();
        rooms.set(gameState.getId(), gameState);
        socket.join(gameState.getId());
        socket.emit("token", { gameId: gameState.getId(), token: gameState.getP1Token() });
    });

    socket.on("join-game", (msg: JoinGameMessage) => {
        try {
            const g = getGamestate(msg.gameId);
            if (!msg.token) {
                socket.emit("token", { gameId: g.getId(), token: g.getP2Token() });
                return;
            }
            g.handleJoinGame(msg);
            socket.join(g.getId());
        } catch (e: any) {
            handleGameError(e, socket);
        }
    });

    socket.on("received-token", (msg: ReceivedTokenMessage) => {
        try {
            const g = getGamestate(msg.gameId);
            g.setAssignedToken(msg);
        } catch (e: any) {
            handleGameError(e, socket);
        }
    });
});
