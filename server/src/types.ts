import PlayerAction from "./lib/PlayerAction";

interface JoinGameMessage {
    gameId: string;
    token: string | null;
}

interface PlayerActionMessage {
    gameId: string;
    token: string;
    action: PlayerAction;
}

export { JoinGameMessage, PlayerActionMessage };
