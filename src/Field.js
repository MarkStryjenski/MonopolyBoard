function Field(name, color, cost, basicRevenue, houseCost, singleHouseRevenue, twoHouseRevenue, threeHouseRevenue, fourHouseRevenue, hotelRevenue) {
    this.name = name;
    this.cost = cost;
    this.basicRevenue = basicRevenue;
    this.houseCost = houseCost;
    this.singleHouseRevenue = singleHouseRevenue;
    this.twoHouseRevenue = twoHouseRevenue;
    this.threeHouseRevenue = threeHouseRevenue;
    this.fourHouseRevenue = fourHouseRevenue;
    this.hotelRevenue = hotelRevenue;
    this.color = color;

    this.coffeeMachine = false;
    this.breakRoom=false;
    this.jail = false;
    this.police=false;
    this.go = false;
    this.tax = false;
    this.owner = null;

    this.oneHouseBuild = false;
    this.twoHousesBuild = false;
    this.threeHousesBuild = false;
    this.fourHousesBuild = false;
    this.hotelBuild = false;
    this.setComplete = false;
    this.currentRevenue = 0;
    this.nrOfHousesBuild = 0;
    this.sellValue = 0;
    this.partOfTrade=false;
    this.number=0;
    // this.breaksRoomOwned=0;

    this.getCurrentRevenue = function () {
        if (this.oneHouseBuild === true) {
            this.currentRevenue = singleHouseRevenue;
        } else if (this.twoHousesBuild === true) {
            this.currentRevenue = twoHouseRevenue;
        } else if (this.threeHousesBuild === true) {
            this.currentRevenue = threeHouseRevenue;
        } else if (this.fourHousesBuild === true) {
            this.currentRevenue = fourHouseRevenue;
        } else if (this.hotelBuild === true) {
            this.currentRevenue = hotelRevenue;
        } else {
            this.currentRevenue = basicRevenue;
        }
        return this.currentRevenue;
    }

    this.buildHouse = function () {
        switch (this.nrOfHousesBuild) {
            case 0:
                this.oneHouseBuild = true;
                break;
            case 1:
                this.oneHouseBuild = false;
                this.twoHousesBuild = true;
                break;
            case 2:
                this.twoHousesBuild = false;
                this.threeHousesBuild = true;
                break;
            case 3:
                this.threeHousesBuild = false;
                this.fourHousesBuild = true;
                break;
            case 4:
                this.fourHousesBuild = false;
                this.hotelBuild = true;
                break;
            default:
                console.log("Max nr of houses to build reached");
                return -1;
        }

        this.nrOfHousesBuild++;
        return this.nrOfHousesBuild;
    }

    this.sellHouse = function () {
        if (this.nrOfHousesBuild == 0) {
            return false;
        } else if (this.nrOfHousesBuild == 1) {
            this.oneHouseBuild = false;
        } else if (this.nrOfHousesBuild == 2) {
            this.twoHousesBuild = false;
            this.oneHouseBuild = true;
        } else if (this.nrOfHousesBuild == 3) {
            this.threeHousesBuild = false;
            this.twoHousesBuild = true;
        } else if (this.nrOfHousesBuild == 4) {
            this.fourHousesBuild = false;
            this.threeHousesBuild = true;
        } else if (this.nrOfHousesBuild == 5) {
            this.hotelBuild = false;
            this.fourHousesBuild = true;
        }
        return true;
        // addMessage(game.getCurrentPlayer().name+" sold a single house and now field "+game.getCurrentFieldObj().name);
    }

    this.getSellValue = function () {
        this.sellValue = this.cost / 2;
        return this.sellValue;
    }

    this.getHouseCost = function () {
        return this.houseCost;
    }


}


