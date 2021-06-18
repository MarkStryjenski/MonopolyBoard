// // import {app} from './Monopoly.js';
//
// import {addMessage} from "./Dice";
//
// function Card(name, method) {
//
//     this.name = name;
//     this.method = method;
//     this.used = false;
// }
//
// function collectTuition(){
//     var player = app.getCurrentPlayer();
//     player.subtractMoney(100);
//
//     addMessage(player.name + " got charged tuition. 100$ was collected from his account");
//
// }
//
// function givePlayerMoney(amount) {
//     var player = app.getCurrentPlayer();
//     // console.log(player);
//     player.addMoney(amount);
//     app.addMessage("Congrats, you just got university scholarship and you received the whole " + amount + "$!!!!");
// }
//
// function takeFromPlayerMoney(amount) {
//     var player = app.getCurrentPlayer();
//     // console.log(player);
//     player.subtractMoney(amount);
//     addMessage("Yikes,you just payed " + amount + "$ for Edmundo, that literally won't help you in this game at all!!!!");
// }
//
// // function movePlayerBackwards(nrOfSteps) {
// //     var player = app.getCurrentPlayer();
// //     var newPosition = player.lastKnownPosition - nrOfSteps;
// //     var previousPosition=player.lastKnownPosition;
// //     let lastPlayerPosition = document.getElementById("playerOnField" + player.lastKnownPosition);
// //     lastPlayerPosition.style.backgroundColor = "white";
// //     if (newPosition < 0) {
// //         newPosition = 39 + newPosition;
// //         player.lastKnownPosition = newPosition;
// //     } else {
// //         player.lastKnownPosition = player.lastKnownPosition - nrOfSteps;
// //     }
// //     app.setCurrentField(player.lastKnownPosition);
// //
// //     app.movePlayerDivBox( previousPosition);
// //     addMessage(player.name + " got punished for not completing final assignment and was moved " + nrOfSteps + " steps backwards");
// //     console.log(player.lastKnownPosition);
// //     console.log(app.getCurrentField());
// //
// // }
//
//
// function getRandomCard() {
//     const min = 0;
//     const max = cards.length - 1;
//     return cards[Math.floor(Math.random() * ((max - min + 1)) + min)].method();
// }
//
// // var c=new Card("mm",function (){givePlayerMoney();});
// var cards = [];
// cards[0] = new Card("Give player 50$", function () {
//     givePlayerMoney(50);
// });
// cards[1] = new Card("Give player 100$", function () {
//     givePlayerMoney(100);
// });
// cards[2] = new Card("Take 50$ from player", function () {
//     takeFromPlayerMoney(50);
// });
// cards[3] = new Card("Take 100$ from player", function () {
//     takeFromPlayerMoney(100);
// });
// cards[4] = new Card("Move player 4 steps backwards", function () {
//     movePlayerBackwards(4);
// });
//
// module.exports={
//     Card:Card,
//     cards:cards,
//     getRandomCard:getRandomCard,
// };