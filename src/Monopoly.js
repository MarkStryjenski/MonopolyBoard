// import 'regenerator-runtime/runtime';
import {Client} from 'boardgame.io/client';
import {Local} from 'boardgame.io/multiplayer';
import {TicTacToe} from './Game';
import {Dice, addMessage} from './Dice.js';
import {Field, fields} from './Field.js';
import {Player} from './Player.js';
// import {Card,cards,getRandomCard } from './Card.js';

var player1 = new Player("Marek", 0, "blue");
var player2 = new Player("Adam", 1, "green");
var player3 = new Player("Jurek", 2, "red");

// player1.setTotalMoneyAmount(-10);

const idEndTurn = "end-turn";
const idRollButton = "roll";
const idFieldOwner = "owner-";
const idBuyButton = "buy-button";
const idPassButton = "pass-button";
const idSellButton = "sell-button";
const idBuyHouse = "buy-house-button";
const idSellHouse = "sell-house-button";
const idProposeButton = "propose-button"
const idTradeButton = "trade-button";
const idPlayers = "players";


// fields[37].owner=player2;
// fields[39].owner=player2;
// fields[37].setComplete=true;
// fields[39].setComplete=true;
// console.log(fields[37]);
// console.log(fields[39]);

class Monopoly {
    numOfPlayers = 0;

    currentPlayer = 0;
    currentField = 0;
    currentFieldObj = fields[this.currentField];
    turnOver = false;
    players = [];

    constructor(rootElement, numOfPlayers) {
        this.numOfPlayers = numOfPlayers;
        //Max number of allowed players is 4
        if (numOfPlayers > 4) {
            numOfPlayers = 3;
        }
        this.client = Client({game: TicTacToe, numPlayers: numOfPlayers});
        this.client.start();
        this.rootElement = rootElement;
        this.createBoard();
        this.addPlayers();
        this.attachListeners();

    }


    getCurrentPlayer() {
        return this.players[this.currentPlayer];
    }

    addPlayers() {
        this.players.push(player1);
        this.players.push(player2);
        this.players.push(player3);
        // console.log(this.players.length);
        this.createPlayerBoxes();


    }

    createPlayerBoxes() {
        const playersDiv = this.rootElement.querySelector(`#${idPlayers}`);
        for (var i = 0; i < this.players.length; i++) {
            let playerDiv = playersDiv.appendChild(document.createElement("div"));
            playerDiv.id = this.players[i].name;
            playerDiv.textContent = "Player Number: " + this.players[i].number + "|| Name: " + this.players[i].name + " " + this.players[i].totalMoneyAmount + "$";
            playerDiv.style.color = this.players[i].color;
        }
    }

    updatePlayersStatusBoxes() {

        for (var i = 0; i < this.players.length; i++) {
            var idPlayer = this.players[i].name;
            let playerDiv = this.rootElement.querySelector(`#${idPlayer}`);
            playerDiv.id = this.players[i].name;
            playerDiv.textContent = "Player Number: " + this.players[i].number + " Name: " + this.players[i].name + " " + this.players[i].totalMoneyAmount + "$";
            playerDiv.style.color = this.players[i].color;
        }
    }

