interface CardConstructor {
    suite: string;
    name: string;
    value: number;
}

class Card {
    private suite: string;
    private name: string;
    private value: number;

    constructor(obj: CardConstructor) {
        this.suite = obj.suite;
        this.name = obj.name;
        this.value = obj.value;
    }
}

export default Card;
