class PlayerConnectionData {
    assignToken(msg: ReceivedTokenMessage) {
        if (msg.token !== this.token) return;
        if (this.isTokenAssigned) throw Error(`Token is already asssigned`);
        this.isTokenAssigned = true;
    }

    private token: string;
    private isTokenAssigned: boolean;
    private socketId: string | undefined;
    private isConnected: boolean;
    constructor(token: string) {
        this.token = token;
        this.isTokenAssigned = false;
        this.socketId = undefined;
        this.isConnected = false;
    }

    public sanitise = () => {
        this.token = "";
        this.socketId = "";
    };

    public getToken = () => {
        return this.token;
    };

    public getSocketId = () => {
        return this.socketId;
    };

    public getIsTokenAssigned = () => {
        return this.isTokenAssigned;
    };

    public handleSocketConnect = (socketId: string) => {
        this.socketId = socketId;
        this.isConnected = true;
    };
    public handleSocketDisconnect = () => {
        this.socketId = undefined;
        this.isConnected = false;
    };
}

export default PlayerConnectionData;