    createBoard() {
        // Create cells in rows for the Tic-Tac-Toe board.
        const rows = [];
        for (let i = 0; i < 11; i++) {
            const cells = [];
            if (i == 0 || i == 10) {
                if (i == 0) {
                    var id = 20;
                    for (let j = 0; j < 11; j++) {
                        cells.push(`<td class="cell" id="cell-${id}" data-id="${id}"></td>`);
                        id++;
                    }
                } else if (i == 10) {
                    var id = 10;
                    for (let j = 0; j < 11; j++) {
                        cells.push(`<td class="cell" id="cell-${id}" data-id="${id}"></td>`);
                        id--;
                    }
                }
            } else {
                var id = 0;
                for (let j = 0; j < 3; j++) {
                    if (i == 1) {
                        if (j == 0) {
                            id = 19;
                        } else if (j == 2) {
                            id = 31;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 2) {
                        if (j == 0) {
                            id = 18;
                        } else if (j == 2) {
                            id = 32;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 3) {
                        if (j == 0) {
                            id = 17;
                        } else if (j == 2) {
                            id = 33;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 4) {
                        if (j == 0) {
                            id = 16;
                        } else if (j == 2) {
                            id = 34;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 5) {
                        if (j == 0) {
                            id = 15;
                        } else if (j == 2) {
                            id = 35;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 6) {
                        if (j == 0) {
                            id = 14;
                        } else if (j == 2) {
                            id = 36;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 7) {
                        if (j == 0) {
                            id = 13;
                        } else if (j == 2) {
                            id = 37;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 8) {
                        if (j == 0) {
                            id = 12;
                        } else if (j == 2) {
                            id = 38;
                        } else {
                            id = "mid";
                        }
                    } else if (i == 9) {
                        if (j == 0) {
                            id = 11;
                        } else if (j == 2) {
                            id = 39;
                        } else {
                            id = "mid";
                        }
                    }
                    if (j == 1) {
                        cells.push(`<td class="cell-mid" colspan="9"  data-id="${id}"></td>`);
                        // cells.push(`<td class="cell" colspan="9"  data-id="${id}"></td>`);
                    } else if (j == 0) {
                        cells.push(`<td class="cell" id="cell-${id}" data-id="${id}"></td>`);
                    } else {
                        cells.push(`<td class="cell" id="cell-${id}" data-id="${id}"></td>`);
                    }
                }
            }
            rows.push(`<tr>${cells.join('')}</tr>`);
        }

        // Add the HTML to our monopoly <div>.
        // We’ll use the empty <p> to display the game winner later.
        this.rootElement.innerHTML = `
      <table>${rows.join('')}</table>
      <div id="all-interactions-container">
          <p class="winner"></p>
          <div id="action-container">
    <!--        <textarea id="text-area" rows="6" cols="80"></textarea>-->
            <div id="current-player">
                <p id="player-name"></p>
                <p id="player-total-money-amount"></p>
            </div>
                <input type="button" id="roll" title="Roll the dice and move your token accordingly." value="Roll Dice"/>
                 <input type="button" id="end-turn" title="End turn" value="End turn" style="display:none"/>
                <input type="button" id="buy-button" title="Buy property." value="Buy" style="display:none"/>
                <input type="button" id="pass-button" title="Pass on buying property." value="Pass" style="display:none"/>
                <input type="button" id="sell-button" title="Sell property." value="Sell property" style="display:none"/>
                <input type="button" id="buy-house-button" title="Buy house" value="Buy House" style="display:none"/>
                <input type="button" id="sell-house-button" title="Sell house" value="Sell House" style="display:none"/>
          </div>
          <div id="players">
    
          </div>
          <div id="trade-container">
                <input type="button" id="trade-button" title="Trade" value="Trade" style="display:block"/>
                <div id="trade-players">
                        <p id="trade-players-text" title="">Propose offer to:</p>
                        <input type="button" class="button-trade-players" id="player-0-button-offer" title="Player 0 offer"  value="0" style="display:block"/>
                        <input type="button" class="button-trade-players" id="player-1-button-offer" title="Player 1 offer"  value="1" style="display:block"/>
                        <input type="button" class="button-trade-players" id="player-2-button-offer" title="Player 2 offer"  value="2" style="display:block"/>
                        <input type="button" class="button-trade-players" id="player-3-button-offer" title="Player 3 offer"  value="3" style="display:block"/>
                </div>
                <div id="offer" class="propose-content-containers">
                    <p>Current player offers:</p>
                    <div>
                        <input type="button" class="offer-money-button" id="offered-0-money-amount-button" title="Money offered"  value="0" style="display:block"/>
                        <input type="button" class="offer-money-button" id="offered-10-money-amount-button" title="Money offered"  value="10" style="display:block"/>
                        <input type="button" class="offer-money-button" id="offered-100-money-amount-button" title="Money offered"  value="100" style="display:block"/>
                    </div>
                    <p class="trade-money-amount" id="offered-money-amount-text" title="0">0$</p>
                </div>
    <!--            <input type="number" id="offered-money-amount-button" title="Money offered" placeholder="$" value="Amount current player wants" style="display:block"/>-->
                <div id="receive" class="propose-content-containers">
                    <p>Current player receives:</p>
                    <div>
                        <input type="button" class="require-money-button" id="receive-0-money-amount-button" title="Money received"  value="0" style="display:block"/>
                        <input type="button" class="require-money-button" id="receive-10-money-amount-button" title="Money received"  value="10" style="display:block"/>
                        <input type="button" class="require-money-button" id="receive-100-money-amount-button" title="Money received"  value="100" style="display:block"/>
                    </div>
                    <p class="trade-money-amount" id="receive-money-amount-text" title="0">0$</p>
                </div>
                <input type="button" id="propose-button" title="Propose deal" value="Propose offer" style="display:block"/>
                <input type="button" id="accept-offer-button" title="Accept deal" value="Accept" style="display:none"/>
                <input type="button" id="refuse-offer-button" title="Refuse deal" value="Deny" style="display:none"/>
    
    <!--            <input type="number" id="receive-money-amount-button" title="Money received" placeholder="$" value="Amount current player wants" style="display:block"/>-->
          </div>
          <table id="trade-table">
              <tr id="trade-row">
              </tr>
          </table>
      </div>
    `;
        this.createRowsContent();
    }

    createRowsContent() {
        let count = 0;
        for (let k = 0; k <= 39; k++) {
            let cell = document.getElementById("cell-" + k);
            cell.textContent = fields[k].name;
            // let cellDiv = cell.appendChild(document.createElement("div"));
            // cellDiv.setAttribute("id", "cell-div-" + k);
            // // fieldName.textContent=""+fields[k].name+k;
            // cellDiv.textContent = "" + k;
            // cellDiv.className = "cell-div";


            var owner = cell.appendChild(document.createElement("div"));
            owner.id = "owner-" + k;
            owner.className = "cell-owner"
            owner.title = fields[k].owner;

            var cellName = cell.appendChild(document.createElement("div"));
            cellName.id = "cell-name-" + k;
            cellName.className = "cell-name";
            cellName.style.backgroundColor = fields[k].color;
            cellName.title = fields[count].name;

            var playerOnField = cell.appendChild(document.createElement("div"));
            playerOnField.id = "player-on-field-" + k;
            playerOnField.className = "player-on-field";
            playerOnField.title = " ";

            count++;
        }
        let table = document.getElementById("board");
    }

    roll() {
        var dice1 = new Dice().rollDice();
        var dice2 = new Dice().rollDice();
        var player = this.players[this.currentPlayer];

        console.log("Current player number!!!!!!!!!!!!!!! " + this.currentPlayer);

        console.log("Current player number!!!!!!!!!!!!!!! " + this.players[this.currentPlayer].name);
        let positionBeforeMoving = this.players[this.currentPlayer].lastKnownPosition;
        var lastKnownPlayerPosition = this.players[this.currentPlayer].lastKnownPosition;
        console.log("last knownPosition!!!!!!!!!!!!!!! " + lastKnownPlayerPosition);


        var pl = this.players.length - 1;
        console.log("Players length " + pl);


        const idPlayerOnField = "player-on-field-";
        const playerOnPrevField = this.rootElement.querySelector(`#${idPlayerOnField + this.currentField}`);
        playerOnPrevField.title = "";


        this.currentField = this.players[this.currentPlayer].lastKnownPosition;
        var prevField = this.currentField;
        console.log("BeforeSumField=" + this.currentField);
        let sum = dice1 + dice2;
        console.log("suma=" + sum);

        if ((lastKnownPlayerPosition + sum) > 39) {
            var eq = 39 - lastKnownPlayerPosition
            lastKnownPlayerPosition = (sum - eq) - 1;
            this.players[this.currentPlayer].addMoney(200);
            console.log("Player" + this.players[this.currentPlayer].name + " crossed start!!! His balance is now " + this.players[this.currentPlayer].totalMoneyAmount);
            // lastKnownPlayerPosition=(sum+lastKnownPlayerPosition)-lastKnownPlayerPosition;
            // lastKnownPlayerPosition=(sum+lastKnownPlayerPosition)%lastKnownPlayerPosition;
        } else {
            lastKnownPlayerPosition = lastKnownPlayerPosition + sum;
        }
        console.log(fields[lastKnownPlayerPosition]);

        // console.log("POSITION BEFORE MOVING  "+ fields[lastKnownPlayerPosition].owner);
        console.log("POSITION BEFORE MOVING!!!!!!!!!!!!!!! " + lastKnownPlayerPosition);
        if (this.inJail(player) != -1) {
            this.currentField = prevField;
        } else {
            if (fields[lastKnownPlayerPosition].owner == "jail") {
                addMessage(player.name + " is visiting a jail");
            }
            this.currentField = lastKnownPlayerPosition;
        }
        // lastKnownPlayerPosition=lastKnownPlayerPosition+sum;

        var currentFieldObj = fields[this.currentField];
        // console.log(currentFieldObj);

        console.log("last knownPosition!!!!!!!!!!!!!!! " + lastKnownPlayerPosition);

        addMessage("Player " + this.players[this.currentPlayer].name + " moved to field " + this.currentField);
        console.log("AfterSumField=" + this.currentField);
        this.players[this.currentPlayer].lastKnownPosition = this.currentField;


        const fieldOwner = this.rootElement.querySelector(`#${idFieldOwner + this.currentField}`);

        const rollButton = this.rootElement.querySelector(`#${idRollButton}`);
        const buyButton = this.rootElement.querySelector(`#${idBuyButton}`);
        const passButton = this.rootElement.querySelector(`#${idPassButton}`);
        const endButton = this.rootElement.querySelector(`#${idEndTurn}`);

        endButton.style.display = "block";
        if (fieldOwner.title == "null") {
            buyButton.style.display = "block"
            passButton.style.display = "block";
            endButton.style.display = "none";

        } else if (fieldOwner.title == "bank") {
            console.log(this.players[this.currentPlayer]);
            getRandomCard();
            console.log("KARTAAAAAAAAAAAAAAAAAAAAAAA \n KARTA !!!!!!!!!!!!!!!!!!!!");
            console.log("Money before taking !!!!!!!!!!!" + this.players[this.currentPlayer].totalMoneyAmount);
            // cards[0].method();
            // console.log(cards.length);
            console.log("AFTER taking !!!!!!!!!!!" + this.players[this.currentPlayer].totalMoneyAmount);
            endButton.style.display = "block";
        } else if (fieldOwner.title == "government") {
            player.subtractMoney(100);
            addMessage(player.name + " was just charged 100$ for a tuition");
        } else if (fieldOwner.title == "sendToJail") {
            this.sendToPrison(player);
            console.log("last player position " + player.lastKnownPosition);
        } else if (fieldOwner.title != player.number && fieldOwner.title != "null" && fieldOwner.title != "bank" && fieldOwner.title != "sendToJail"
            && fieldOwner.title != "jail" && fieldOwner.title != "GO") {
            this.payOtherPlayer(player, currentFieldObj);
        }

        const playerOnCurrentField = this.rootElement.querySelector(`#${idPlayerOnField + this.currentField}`);
        playerOnCurrentField.title = "" + this.currentPlayer;

        const buyHouseButton = this.rootElement.querySelector(`#${idBuyHouse}`);
        buyHouseButton.style.display = "block";

        const sellButton = this.rootElement.querySelector(`#${idSellButton}`);
        sellButton.style.display = "block";


        this.updatePlayerInfo(this.currentPlayer);
        this.movePlayerDivBox(positionBeforeMoving);
        this.updatePlayersStatusBoxes();
        rollButton.style.display = "none";

        console.log("\n");
        return sum;
    }

    sendToPrison(currentPlayerObj) {
        currentPlayerObj.lastKnownPosition = 10;
        this.currentField = 10;
        console.log("last player position " + currentPlayerObj.lastKnownPosition);
        currentPlayerObj.nrOfRoundsInPrison = 0;
    }

    inJail(currentPlayerObj) {
        if (currentPlayerObj.nrOfRoundsInPrison > -1 && currentPlayerObj.nrOfRoundsInPrison < 2) {
            currentPlayerObj.nrOfRoundsInPrison++;
            addMessage("This is " + currentPlayerObj.name + " " + currentPlayerObj.nrOfRoundsInPrison + " round in jail");
        } else if (currentPlayerObj.nrOfRoundsInPrison == 2) {
            currentPlayerObj.nrOfRoundsInPrison = -1;
        }
        return currentPlayerObj.nrOfRoundsInPrison;
    }

    payOtherPlayer(currentPlayerObj, currentFieldObj) {
        console.log("Payment");

        var amount = currentFieldObj.getCurrentRevenue();

        if (currentFieldObj.breakRoom == true) {
            var ownedBreakRooms = 0;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].breakRoom == true && fields[i].owner == currentFieldObj.owner) {
                    ownedBreakRooms++;
                }
            }
            amount = amount * ownedBreakRooms;
            console.log("Amount after counting all the break rooms receiver owns " + amount);
        }
        if (currentPlayerObj.subtractMoney(amount)) {

            currentFieldObj.owner.addMoney(amount);
            console.log("amount after adding " + currentFieldObj.owner.addMoney(amount));
            addMessage("Player " + currentPlayerObj.name + " has paid " + amount + "$ to " + currentFieldObj.owner.name + "\n")
        } else {
            addMessage("Player does not have enough money to pay\n");
        }
    }

    buyProperty() {
        //We have to hide roll button
        // console.log("c");
        let fieldOwner = document.getElementById("owner-" + this.currentField);
        let fieldPosition = document.getElementById("cell-" + this.currentField);
        let playerFieldsTable = document.getElementById("buy-table");

        if (fieldOwner.title == "null") {
            var player = this.players[this.currentPlayer];
            var fieldCost = fields[this.currentField].cost;
            if (player.subtractMoney(fieldCost) == true) {
                fieldOwner.title = player.number;
                console.log(player.name + " has bought " + fieldPosition.textContent);

                fields[this.currentField].owner = player;


                // fieldPosition.style.backgroundColor = player.color;
                fieldPosition.style.border = "3px solid " + player.color;
                // console.log(fields[currentField].owner);

                //Creating bought properties table row
                // let tableRow = playerFieldsTable.appendChild(document.createElement("tr"));
                // let tableData = tableRow.appendChild(document.createElement("td"));
                // let tableDiv = tableData.appendChild(document.createElement("div"));
                // let tableSellButton = tableData.appendChild(document.createElement("input"));
                // tableDiv.innerHTML = fields[this.currentField].name;
                // tableDiv.id = "field-" + fields[this.currentField].name;
                // tableDiv.title = this.currentField + "";
                // tableSellButton.type = "button";
                // tableSellButton.value = "sell";
                // tableSellButton.className = "sell-button";
                // tableSellButton.id = "sell-button" + player.number;


                addMessage("New owner of the field " + fields[this.currentField].name + " is " + fields[this.currentField].owner.name);
                // console.log("New owner of the field is " + fields[currentField].owner.name);
            }
        } else {
            addMessage("Field is already owned");
            // console.log("Field is already owned");
        }
        const buyButton = this.rootElement.querySelector(`#${idBuyButton}`);
        const passButton = this.rootElement.querySelector(`#${idPassButton}`);
        const rollButton = this.rootElement.querySelector(`#${idRollButton}`);
        const endButton = this.rootElement.querySelector(`#${idEndTurn}`);


        buyButton.style.display = "none";
        passButton.style.display = "none";
        rollButton.style.display = "none";
        endButton.style.display = "block";
        this.updatePlayerInfo(this.currentPlayer);
        this.updatePlayersStatusBoxes();
        console.log("\n");
    }


    sellProperty(fieldObj, fieldNumber, currentPlayerObj, fieldOwnerDiv) {
        // let fieldOwner = document.getElementById("owner-" + this.currentField);
        // console.log(fieldObj.owner);
        // console.log(fieldNumber);
        let fieldPosition = document.getElementById("cell-" + fieldNumber);
        console.log("check sell object ");
        console.log(fieldObj);

        if (fieldObj.owner == currentPlayerObj) {
            console.log(fieldObj.name);

            console.log("players money before selling " + currentPlayerObj.totalMoneyAmount);
            if (currentPlayerObj.addMoney(fieldObj.getSellValue()) > 0) {
                console.log("After selling " + currentPlayerObj.totalMoneyAmount);
                fieldOwnerDiv.title = "null";
                fieldObj.owner = null;

                this.updatePlayerInfo(currentPlayerObj.number);
                this.updatePlayersStatusBoxes();
                fieldPosition.style.border = "1px solid black";
                addMessage("Player " + currentPlayerObj.name + " sold " + fieldObj.name + " and received " + fieldObj.getSellValue());
            }


        } else {
            addMessage("You don't own that field, so you cannot sell it");
        }
    }

    buyHouse(fieldObj, fieldNumber, currentPlayerObj) {
        if (fieldObj.owner == currentPlayerObj) {
            // if(fieldObj.buildHouse!=-1){
            //     if (currentPlayerObj.subtractMoney(fieldObj.houseCost) !=false) {
            //         console.log(fieldObj.nrOfHousesBuild);
            //         addMessage("House has been successfully bought. Field " + fieldObj.name + " now has " + fieldObj.nrOfHousesBuild + " houses\n");
            //     }
            // }else {
            //     addMessage("There are no more houses to build \n");
            // }
            //
            console.log("is set complete " + fields[fieldNumber].setComplete);
            if (fieldObj.setComplete == true) {
                currentPlayerObj.buyHouse(fieldObj);
                this.updatePlayerInfo(currentPlayerObj.number);
            } else {
                addMessage("You dont have all the fields of that color. Gain all the fields of that color type first.");
            }
        } else {
            addMessage("You dont own that field");
        }
    }

    sellHouse(fieldObj, fieldNumber, currentPlayerObj) {


        if (fieldObj.owner == currentPlayerObj) {

            if (fieldObj.sellHouse == true) {
                if (currentPlayerObj.addMoney(fieldObj.houseCost) > 0) {
                    addMessage("House has been successfully sold. Field " + fieldObj.name + " now has " + fieldObj.nrOfHousesBuild + " houses\n");
                }
            } else {
                addMessage("There are no houses on field to sell \n");
            }
        } else {
            addMessage("You dont own that field");
        }
    }

    checkIfSetComplete(fieldObj) {
        //We check if player just completed set
        //--------------------------------------------
        var numberOfFieldsInThisColor = 0;
        var howManyPlayerOwns = 0;
        var setComplete = false;
        // console.log("current field "+this.currentField);
        // console.log("current field color "+fields[this.currentField].color);
        // console.log("current field owner "+fields[this.currentField].owner);

        //We loop through all fields
        for (let h = 0; h < fields.length; h++) {
            //We check if color of selected field is the same as the one from loop
            if (fieldObj.color == fields[h].color) {
                //We check if the owner of the field is also the current player
                if (fieldObj.owner == fields[h].owner && fields[h].owner != null) {
                    howManyPlayerOwns++;
                    // console.log("owner");
                }
                numberOfFieldsInThisColor++;
                // console.log("how many in this color "+numberOfFieldsInThisColor);
                // console.log("how many owns "+howManyPlayerOwns);
                // console.log(fields[this.currentField].owner.name);
            }
        }
        //If current player owns all the fields of the concrete color
        //Every field of that color, will be marked as a complete set
        if (numberOfFieldsInThisColor == howManyPlayerOwns) {
            console.log("set complete");
            setComplete = true;
        }

        for (let g = 0; g < fields.length; g++) {
            if (fields[g].color == fieldObj.color) {
                if (setComplete == true) {
                    // console.log("cos");
                    fields[g].setComplete = true;
                    console.log("Set complete");
                }
            }
        }
        //-----------------------------------------------
    }

    pass() {
        const buyButton = this.rootElement.querySelector(`#${idBuyButton}`);
        const passButton = this.rootElement.querySelector(`#${idPassButton}`);
        const rollButton = this.rootElement.querySelector(`#${idRollButton}`);
        const endButton = this.rootElement.querySelector(`#${idEndTurn}`);

        buyButton.style.display = "none";
        passButton.style.display = "none";
        rollButton.style.display = "none";
        endButton.style.display = "block";

        this.updatePlayerInfo(this.currentPlayer);
        console.log("\n");
    }

    removePlayer() {
        // this.client.moves.eliminate(this.currentPlayer);
        this.players.splice(this.currentPlayer, 1);
        console.log("length of array after deleting " + this.players.length);
    }

    trade(offeringPlayer, receivingPLayer, amountOfMoneyOffered, amountOfMoneyWanted, offeredFields, wantedFields) {
        var transactionError = false;
        addMessage("offer AMOUNT " + amountOfMoneyOffered);
        console.log("offer AMOUNT " + amountOfMoneyOffered);
        if (amountOfMoneyOffered == 0 && amountOfMoneyWanted == 0) {
            addMessage("BABY BLUE");
        } else if (amountOfMoneyOffered > amountOfMoneyWanted) {
            addMessage("Money ofered");

            if (offeringPlayer.subtractMoney(amountOfMoneyOffered) != false) {
                receivingPLayer.addMoney(amountOfMoneyWanted);
            } else {
                transactionError = true;
            }
        } else if (amountOfMoneyOffered < amountOfMoneyWanted) {
            if (receivingPLayer.subtractMoney(amountOfMoneyWanted) != false) {
                offeringPlayer.addMoney(amountOfMoneyOffered);
            } else {
                transactionError = true;
            }
        }
        if (transactionError != true) {
            if (offeredFields.length != 0) {
                for (var i = 0; i < offeredFields.length; i++) {
                    offeredFields[i].owner = receivingPLayer;
                    let fieldPosition = document.getElementById("cell-" + offeredFields[i].number);
                    let fieldOwner = document.getElementById("owner-" + offeredFields[i].number);
                    fieldPosition.style.border = "3px solid " + receivingPLayer.color;
                    fieldOwner.title = receivingPLayer.number;
                    console.log(fieldPosition);
                }
            }
            if (wantedFields.length != 0) {
                for (var j = 0; j < wantedFields.length; j++) {
                    wantedFields[j].owner = offeringPlayer;
                    let fieldPosition = document.getElementById("cell-" + wantedFields[j].number);
                    let fieldOwner = document.getElementById("owner-" + wantedFields[j].number);
                    fieldPosition.style.border = "3px solid " + offeringPlayer.color;
                    fieldOwner.title = offeringPlayer.number;
                }
            }
            console.log("Transaction is complete");
            addMessage("Transaction is complete");
            this.updatePlayerInfo(this.currentPlayer);
        } else {
            console.log("Transaction not complete");
            addMessage("Transaction not complete");
        }
        this.updatePlayersStatusBoxes();

    }

    updatePlayerInfo(paramCurrentPlayer) {
        // let playerNameText = document.getElementById("player-name");
        // let playerMoneyAmountText = document.getElementById("player-total-money-amount");
        // let currentPlayerContainer = document.getElementById("current-player");
        const idPlayerName = "player-name";
        const playerName = this.rootElement.querySelector(`#${idPlayerName}`);
        playerName.innerHTML = this.players[paramCurrentPlayer].name;

        const idPlayerTotalMoneyAmount = "player-total-money-amount";
        const playerMoneyAmount = this.rootElement.querySelector(`#${idPlayerTotalMoneyAmount}`);
        playerMoneyAmount.innerHTML = this.players[paramCurrentPlayer].totalMoneyAmount + "$";

        const idCurrentPlayer = "current-player";
        const currentPlayer = this.rootElement.querySelector(`#${idCurrentPlayer}`);
        currentPlayer.style.border = "1px solid " + this.players[paramCurrentPlayer].color;
        // currentPlayerContainer.style.border = "1px solid " + this.players[paramCurrentPlayer].color;
    }

    movePlayerDivBox(positionBeforeMoving) {
        console.log(this.players[this.currentPlayer].lastKnownPosition);
        const idPlayerOnCurrentField = "player-on-field-";
        const playerOnCurrentField = this.rootElement.querySelector(`#${idPlayerOnCurrentField + this.currentField}`);
        playerOnCurrentField.title = "" + this.currentPlayer;


        let lastPlayerPosition = this.rootElement.querySelector(`#${idPlayerOnCurrentField + positionBeforeMoving}`);
        lastPlayerPosition.style.backgroundColor = "white";
        // console.log("Current player " + currentPlayer + " position is " + currentPlayerPosition);
        playerOnCurrentField.style.backgroundColor = this.players[this.currentPlayer].color;
    }




    attachListeners() {
        // This event handler will read the cell id from a cell’s
        // `data-id` attribute and make the `clickCell` move.
        const endTurnButton = this.rootElement.querySelector(`#${idEndTurn}`);
        const rollButton = this.rootElement.querySelector(`#${idRollButton}`);
        const buyButton = this.rootElement.querySelector(`#${idBuyButton}`);
        const sellButton = this.rootElement.querySelector(`#${idSellButton}`);
        const passButton = this.rootElement.querySelector(`#${idPassButton}`);
        const buyHouseButton = this.rootElement.querySelector(`#${idBuyHouse}`);
        const sellHouseButton = this.rootElement.querySelector(`#${idSellHouse}`);
        const proposeButton = this.rootElement.querySelector(`#${idProposeButton}`);
        const tradeButton = this.rootElement.querySelector(`#${idTradeButton}`);

        const acceptTradeButtonClick = document.getElementById("accept-offer-button");
        const refuseTradeButtonClick = document.getElementById("refuse-offer-button");

        // Increase money amount, current player offers in trade
        const offerAmountIncrease = this.rootElement.querySelectorAll('.offer-money-button');
        var amountOffered = parseInt("" + document.getElementById("offered-money-amount-text").title);
        // console.log(amountOffered);

        // Increase money amount, current player WANTS!!! from the other player in trade

        const requireAmountIncrease = this.rootElement.querySelectorAll('.require-money-button');
        var amountRequired = parseInt("" + document.getElementById("receive-money-amount-text").title);
        // console.log(amountOffered);

        var row = document.getElementById("trade-row");

        let currentPlayerObj = this.players[this.currentPlayer];

        var offeredFields = [];
        var amountOfferedValue = amountOffered;
        var wantedFields = [];
        var amountWantedValue = amountRequired;


        let houseButtonClicked = false;
        let sellButtonClicked = false;
        var sellHouseButtonClicked = false;
        //If propose button is clicked, send offer to other player
        let proposeButtonClicked = false;
        //If trade button is clicked, allow trading
        let tradeButtonClicked = false;
        var tradeWithPlayer = -1;

        const removeFieldsFromTradeTable = function () {
            proposeButton.style.display = "block";
            acceptTradeButtonClick.style.display = "none";
            refuseTradeButtonClick.style.display = "none";
            if (offeredFields.length != 0) {
                for (var k = 0; k < offeredFields.length; k++) {
                    document.getElementById("trade-cell-" + offeredFields[k].number).remove();
                    console.log(offeredFields[k]);
                    offeredFields[k].partOfTrade = false;
                    console.log("Length after deleting offered field from array " + offeredFields.length);

                }
                offeredFields = [];
            }
            if (wantedFields.length != 0) {
                for (var h = 0; h < wantedFields.length; h++) {
                    document.getElementById("trade-cell-" + wantedFields[h].number).remove();
                    console.log(wantedFields[h]);
                    wantedFields[h].partOfTrade = false;
                    console.log("Length after deleting wanted field from array " + wantedFields.length);
                }
                wantedFields = [];
            }
        }

        //Clicking the cell
        const handleCellClick = event => {
            console.log("Amount wanted ======" + amountWantedValue);
            var fieldNumber = event.target.dataset.id;
            const fieldOwnerDiv = this.rootElement.querySelector(`#${idFieldOwner + fieldNumber}`);
            var fieldObj = fields[fieldNumber];
            console.log(fieldObj);
            // console.log(fieldNumber);

            const updateTradeTable = function () {
                var rowData = row.appendChild(document.createElement("td"));
                rowData.innerHTML = fieldObj.name;
                rowData.className = "cell";
                rowData.id = "trade-cell-" + fieldNumber;

                var owner = rowData.appendChild(document.createElement("div"));
                owner.id = "trade-owner-" + fieldNumber;
                owner.className = "cell-owner"
                owner.title = fieldObj.owner;

                var cellName = rowData.appendChild(document.createElement("div"));
                cellName.id = "trade-cell-name-" + fieldNumber;
                cellName.className = "cell-name";
                cellName.style.backgroundColor = fieldObj.color;
                cellName.title = fieldObj.name;

                fieldObj.partOfTrade = true;
            }
            console.log(this.currentPlayer);

            console.log("CURRRRRRRRRRRRRRENT PLAYER");
            console.log(currentPlayerObj);

            if (houseButtonClicked == true) {
                // console.log("current field Number " + fieldOwner.title);
                // console.log("current player " + this.currentPlayer)
                // console.log("current player " + currentPlayerObj.number)
                this.checkIfSetComplete(fieldObj);
                this.buyHouse(fieldObj, fieldNumber, currentPlayerObj);
            } else if (sellButtonClicked == true) {
                this.sellProperty(fieldObj, fieldNumber, currentPlayerObj, fieldOwnerDiv);
            } else if(sellHouseButtonClicked == true){
                this.sellHouse(fieldObj,fieldNumber,currentPlayerObj);
            }
            else if (tradeButtonClicked == true) {
                console.log("Is trade button clicked " + tradeButtonClicked);
                console.log("Trade with player " + fieldObj.owner);
                if (fieldObj.partOfTrade != true && fieldObj.owner != null) {
                    console.log("field obj owner " + fieldObj.owner.number);
                    console.log("player to trade with " + tradeWithPlayer);
                    if (fieldObj.owner == currentPlayerObj) {
                        offeredFields.push(fieldObj);

                        updateTradeTable();

                    } else if (fieldObj.owner.number == tradeWithPlayer) {
                        wantedFields.push(fieldObj);

                        updateTradeTable();


                    }
                }
                // this.trade();
            }
            houseButtonClicked = false;
            sellButtonClicked = false;
            // proposeButtonClicked=false;

            const id = parseInt(event.target.dataset.id);
            // console.log(event.target.dataset.id);
            return event.target.dataset.id;
            // this.client.moves.clickCell(id);
        };

        //End Turn
        const handleEndTurnClick = event => {
            const endButton = this.rootElement.querySelector(`#${idEndTurn}`);

            // console.log("number of players " + this.players.length);
            console.log("Current totalMoney amount of current player " + this.players[this.currentPlayer].totalMoneyAmount);

            if (this.players[this.currentPlayer].totalMoneyAmount < 0) {
                this.removePlayer();
            }

            this.currentPlayer++;
            if (this.currentPlayer == this.players.length) {
                console.log("current player reset");
                this.currentPlayer = 0;
            }
            rollButton.style.display = "block";

            buyHouseButton.style.display = "none";
            houseButtonClicked = false;

            sellButton.style.display = "none";

            console.log("current player number " + this.currentPlayer);
            console.log("\n");
            endButton.style.display = "none";

            currentPlayerObj = this.players[this.currentPlayer];

            // //You can buy houses only at the beginning of the round
            // this.checkIfSetComplete();

            //Clean trade table
            removeFieldsFromTradeTable();

            //Update players status boxes
            this.updatePlayersStatusBoxes();

            this.client.moves.endTurn();
        };
        endTurnButton.onclick = handleEndTurnClick;

        //Roll Dice
        const handleRollButtonClick = event => {
            this.roll();
        };
        rollButton.onclick = handleRollButtonClick;


        //Buy property
        const handleBuyButtonClick = event => {
            this.buyProperty();
        };
        buyButton.onclick = handleBuyButtonClick;

        //Pass on buying property
        const handlePassButtonClick = event => {
            this.pass();
        };
        passButton.onclick = handlePassButtonClick;

        //Sell property
        const handleSellButtonClick = event => {
            sellButtonClicked = true;
        };
        sellButton.onclick = handleSellButtonClick;

        //Buy House on property
        const handleBuyHouseButtonClick = event => {
            houseButtonClicked = true;
        };
        buyHouseButton.onclick = handleBuyHouseButtonClick;

        //Sell house on property
        const handleSellHouseButtonClick = event => {
           sellHouseButtonClicked = true;
        };
        sellHouseButton.onclick = handleBuyHouseButtonClick;


        //Trade with another player
        const handleTradeButtonClick = event => {
            tradeButtonClicked = true;
        };
        tradeButton.onclick = handleTradeButtonClick;

        //Propose offer
        const handleProposeButtonClick = event => {
            proposeButtonClicked = true;
            proposeButton.style.display = "none";
            acceptTradeButtonClick.style.display = "block";
            refuseTradeButtonClick.style.display = "block";
        };
        proposeButton.onclick = handleProposeButtonClick;

        //Accept offer
        const handleAcceptTradeButtonClick = event => {
            var secondTradePlayer = this.players[tradeWithPlayer];
            console.log(secondTradePlayer);
            this.trade(currentPlayerObj, secondTradePlayer, amountOfferedValue, amountWantedValue, offeredFields, wantedFields);
            removeFieldsFromTradeTable();
        };
        acceptTradeButtonClick.onclick = handleAcceptTradeButtonClick;

        //Refuse offer
        const handleRefuseTradeButtonClick = event => {
            removeFieldsFromTradeTable();
        };
        refuseTradeButtonClick.onclick = handleRefuseTradeButtonClick;


        // Attach the event listener to each of the board cells.
        const cells = this.rootElement.querySelectorAll('.cell');

        cells.forEach(cell => {
            cell.onclick = handleCellClick;
        });

        offerAmountIncrease.forEach(buttonAmount => {
            buttonAmount.addEventListener("click", function () {
                var buttonVal = parseInt("" + buttonAmount.value)
                if (buttonVal == 0) {
                    amountOfferedValue = 0;
                } else {
                    amountOfferedValue = amountOfferedValue + buttonVal;
                }
                document.getElementById("offered-money-amount-text").title = "" + amountOfferedValue;
                document.getElementById("offered-money-amount-text").innerHTML = amountOfferedValue + "$";
            });
        });


        requireAmountIncrease.forEach(buttonAmount => {
            buttonAmount.addEventListener("click", function () {
                var buttonVal = parseInt("" + buttonAmount.value);
                console.log(buttonVal);
                if (buttonVal == 0) {
                    amountWantedValue = 0;
                } else {
                    amountWantedValue = amountWantedValue + buttonVal;
                }
                document.getElementById("receive-money-amount-text").title = "" + amountWantedValue;
                document.getElementById("receive-money-amount-text").innerHTML = amountWantedValue + "$";
            });
        });



        const playerToTradeWith = this.rootElement.querySelectorAll('.button-trade-players');
        var playerTradeText = document.getElementById("trade-players-text");

        playerToTradeWith.forEach(playerButton => {
            playerButton.addEventListener("click", function () {
                var playerButtonVal = parseInt("" + playerButton.value);
                console.log(playerButtonVal);
                tradeWithPlayer = playerButtonVal;
                playerTradeText.title = "" + playerButtonVal;
                playerTradeText.innerHTML = "Propose offer to player :" + playerButtonVal;
            });
        });

    }

    update(state) {
        // Get all the board cells.
        const cells = this.rootElement.querySelectorAll('.cell');
        // Update cells to display the values in game state.
        cells.forEach(cell => {
            const cellId = parseInt(cell.dataset.id);
            const cellValue = state.G.cells[cellId];
            cell.textContent = cellValue !== null ? cellValue : '';
        });
        // Get the gameover message element.
        const messageEl = this.rootElement.querySelector('.winner');
        // Update the element to show a winner if any.
        if (state.ctx.gameover) {
            messageEl.textContent =
                state.ctx.gameover.winner !== undefined
                    ? 'Winner: ' + state.ctx.gameover.winner
                    : 'Draw!';
        } else {
            messageEl.textContent = '';
        }
    }

}


const appElement = document.getElementById('monopoly');
const monopoly = new Monopoly(appElement, 3);

function Card(name, method) {

    this.name = name;
    this.method = method;
    this.used = false;
}

function collectTuition() {
    var player = monopoly.getCurrentPlayer();
    player.subtractMoney(100);

    addMessage(player.name + " got charged tuition. 100$ was collected from his account");

}

function givePlayerMoney(amount) {
    var player = monopoly.getCurrentPlayer();
    console.log("COS?????????????????????");
    console.log(player);
    // console.log(player);
    player.addMoney(amount);
    addMessage("Congrats, you just got university scholarship and you received the whole " + amount + "$!!!!");
}

function takeFromPlayerMoney(amount) {
    var player = monopoly.getCurrentPlayer();
    // console.log(player);
    player.subtractMoney(amount);
    addMessage("Yikes,you just payed " + amount + "$ for Edmundo, that literally won't help you in this game at all!!!!");
}


function getRandomCard() {
    const min = 0;
    const max = cards.length - 1;
    return cards[Math.floor(Math.random() * ((max - min + 1)) + min)].method();
}

var cards = [];
cards[0] = new Card("Give player 50$", function () {
    givePlayerMoney(50);
});
cards[1] = new Card("Give player 100$", function () {
    givePlayerMoney(100);
});
cards[2] = new Card("Take 50$ from player", function () {
    takeFromPlayerMoney(50);
});
cards[3] = new Card("Take 100$ from player", function () {
    takeFromPlayerMoney(100);
});
cards[4] = new Card("Collect Tuition", function () {
    collectTuition(100);
});


module.exports = {
    Monopoly: Monopoly,
    app: monopoly,
};