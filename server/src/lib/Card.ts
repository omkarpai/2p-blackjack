interface CardConstructor {
    suite: string;
    name: string;
    value: number;
}

class Card {
    readonly suite: string;
    readonly name: string;
    readonly value: number;

    constructor(obj: CardConstructor) {
        this.suite = obj.suite;
        this.name = obj.name;
        this.value = obj.value;
    }
}

export default Card;
