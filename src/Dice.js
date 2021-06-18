class Dice {
    numberOfMeshes=6;

    constructor() {
    }

    rollDice(){
        const min = 1;
        const max = this.numberOfMeshes;
        return Math.floor(Math.random() *((max-min+1))+ min);
    }
}
function addMessage(e) {

    const idTextArea = "text-area";
    const textArea = document.getElementById(idTextArea);
    textArea.scrollTop = textArea.scrollHeight;
    textArea.innerHTML += e + "\n";

}

// var dc=new Dice();
// console.log(dc.rollDice());
module.exports={
    Dice:Dice,
    addMessage:addMessage,

};
