import { v4 as uuidv4 } from "uuid";
import PlayerConnectionData from "./PlayerConnectionData";
import PlayerGameData from "./PlayerGameData";

interface BlackjackGamestateConstructor {
    id: string;
    p1Token: string;
    p2Token: string;
}

class BlackjackGamestate {
    public handleJoinGame(token: string, socketId: string) {
        this.validateTokenBelongsToThisGamestate(token);
        const pcd = this.getPlayerConnectionDataByToken(token);
        pcd.assignToken(token);
        pcd.handleSocketConnect(socketId);
    }

    public handleLeaveGame(socketId: string) {
        const pcd = this.getPlayerConnectionDataBySocketId(socketId);
        pcd.handleSocketDisconnect();
    }

    private validateTokenBelongsToThisGamestate(token: string) {
        if (token === this.p1ConnectionData.getToken()) return;
        if (token === this.p2ConnectionData.getToken()) return;
        throw Error(`token in msg ${token} was not assigned in this game`);
    }

    private getPlayerGameDataByToken = (token: string) => {
        if (token === this.p1ConnectionData.getToken()) return this.p1GameData;
        if (token === this.p2ConnectionData.getToken()) return this.p2GameData;
        throw new Error(`Unable to get player game data for ${token}`);
    };

    private getPlayerConnectionDataByToken = (token: string) => {
        if (token === this.p1ConnectionData.getToken()) return this.p1ConnectionData;
        if (token === this.p2ConnectionData.getToken()) return this.p2ConnectionData;
        throw new Error(`Unable to get player connection data for ${token}`);
    };

    private getPlayerConnectionDataBySocketId = (socketId: string) => {
        if (socketId === this.p1ConnectionData.getSocketId()) return this.p1ConnectionData;
        if (socketId === this.p2ConnectionData.getSocketId()) return this.p2ConnectionData;
        throw new Error(`Unable to get player connection data for socket${socketId}`);
    };

    private id: string;

    private p1ConnectionData: PlayerConnectionData;
    private p2ConnectionData: PlayerConnectionData;
    private p1GameData: PlayerGameData;
    private p2GameData: PlayerGameData;

    private constructor(obj: BlackjackGamestateConstructor) {
        this.id = obj.id;
        this.p1ConnectionData = new PlayerConnectionData(obj.p1Token);
        this.p2ConnectionData = new PlayerConnectionData(obj.p2Token);
    }

    public static create(): BlackjackGamestate {
        const id = uuidv4();
        const p1Token = uuidv4();
        const p2Token = uuidv4();
        return new BlackjackGamestate({ id, p1Token, p2Token });
    }

    // Creates a copy of the gamestate with the details
    // of the opponent removed.
    // Example: if playerToken belongs to p1, p2 details are sanitised
    private getSanitisedCopyToSendTo(playerToken: string): BlackjackGamestate {
        const copy: BlackjackGamestate = { ...this };
        if (playerToken === this.p1ConnectionData.getToken()) copy.sanitisePlayer2();
        if (playerToken === this.p2ConnectionData.getToken()) copy.sanitisePlayer1();
        return copy;
    }

    private sanitisePlayer1(): void {
        this.p1ConnectionData.sanitise();
    }

    private sanitisePlayer2(): void {
        this.p2ConnectionData.sanitise();
    }

    public getId() {
        return this.id;
    }

    public getP1Token() {
        return this.p1ConnectionData.getToken();
    }

    public getP2Token() {
        return this.p2ConnectionData.getToken();
    }
}

export default BlackjackGamestate;
