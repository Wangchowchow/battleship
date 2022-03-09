import { Ship } from "./ship";
import { GameBoard } from "./gameBoard";
import { Player } from "./player";
import { Opponent } from "./opponent";

const shipFactory = document.querySelector(".ship-factory");
const transporterInput = document.querySelector("#transporter");
const battleshipInput = document.querySelector("#battleship");
const submarineInput = document.querySelector("#submarine");
const destroyerInput = document.querySelector("#destroyer");
const scoutInput = document.querySelector("#scout");
const enemySide = document.querySelector(".enemy");
const winnerContainer = document.querySelector(".winner-container");
const winnerIs = document.querySelector(".winner");
const playAgainButton = document.querySelector(".play-again");

let transporter = new Ship(5);
let battleship = new Ship(4);
let submarine = new Ship(3);
let destroyer = new Ship(3);
let scout = new Ship(2);

let enemyTransporter = new Ship(5);
let enemyBattleship = new Ship(4);
let enemySubmarine = new Ship(3);
let enemyDestroyer = new Ship(3);
let enemyScout = new Ship(2);

let playerBoard = new GameBoard();
let enemyBoard = new GameBoard();

let player = new Player("Player");
let enemy = new Opponent("Enemy", player, playerBoard);

dragShip(transporterInput);
dragShip(battleshipInput);
dragShip(submarineInput);
dragShip(destroyerInput);
dragShip(scoutInput);

randomizeShipPosition(enemyTransporter);
randomizeShipPosition(enemyBattleship);
randomizeShipPosition(enemySubmarine);
randomizeShipPosition(enemyDestroyer);
randomizeShipPosition(enemyScout);

createBoard("player-board");
createBoard("enemy-board");
render("player-board", playerBoard);
render("enemy-board", enemyBoard);

function randomizeShipPosition(ship) {
    while (true) {
        let xAxis = Math.floor(Math.random()*10);
        let yAxis = Math.floor(Math.random()*10);
        if (enemyBoard.isPlacementValid(ship.getShipLength(), xAxis, yAxis)) {
            enemyBoard.placeShip(ship, xAxis, yAxis);
            break;
        }
    }
}

function dragShip(element) {
    element.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    })
}

function dropShip(e) {
    let data = e.dataTransfer.getData("text");
    let x = parseInt(e.target.getAttribute("data-x"));
    let y = parseInt(e.target.getAttribute("data-y"));
    switch (data) {
        case "transporter":
            if (playerBoard.isPlacementValid(transporter.length, x, y)) {
                playerBoard.placeShip(transporter, x, y);
                render("player-board", playerBoard);
                let ship = document.querySelector(`#${data}`);
                shipFactory.removeChild(ship);
                if (shipFactory.childNodes.length <= 6) {
                    shipFactory.style.display = "none";
                    enemySide.style.display = "flex";
                }
            }
            break;
        case "battleship":
            if (playerBoard.isPlacementValid(battleship.length, x, y)) {
                playerBoard.placeShip(battleship, x, y);
                render("player-board", playerBoard);
                let ship = document.querySelector(`#${data}`);
                shipFactory.removeChild(ship);
                if (shipFactory.childNodes.length <= 6) {
                    shipFactory.style.display = "none";
                    enemySide.style.display = "flex";
                }
            }
            break;
        case "submarine":
            if (playerBoard.isPlacementValid(submarine.length, x, y)) {
                playerBoard.placeShip(submarine, x, y);
                render("player-board", playerBoard);
                let ship = document.querySelector(`#${data}`);
                shipFactory.removeChild(ship);
                if (shipFactory.childNodes.length <= 6) {
                    shipFactory.style.display = "none";
                    enemySide.style.display = "flex";
                }
            }
            break;
        case "destroyer":
            if (playerBoard.isPlacementValid(destroyer.length, x, y)) {
                playerBoard.placeShip(destroyer, x, y);
                render("player-board", playerBoard);
                let ship = document.querySelector(`#${data}`);
                shipFactory.removeChild(ship);
                if (shipFactory.childNodes.length <= 6) {
                    shipFactory.style.display = "none";
                    enemySide.style.display = "flex";
                }
            }
            break;
        case "scout":
            if (playerBoard.isPlacementValid(scout.length, x, y)) {
                playerBoard.placeShip(scout, x, y);
                render("player-board", playerBoard);
                let ship = document.querySelector(`#${data}`);
                shipFactory.removeChild(ship);
                if (shipFactory.childNodes.length <= 6) {
                    shipFactory.style.display = "none";
                    enemySide.style.display = "flex";
                }
            }
            break;
    }
}

function createBoard(boardName) {
    let boardClass = document.querySelector(`.${boardName}`);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-x", j);
            cell.setAttribute("data-y", i);
            if (boardName === "enemy-board") {
                cell.addEventListener("click", (e) => {
                    attackEvent(e.target);
                })
            } else if (boardName === "player-board") {
                cell.addEventListener("dragover", (e) => {
                    e.preventDefault();
                })
                cell.addEventListener("drop", (e) => {
                    e.preventDefault();
                    dropShip(e);
                })
            }
            boardClass.appendChild(cell);
        }
    }
}

function attackEvent(coordinate) {
    let x = coordinate.getAttribute("data-x");
    let y = coordinate.getAttribute("data-y");
    player.attack(x, y, enemy, enemyBoard);
    render("enemy-board", enemyBoard);
    coordinate.style.pointerEvents = "none";
    if (enemyBoard.isGameOver()) {
        announceWinner("You Win");
    }
    enemy.generateRandomAttack();
    render("player-board", playerBoard);
    if (playerBoard.isGameOver()) {
        announceWinner("Enemy Wins");
    }
}
function announceWinner(text) {
    winnerContainer.style.display = "block";
    winnerIs.textContent = text;
}
playAgainButton.addEventListener("click", () => {
    location.reload();
})
function render(boardName, board) {
    let boardArray = board.getGameBoard();
    let missedHitsArray = board.trackMissedHits();

    boardArray.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell.shipName) {
                if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex]) === true) {
                    let thisCell = document.querySelector(`.${boardName} [data-x="${x}"][data-y="${y}"]`);
                    thisCell.textContent = "X";
                    thisCell.classList.add("hit");
                    thisCell.classList.remove("occupied");
                } else if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex]) === false) {
                    if (boardName === "player-board") {
                        let thisCell = document.querySelector(`.${boardName} [data-x="${x}"][data-y="${y}"]`);
                        thisCell.classList.add("occupied");
                    }
                }
            }
        })
    })
    missedHitsArray.forEach((hit) => {
        let thisCell = document.querySelector(`.${boardName} [data-x="${hit.x}"][data-y="${hit.y}"]`);
        thisCell.textContent = "X";
        thisCell.classList.add("missed");
    })
}