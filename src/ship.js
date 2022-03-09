export class Ship {
    constructor(length) {
        this.length = length;
        this.ship = this.generateShipArray();
    }
    generateShipArray(){
        let shipArray = [];
        for (let i = 0; i < this.length; i++) {
            shipArray.push({ isHit: false });
        }
        return shipArray;
    }
    getShipLength(){
        return this.ship.length;
    }
    getShipArray(){
        return this.ship;
    }
    hit(indexOfArray){
        this.ship[indexOfArray].isHit = true;
    }
    isSunk(){
        if (this.ship.every(this.checkHit)) {
            return true;
        } else {
            return false;
        }
    }
    checkHit(object){
        if (object.isHit === true) {
            return true;
        } else {
            return false;
        }
    }
}