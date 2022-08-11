import { v4 as uuidv4 } from "uuid";

interface BlackjackGamestateConstructor {
    id: string;
    p1Token: string;
    p2Token: string;
}

class BlackjackGamestate {
    private id: string;

    private p1Token: string;

    private p2Token: string;

    private constructor(obj: BlackjackGamestateConstructor) {
        this.id = obj.id;
        this.p1Token = obj.p1Token;
        this.p2Token = obj.p2Token;
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
}

export default BlackjackGamestate;
