import Card from "./Card";
import CardSuite from "./CardSuite";
import CardValue from "./CardValue";

class Deck {
    private cards: Array<Card>;
    constructor() {
        this.cards = Deck.generate();
        this.shuffle();
    }

    private static getCardValueEntries() {
        return Object.entries(CardValue).filter((v) => isNaN(Number(v[0])));
    }

    private static getSuites() {
        return Object.keys(CardSuite).filter((v) => isNaN(Number(v)));
    }

    private static generate(): Array<Card> {
        const cardValuesEntries = Deck.getCardValueEntries();
        const suites = Deck.getSuites();
        const cards = new Array<Card>();
        for (const suite of suites) {
            for (const [name, value] of cardValuesEntries) {
                cards.push(new Card({ suite, name, value: Number(value) }));
            }
        }
        return cards;
    }

    // Shuffle implementation reference
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    private shuffle() {
        const array = this.cards;
        let currentIndex = array.length;
        let randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }

    public resetAndShuffle() {
        this.cards = Deck.generate();
        this.shuffle();
    }

    public getTopCard(): Card {
        const topCard = this.cards.pop();
        if (!topCard) throw Error("Cannot get top card as deck is empty");
        return topCard;
    }
}

export default Deck;
