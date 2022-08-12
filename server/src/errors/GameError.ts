interface GameErrorConstructor {
    message: string;
}

class GameError {
    message: string;
    constructor(obj: GameErrorConstructor) {
        this.message = obj.message;
    }
}
