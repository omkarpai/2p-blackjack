import Card from "./Card";
import RoundStatus from "./RoundStatus";
import TurnStatus from "./TurnStatus";

interface PlayerGameDataConstructor {
    upCard: Card;
}

class PlayerGameData {
    private upCard: Card;
    private downCards: Array<Card>;
    private isBust: boolean;
    private turnStatus: TurnStatus;
    private total: number;
    public roundStatus: RoundStatus | undefined;
    constructor(obj: PlayerGameDataConstructor) {
        this.upCard = obj.upCard;
        this.downCards = new Array<Card>();
        this.isBust = false;
        this.turnStatus = TurnStatus.WAITING;
        this.total = obj.upCard.value;
        this.roundStatus = undefined;
    }

    public endTurn() {
        this.validateTurnNotOver();
        this.turnStatus = TurnStatus.OVER;
    }

    public addToDownCards(card: Card) {
        this.validateTurnNotOver();
        this.downCards.push(card);
        this.calculateTotalAndDetermineIfBust();
    }

    public getTurnStatus() {
        return this.turnStatus;
    }

    private validateTurnNotOver() {
        if (this.turnStatus === TurnStatus.OVER) throw Error(`Unable to make move.status is DONE`);
    }

    private calculateTotalAndDetermineIfBust() {
        this.calculateTotal();
        this.determineIsBust();
    }

    private determineIsBust() {
        this.isBust = this.total > 21 ? true : false;
        if (this.isBust) this.turnStatus = TurnStatus.OVER;
    }

    private calculateTotal() {
        let total = this.upCard.value;
        for (const downCard of this.downCards) {
            total += downCard.value;
        }
        this.total = total;
    }
}

export default PlayerGameData;
