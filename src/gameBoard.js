export class GameBoard {
    constructor() {
        this.gameBoardArray = this.generateGameBoard();
        this.missedHits = [];
    }
    generateGameBoard() {
        let arrayX = [];
        let arrayY = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                arrayY.push({ shipName: undefined, shipIndex: undefined});
            }
            arrayX.push(arrayY);
            arrayY = [];
        }
        return arrayX;
    }
    getGameBoard() {
        return this.gameBoardArray;
    }
    placeShip(ship, x, y) {
        if (this.isPlacementValid(ship.getShipLength(), x, y)) {
            for (let i = 0; i < ship.getShipLength(); i++) {
                this.gameBoardArray[y + i][x].shipName = ship;
                this.gameBoardArray[y + i][x].shipIndex = i;
            }
        }
    }
    isPlacementValid(length, x, y) {
        if (x > 10 || x < 0 || y > 10 || y < 0 || y + length > 10) {
            return false;
        } else {
            for (let i = y; i < y + length; i++) {
                if (this.gameBoardArray[i][x].shipName != undefined) {
                    return false;
                }
            }
            return true;
        }
    }
    receiveHit(x, y) {
        if (this.gameBoardArray[y][x].shipName === undefined) {
            this.missedHits.push({ x: x, y: y});
        } else {
            this.gameBoardArray[y][x].shipName.hit(this.gameBoardArray[y][x].shipIndex);
        }
    }
    trackMissedHits(){
        return this.missedHits;
    }
    isGameOver(){
        let gameOver = true;
        this.gameBoardArray.forEach((cellX) => {
            cellX.forEach((cellY) => {
                if (cellY.shipName) {
                    if (cellY.shipName.isSunk() === false) {
                        gameOver = false;
                    }
                }
            })
        })
        return gameOver;
    }
}