import { Player } from "./player";

export class Opponent extends Player {
    constructor(name, enemyPlayer, enemyBoard) {
        super(name, enemyBoard);
        this.turn = false;
        this.enemyPlayer = enemyPlayer;
        this.enemyBoard = enemyBoard;
        this.attackedArray = [];
    }
    generateRandomAttack(){
        if (this.turnStatus()){
            let randomAxis = { x: undefined, y: undefined };
            while(true){
                let xAxis = Math.floor((Math.random()*10));
                let yAxis = Math.floor((Math.random()*10));
                randomAxis.x = xAxis;
                randomAxis.y = yAxis;
                if(!(this.attackedArray.some(axis => axis.x === randomAxis.x && axis.y === randomAxis.y))) {
                    this.attackedArray.push(randomAxis);
                    this.attack(randomAxis.x, randomAxis.y, this.enemyPlayer, this.enemyBoard);
                    break;
                }
            }
        }
    }
    getAttackedArray() {
        return this.attackedArray;
    }
}