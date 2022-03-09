export class Player {
    constructor(name) {
        this.name = name;
        this.turn = true;
    }
    getName() {
        return this.name;
    }
    endTurn(nextPlayer) {
        this.turn = false;
        nextPlayer.startTurn();
    }
    startTurn() {
        this.turn = true;
    }
    turnStatus() {
        return this.turn;
    }
    attack(x, y, opponent, opponentBoard) {
        if (this.turnStatus()) {
            opponentBoard.receiveHit(x, y);
            this.endTurn(opponent);
        }
    }    
}