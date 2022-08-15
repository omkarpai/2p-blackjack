import Card from "./Card";
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
    constructor(obj: PlayerGameDataConstructor) {
        this.upCard = obj.upCard;
        this.downCards = new Array<Card>();
        this.isBust = false;
        this.turnStatus = TurnStatus.WAITING;
        this.total = obj.upCard.value;
    }

    public endTurn() {
        this.turnStatus = TurnStatus.DONE;
    }

    public addToDownCards(card: Card) {
        this.downCards.push(card);
        this.calculateTotalAndDetermineIfBust();
    }

    private calculateTotalAndDetermineIfBust() {
        this.calculateTotal();
        this.determineIsBust();
    }

    private determineIsBust() {
        this.isBust = this.total > 21 ? true : false;
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
