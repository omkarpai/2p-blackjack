import { v4 as uuidv4 } from "uuid";

interface BlackjackGamestateConstructor {
    id: string;
    p1Token: string;
    p2Token: string;
}

class BlackjackGamestate {
    handleJoinGame(msg: JoinGameMessage) {
        this.validateGameId(msg.gameId);
        this.validateTokenBelongsToThisGamestate(msg);
    }

    private validateTokenBelongsToThisGamestate(msg: JoinGameMessage) {
        if (msg.token === this.p1Token) return;
        if (msg.token === this.p2Token) return;
        throw Error(`token in msg ${msg.token} was not assigned in this game`);
    }

    private id: string;

    private p1Token: string;
    private isP1TokenAssigned: boolean;
    private p2Token: string;
    private isP2TokenAssigned: boolean;

    private constructor(obj: BlackjackGamestateConstructor) {
        this.id = obj.id;
        this.p1Token = obj.p1Token;
        this.isP1TokenAssigned = false;
        this.p2Token = obj.p2Token;
        this.isP2TokenAssigned = false;
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
        if (playerToken === this.p1Token) copy.sanitisePlayer2();
        if (playerToken === this.p2Token) copy.sanitisePlayer1();
        return copy;
    }

    private sanitisePlayer1(): void {
        this.p1Token = "";
    }

    private sanitisePlayer2(): void {
        this.p2Token = "";
    }

    public getId() {
        return this.id;
    }

    public getP1Token() {
        return this.p1Token;
    }

    public getP2Token() {
        return this.p2Token;
    }

    private validateGameId = (gid: string) => {
        if (gid !== this.id) throw Error(`GID error this:${this.id} token:${gid}`);
    };

    public setAssignedToken(msg: ReceivedTokenMessage) {
        this.validateGameId(msg.gameId);
        if (msg.token === this.p1Token) {
            if (this.isP1TokenAssigned) throw Error(`p1 token is already asssigned`);
            this.isP1TokenAssigned = true;
        }
        if (msg.token === this.p2Token) {
            if (this.isP2TokenAssigned) throw Error(`p2 token is already asssigned`);
            this.isP2TokenAssigned = true;
        }
    }
}

export default BlackjackGamestate;
