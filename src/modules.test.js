import { Ship } from "./ship";
import { GameBoard } from "./gameBoard";
import { Player } from "./player";
import { Opponent } from "./opponent";

describe("ship", () => {
    it("returns array with same length as the ship's", () => {
        const length = 3;
        const ship = new Ship(length);
        expect(ship.getShipLength()).toBe(3);
    })
    it("has array of objects with hit properties", () => {
        const ship = new Ship(4);
        const array = [{ isHit: false }, { isHit: false }, { isHit: false }, { isHit: false }];
        expect(ship.getShipArray()).toEqual(array);
    })
    it("is hittable", () => {
        const ship = new Ship(5);
        ship.hit(4);
        expect(ship.getShipArray()[4]).toEqual({ isHit: true });
    })
    it("is sinkable", () => {
        const ship = new Ship(2);
        ship.hit(0);
        ship.hit(1);
        expect(ship.isSunk()).toBe(true);
    })
})

describe("game board", () => {
    it("returns arrays inside of array", () => {
        const board = new GameBoard();
        expect(board.getGameBoard().length).toBe(10);
        expect(board.getGameBoard()[9].length).toBe(10);
    })
    it("has cells with expected properties", () => {
        const board = new GameBoard();
        const properties = { shipName: undefined, shipIndex: undefined };
        expect(board.getGameBoard()[9][9]).toEqual(properties);
    })
    it("can place ship", () => {
        const board = new GameBoard();
        const ship = new Ship(2);
        board.placeShip(ship, 9, 8);
        expect(board.getGameBoard()[8][9]).toEqual({ shipName: ship, shipIndex: 0});
        expect(board.getGameBoard()[9][9]).toEqual({ shipName: ship, shipIndex: 1});
    })
    it("can't place ship outside game board", () => {
        const board = new GameBoard();
        const ship = new Ship(2);
        board.placeShip(ship, 9, 9);
        expect(board.getGameBoard()[9][9]).toEqual({ shipName: undefined, shipIndex: undefined});
    })
    it ("can't place ship on occupied cells", () => {
        const board = new GameBoard();
        const battleShip = new Ship(4);
        const transporter = new Ship(5);
        board.placeShip(battleShip, 9, 3);
        board.placeShip(transporter, 9, 0);
        expect(board.getGameBoard()[3][9]).toEqual({ shipName: battleShip, shipIndex: 0});
        expect(board.getGameBoard()[0][9]).toEqual({ shipName: undefined, shipIndex: undefined});
    })
    it ("can receive hit if ship is present", () => {
        const board = new GameBoard();
        const ship = new Ship(2);
        board.placeShip(ship, 9, 0);
        board.receiveHit(9,1);
        expect(ship.getShipArray()[1].isHit).toBe(true);
    })
    it ("tracks missed hits", () => {
        const board = new GameBoard();
        board.receiveHit(9, 9);
        expect(board.trackMissedHits()[0]).toEqual({ x: 9, y: 9});
    })
    it ("knows if game is over", () => {
        const board = new GameBoard();
        const ship1 = new Ship(1);
        const ship2 = new Ship(2);
        board.placeShip(ship1, 0, 0);
        board.placeShip(ship2, 1, 0);
        board.receiveHit(0, 0);
        board.receiveHit(1, 0);
        expect(board.isGameOver()).toBe(false);
        board.receiveHit(1, 1);
        expect(board.isGameOver()).toBe(true);
    })
})

describe("player", () => {
    it("returns the same name as inputted", () => {
        const player = new Player("dummyName");
        expect(player.getName()).toBe("dummyName");
    })
    it("starts opponent's turn after ending your turn", () => {
        const player = new Player("you");
        const opponent = new Player("enemy");
        player.endTurn(opponent);
        expect(player.turnStatus()).toBe(false);
        expect(opponent.turnStatus()).toBe(true);
    })
    it("allows player on the move to attack", () => {
        const enemyBoard = new GameBoard();
        const player = new Player("you");
        const opponent = new Player("enemy");
        const enemyShip = new Ship(2);
        enemyBoard.placeShip(enemyShip, 0, 0);
        player.attack(0, 0, opponent, enemyBoard);
        expect(enemyShip.getShipArray()[0].isHit).toBe(true);
    })
    it("starts opponent's turn after you attack", () => {
        const enemyBoard = new GameBoard();
        const player = new Player("you");
        const opponent = new Player("enemy");
        const enemyShip = new Ship(2);
        enemyBoard.placeShip(enemyShip, 0, 0);
        player.attack(0, 0, opponent, enemyBoard);
        expect(player.turnStatus()).toBe(false);
        expect(opponent.turnStatus()).toBe(true);
    })
})

describe("opponent", () => {
    it("returns the same name as inputted", () => {
        const opponent = new Opponent("enemy");
        expect(opponent.getName()).toBe("enemy");
    })
    it("starts with turn value of false", () => {
        const opponent = new Opponent("enemy");
        expect(opponent.turnStatus()).toBe(false);
    })
    it("can return fire and store attacked axes", () => {
        const playerBoard = new GameBoard();
        const enemyBoard = new GameBoard();
        const player = new Player("you");
        const enemy = new Opponent("computer", player, playerBoard);
        player.attack(0, 0, enemy, enemyBoard);
        enemy.generateRandomAttack();
        expect(enemy.getAttackedArray().length).toBe(1);
    })
    it("only attacks if turn value is true", () => {
        const playerBoard = new GameBoard();
        const enemyBoard = new GameBoard();
        const player = new Player("you");
        const enemy = new Opponent("computer", player, playerBoard);
        player.attack(0, 0, enemy, enemyBoard);
        enemy.generateRandomAttack();
        enemy.generateRandomAttack();
        enemy.generateRandomAttack();
        expect(enemy.getAttackedArray().length).toBe(1);
    })
})