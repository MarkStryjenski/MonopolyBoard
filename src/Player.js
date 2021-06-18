const {addMessage} = require("./Dice");

function Player(name, number, color) {
    this.name = name;
    this.number = number;
    this.totalMoneyAmount = 1500;
    this.color = color;
    this.lastKnownPosition = 0;
    this.positionAfterRolling = 0;
    // this.previousPosition = 0;
    this.nrOfRoundsInPrison=-1;
    // this.positionBeforeMoving=0;

    this.addMoney = function (e) {
        this.totalMoneyAmount = this.totalMoneyAmount + e;
        console.log("Added amount: " + e);
        return this.totalMoneyAmount;
    }

    this.subtractMoney = function (amount) {
        // let totalMoneyLeft=parseInt(this.totalMoneyAmount);
        var amountLeft = this.totalMoneyAmount - amount;
        if (amountLeft > 0) {
            this.totalMoneyAmount = this.totalMoneyAmount - amount;
            return true;
        } else {
            addMessage("Player "+this.name+" does not have enough money to pay\n");
            // console.log("Player does not have enough money to pay\n");
            return false;
        }
    }

    this.buyHouse = function (fieldObj) {
        if (fieldObj.buildHouse() != -1) {
            console.log(fieldObj);
            // console.log(fieldObj.getHouseCost);
            if (this.subtractMoney(fieldObj.houseCost) != false) {
                // console.log("House building successful ")
                addMessage("House has been successfully build. Field " + fieldObj.name + " now has " + fieldObj.nrOfHousesBuild + " houses\n");
                return true;
            }
        } else {
            // console.log("Max nr of houses to build reached");
            addMessage("Max nr of houses to build reached \n");
            return false;
        }
    }


    this.setTotalMoneyAmount = function (e) {
        this.totalMoneyAmount = e;
    }
}

module.exports = {
    Player: Player,
};