/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameBoard\": () => (/* binding */ GameBoard)\n/* harmony export */ });\nclass GameBoard {\n    constructor() {\n        this.gameBoardArray = this.generateGameBoard();\n        this.missedHits = [];\n    }\n    generateGameBoard() {\n        let arrayX = [];\n        let arrayY = [];\n        for (let i = 0; i < 10; i++) {\n            for (let j = 0; j < 10; j++) {\n                arrayY.push({ shipName: undefined, shipIndex: undefined});\n            }\n            arrayX.push(arrayY);\n            arrayY = [];\n        }\n        return arrayX;\n    }\n    getGameBoard() {\n        return this.gameBoardArray;\n    }\n    placeShip(ship, x, y) {\n        if (this.isPlacementValid(ship.getShipLength(), x, y)) {\n            for (let i = 0; i < ship.getShipLength(); i++) {\n                this.gameBoardArray[y + i][x].shipName = ship;\n                this.gameBoardArray[y + i][x].shipIndex = i;\n            }\n        }\n    }\n    isPlacementValid(length, x, y) {\n        if (x > 10 || x < 0 || y > 10 || y < 0 || y + length > 10) {\n            return false;\n        } else {\n            for (let i = y; i < y + length; i++) {\n                if (this.gameBoardArray[i][x].shipName != undefined) {\n                    return false;\n                }\n            }\n            return true;\n        }\n    }\n    receiveHit(x, y) {\n        if (this.gameBoardArray[y][x].shipName === undefined) {\n            this.missedHits.push({ x: x, y: y});\n        } else {\n            this.gameBoardArray[y][x].shipName.hit(this.gameBoardArray[y][x].shipIndex);\n        }\n    }\n    trackMissedHits(){\n        return this.missedHits;\n    }\n    isGameOver(){\n        let gameOver = true;\n        this.gameBoardArray.forEach((cellX) => {\n            cellX.forEach((cellY) => {\n                if (cellY.shipName) {\n                    if (cellY.shipName.isSunk() === false) {\n                        gameOver = false;\n                    }\n                }\n            })\n        })\n        return gameOver;\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _opponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./opponent */ \"./src/opponent.js\");\n\n\n\n\n\nconst shipFactory = document.querySelector(\".ship-factory\");\nconst transporterInput = document.querySelector(\"#transporter\");\nconst battleshipInput = document.querySelector(\"#battleship\");\nconst submarineInput = document.querySelector(\"#submarine\");\nconst destroyerInput = document.querySelector(\"#destroyer\");\nconst scoutInput = document.querySelector(\"#scout\");\nconst enemySide = document.querySelector(\".enemy\");\nconst winnerContainer = document.querySelector(\".winner-container\");\nconst winnerIs = document.querySelector(\".winner\");\nconst playAgainButton = document.querySelector(\".play-again\");\n\nlet transporter = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(5);\nlet battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4);\nlet submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\nlet destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\nlet scout = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2);\n\nlet enemyTransporter = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(5);\nlet enemyBattleship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4);\nlet enemySubmarine = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\nlet enemyDestroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\nlet enemyScout = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2);\n\nlet playerBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__.GameBoard();\nlet enemyBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__.GameBoard();\n\nlet player = new _player__WEBPACK_IMPORTED_MODULE_2__.Player(\"Player\");\nlet enemy = new _opponent__WEBPACK_IMPORTED_MODULE_3__.Opponent(\"Enemy\", player, playerBoard);\n\ndragShip(transporterInput);\ndragShip(battleshipInput);\ndragShip(submarineInput);\ndragShip(destroyerInput);\ndragShip(scoutInput);\n\nrandomizeShipPosition(enemyTransporter);\nrandomizeShipPosition(enemyBattleship);\nrandomizeShipPosition(enemySubmarine);\nrandomizeShipPosition(enemyDestroyer);\nrandomizeShipPosition(enemyScout);\n\ncreateBoard(\"player-board\");\ncreateBoard(\"enemy-board\");\nrender(\"player-board\", playerBoard);\nrender(\"enemy-board\", enemyBoard);\n\nfunction randomizeShipPosition(ship) {\n    while (true) {\n        let xAxis = Math.floor(Math.random()*10);\n        let yAxis = Math.floor(Math.random()*10);\n        if (enemyBoard.isPlacementValid(ship.getShipLength(), xAxis, yAxis)) {\n            enemyBoard.placeShip(ship, xAxis, yAxis);\n            break;\n        }\n    }\n}\n\nfunction dragShip(element) {\n    element.addEventListener(\"dragstart\", (e) => {\n        e.dataTransfer.setData(\"text/plain\", e.target.id);\n    })\n}\n\nfunction dropShip(e) {\n    let data = e.dataTransfer.getData(\"text\");\n    let x = parseInt(e.target.getAttribute(\"data-x\"));\n    let y = parseInt(e.target.getAttribute(\"data-y\"));\n    switch (data) {\n        case \"transporter\":\n            if (playerBoard.isPlacementValid(transporter.length, x, y)) {\n                playerBoard.placeShip(transporter, x, y);\n                render(\"player-board\", playerBoard);\n                let ship = document.querySelector(`#${data}`);\n                shipFactory.removeChild(ship);\n                if (shipFactory.childNodes.length <= 6) {\n                    shipFactory.style.display = \"none\";\n                    enemySide.style.display = \"flex\";\n                }\n            }\n            break;\n        case \"battleship\":\n            if (playerBoard.isPlacementValid(battleship.length, x, y)) {\n                playerBoard.placeShip(battleship, x, y);\n                render(\"player-board\", playerBoard);\n                let ship = document.querySelector(`#${data}`);\n                shipFactory.removeChild(ship);\n                if (shipFactory.childNodes.length <= 6) {\n                    shipFactory.style.display = \"none\";\n                    enemySide.style.display = \"flex\";\n                }\n            }\n            break;\n        case \"submarine\":\n            if (playerBoard.isPlacementValid(submarine.length, x, y)) {\n                playerBoard.placeShip(submarine, x, y);\n                render(\"player-board\", playerBoard);\n                let ship = document.querySelector(`#${data}`);\n                shipFactory.removeChild(ship);\n                if (shipFactory.childNodes.length <= 6) {\n                    shipFactory.style.display = \"none\";\n                    enemySide.style.display = \"flex\";\n                }\n            }\n            break;\n        case \"destroyer\":\n            if (playerBoard.isPlacementValid(destroyer.length, x, y)) {\n                playerBoard.placeShip(destroyer, x, y);\n                render(\"player-board\", playerBoard);\n                let ship = document.querySelector(`#${data}`);\n                shipFactory.removeChild(ship);\n                if (shipFactory.childNodes.length <= 6) {\n                    shipFactory.style.display = \"none\";\n                    enemySide.style.display = \"flex\";\n                }\n            }\n            break;\n        case \"scout\":\n            if (playerBoard.isPlacementValid(scout.length, x, y)) {\n                playerBoard.placeShip(scout, x, y);\n                render(\"player-board\", playerBoard);\n                let ship = document.querySelector(`#${data}`);\n                shipFactory.removeChild(ship);\n                if (shipFactory.childNodes.length <= 6) {\n                    shipFactory.style.display = \"none\";\n                    enemySide.style.display = \"flex\";\n                }\n            }\n            break;\n    }\n}\n\nfunction createBoard(boardName) {\n    let boardClass = document.querySelector(`.${boardName}`);\n    for (let i = 0; i < 10; i++) {\n        for (let j = 0; j < 10; j++) {\n            let cell = document.createElement(\"div\");\n            cell.classList.add(\"cell\");\n            cell.setAttribute(\"data-x\", j);\n            cell.setAttribute(\"data-y\", i);\n            if (boardName === \"enemy-board\") {\n                cell.addEventListener(\"click\", (e) => {\n                    attackEvent(e.target);\n                })\n            } else if (boardName === \"player-board\") {\n                cell.addEventListener(\"dragover\", (e) => {\n                    e.preventDefault();\n                })\n                cell.addEventListener(\"drop\", (e) => {\n                    e.preventDefault();\n                    dropShip(e);\n                })\n            }\n            boardClass.appendChild(cell);\n        }\n    }\n}\n\nfunction attackEvent(coordinate) {\n    let x = coordinate.getAttribute(\"data-x\");\n    let y = coordinate.getAttribute(\"data-y\");\n    player.attack(x, y, enemy, enemyBoard);\n    render(\"enemy-board\", enemyBoard);\n    coordinate.style.pointerEvents = \"none\";\n    if (enemyBoard.isGameOver()) {\n        announceWinner(\"You Win\");\n    }\n    enemy.generateRandomAttack();\n    render(\"player-board\", playerBoard);\n    if (playerBoard.isGameOver()) {\n        announceWinner(\"Enemy Wins\");\n    }\n}\nfunction announceWinner(text) {\n    winnerContainer.style.display = \"block\";\n    winnerIs.textContent = text;\n}\nplayAgainButton.addEventListener(\"click\", () => {\n    location.reload();\n})\nfunction render(boardName, board) {\n    let boardArray = board.getGameBoard();\n    let missedHitsArray = board.trackMissedHits();\n\n    boardArray.forEach((row, y) => {\n        row.forEach((cell, x) => {\n            if (cell.shipName) {\n                if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex]) === true) {\n                    let thisCell = document.querySelector(`.${boardName} [data-x=\"${x}\"][data-y=\"${y}\"]`);\n                    thisCell.textContent = \"X\";\n                    thisCell.classList.add(\"hit\");\n                    thisCell.classList.remove(\"occupied\");\n                } else if (cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex]) === false) {\n                    if (boardName === \"player-board\") {\n                        let thisCell = document.querySelector(`.${boardName} [data-x=\"${x}\"][data-y=\"${y}\"]`);\n                        thisCell.classList.add(\"occupied\");\n                    }\n                }\n            }\n        })\n    })\n    missedHitsArray.forEach((hit) => {\n        let thisCell = document.querySelector(`.${boardName} [data-x=\"${hit.x}\"][data-y=\"${hit.y}\"]`);\n        thisCell.textContent = \"X\";\n        thisCell.classList.add(\"missed\");\n    })\n}\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/opponent.js":
/*!*************************!*\
  !*** ./src/opponent.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Opponent\": () => (/* binding */ Opponent)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nclass Opponent extends _player__WEBPACK_IMPORTED_MODULE_0__.Player {\n    constructor(name, enemyPlayer, enemyBoard) {\n        super(name, enemyBoard);\n        this.turn = false;\n        this.enemyPlayer = enemyPlayer;\n        this.enemyBoard = enemyBoard;\n        this.attackedArray = [];\n    }\n    generateRandomAttack(){\n        if (this.turnStatus()){\n            let randomAxis = { x: undefined, y: undefined };\n            while(true){\n                let xAxis = Math.floor((Math.random()*10));\n                let yAxis = Math.floor((Math.random()*10));\n                randomAxis.x = xAxis;\n                randomAxis.y = yAxis;\n                if(!(this.attackedArray.some(axis => axis.x === randomAxis.x && axis.y === randomAxis.y))) {\n                    this.attackedArray.push(randomAxis);\n                    this.attack(randomAxis.x, randomAxis.y, this.enemyPlayer, this.enemyBoard);\n                    break;\n                }\n            }\n        }\n    }\n    getAttackedArray() {\n        return this.attackedArray;\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/opponent.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    constructor(name) {\n        this.name = name;\n        this.turn = true;\n    }\n    getName() {\n        return this.name;\n    }\n    endTurn(nextPlayer) {\n        this.turn = false;\n        nextPlayer.startTurn();\n    }\n    startTurn() {\n        this.turn = true;\n    }\n    turnStatus() {\n        return this.turn;\n    }\n    attack(x, y, opponent, opponentBoard) {\n        if (this.turnStatus()) {\n            opponentBoard.receiveHit(x, y);\n            this.endTurn(opponent);\n        }\n    }    \n}\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n    constructor(length) {\n        this.length = length;\n        this.ship = this.generateShipArray();\n    }\n    generateShipArray(){\n        let shipArray = [];\n        for (let i = 0; i < this.length; i++) {\n            shipArray.push({ isHit: false });\n        }\n        return shipArray;\n    }\n    getShipLength(){\n        return this.ship.length;\n    }\n    getShipArray(){\n        return this.ship;\n    }\n    hit(indexOfArray){\n        this.ship[indexOfArray].isHit = true;\n    }\n    isSunk(){\n        if (this.ship.every(this.checkHit)) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n    checkHit(object){\n        if (object.isHit === true) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;