var fields = [];
fields[0] = new Field("GO", null);
fields[0].go = true;
fields[1] = new Field("Intercultural Communication", "brown", 60, 2, 50, 10, 30, 90, 160, 250);
fields[2] = new Field("Coffee Machine", "white");
fields[2].coffeeMachine = true;
fields[2].owner = "bank";
fields[3] = new Field("Introduction to PHP", "brown", 60, 4, 50, 20, 60, 180, 320, 450);
fields[4] = new Field("Tuition Fee", "white");
fields[4].owner = "government";
fields[4].tax = true;
fields[5] = new Field("Study Career coaching 1", "black", 200, 50);
fields[5].breakRoom=true;
fields[6] = new Field("HTML/CSS", "lightblue", 100, 6, 50, 10, 30, 90, 160, 250);
fields[7] = new Field("Coffee Machine", "white");
fields[7].coffeeMachine = true;
fields[7].owner = "bank";
fields[8] = new Field("Project Professional Website", "lightblue", 100, 6, 50, 10, 30, 90, 160, 250);
fields[9] = new Field("Written Communication 1", "lightblue", 120, 8, 50, 10, 30, 90, 160, 250);
fields[10] = new Field("Jail", "white");
fields[10].jail=true;
fields[10].owner = "jail";
fields[11] = new Field("Information management", "pink", 140, 10, 50, 10, 30, 90, 160, 250);
fields[12] = new Field("Mediterian Avenue", "white", 60, 2, 50, 10, 30, 90, 160, 250);
fields[13] = new Field("FED Essentials", "pink", 140, 10, 50, 10, 30, 90, 160, 250);
fields[14] = new Field("Introduction to Databases", "pink", 160, 12, 50, 10, 30, 90, 160, 250);
fields[15] = new Field("Study Career coaching 2", "black", 200, 50);
fields[15].breakRoom=true;
fields[16] = new Field("PHP Advandced", "orange", 180, 14, 50, 10, 30, 90, 160, 250);
fields[17] = new Field("Coffee Machine", "white");
fields[17].coffeeMachine = true;
fields[17].owner = "bank";
fields[18] = new Field("Project Support Desk", "orange", 180, 14, 50, 10, 30, 90, 160, 250);
fields[19] = new Field("Oral Communication 1", "orange", 200, 16, 50, 10, 30, 90, 160, 250);
fields[20] = new Field("Parking", "white", 60, 2, 50, 10, 30, 90, 160, 250);
fields[21] = new Field("Introduction to Programming in Java", "red", 220, 18, 50, 10, 30, 90, 160, 250);
fields[22] = new Field("Coffee Machine", "white");
fields[22].coffeeMachine = true;
fields[22].owner = "bank";
fields[23] = new Field("Introduction to Computer Network", "red", 220, 18, 50, 10, 30, 90, 160, 250);
fields[24] = new Field("Basic Mathematics", "red", 240, 20, 50, 10, 30, 90, 160, 250);
fields[25] = new Field("Study Career coaching 3", "black", 200, 50);
fields[25].breakRoom=true;
fields[26] = new Field("Project Battle Bot", "yellow", 260, 22, 50, 10, 30, 90, 160, 250);
fields[27] = new Field("Programming in C#", "yellow", 260, 22, 50, 10, 30, 90, 160, 250);
fields[28] = new Field("Coffee Machine", "white");
fields[28].coffeeMachine = true;
fields[28].owner = "bank";
fields[29] = new Field("Project Innovate", "yellow", 280, 24, 50, 10, 30, 90, 160, 250);
fields[30] = new Field("Give student detention", "white");
fields[30].owner="sendToJail";
fields[31] = new Field("Data Structures and Algorithms", "green", 300, 26, 50, 10, 30, 90, 160, 250);
fields[32] = new Field("Operating Systems", "green", 300, 26, 50, 10, 30, 90, 160, 250);
fields[33] = new Field("Coffee Machine");
fields[33].coffeeMachine = true;
fields[33].owner = "bank";
fields[34] = new Field("Databases 2", "green", 320, 28, 50, 10, 30, 90, 160, 250);
fields[35] = new Field("Study Career coaching 4", "black", 200, 50);
fields[35].breakRoom=true;
fields[36] = new Field("Coffee Machine", "white",);
fields[36].coffeeMachine = true;
fields[36].owner = "bank";
fields[37] = new Field("JavaScript", "darkblue", 350, 35, 50, 10, 30, 90, 160, 250);
fields[38] = new Field("Tuition Fee", "white");
fields[38].owner = "government";
fields[38].tax = true;
fields[39] = new Field("Java Finals", "darkblue", 400, 50, 50, 10, 30, 90, 160, 250);

for(var i=0;i<fields.length;i++){
    fields[i].number=i;
}

module.exports = {
    Field: Field,
    fields: fields
};
// trade-players-text
// button-trade-players