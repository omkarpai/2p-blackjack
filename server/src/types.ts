interface ReceivedTokenMessage {
    gameId: string;
    token: string;
}

interface JoinGameMessage {
    gameId: string;
    token: string | null;
}
