import Card from "./Card";
import CardSuite from "./CardSuite";
import CardValue from "./CardValue";

class Deck {
    private cards: Array<Card>;
    constructor() {
        this.cards = Deck.generate();
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
}

export default Deck;
