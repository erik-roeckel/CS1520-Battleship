
// Player object
var player = {
    id: "",
    name: "",
    validShips: 0,
    aircraft: "",
    battleship: "",
    submarine: "",
    misses: "",
    totalHits: 0,
    aircraftHits: "",
    battleshipHits: "",
    submarineHits:"",
    aircraftSunk: false,
    battleshipSunk: false,
    submarineSunk: false,

    totalPoints: 0,
    getName(){
        while(this.name === "" || !isNaN(this.name)){
            if(this.id === 1){
                playerOne.name = prompt("Player one please enter your name:");
            }
            else{
                playerTwo.name = prompt("Player two please enter your name:");
            }
            if(this.name === ""|| !isNaN(this.name)){
                alert("You entered an invalid name, try again");
            }
            else{
                this.getShipPlacement();
            }  
        }
    },
    getShipPlacement(){
        var shipPlacements = "";
        while(shipPlacements === "" && this.validShips < 3){
            var shipPlacements = prompt(this.name + " please type in your ship placements: ");
            var shipArray = [];
            var regEx = /[\s();:-]*/g;
            shipArray = shipPlacements.split(regEx);
            // Case where there are 10s included in ship string
            var tempString = shipArray.join('');
            var shipString = tempString.replace(/10/g,"0");
            var firstShip = shipString.charAt(0);
            var secondShip = shipString.charAt(5);
            var thirdShip = shipString.charAt(10);

            if(firstShip == 'A'){
                this.aircraft = shipString.substring(1,5);   
            }
            else if(firstShip == 'B'){
                this.battleship = shipString.substring(1,5);
            }
            else if(firstShip == 'S'){
                this.submarine = shipString.substring(1,5);
            }
            if(secondShip == 'A'){
                this.aircraft = shipString.substring(6,10);
            }
            else if(secondShip == 'B'){
                this.battleship = shipString.substring(6,10);
            }
            else if(secondShip == 'S'){
                this.submarine = shipString.substring(6,10);
            }
            if(thirdShip == 'A'){
                this.aircraft = shipString.substring(11,15);
            }
            else if(thirdShip == 'B'){
                this.battleship = shipString.substring(11,15);
            }
            else if(thirdShip == 'S'){
                this.submarine = shipString.substring(11,15);
            }
            this.checkShipStrings();
            if(this.validShips < 3){
                this.validShips = 0;
                shipPlacements = "";
                alert("You did not enter the correct amount of spaces for each ship placement, please try again.");
                continue;
            }
        }
    },
    checkShipStrings(){
        if(this.aircraft && this.battleship && this.submarine != ""){
            this.checkAircraftString();
            this.checkBattleshipString();
            this.checkSubmarineString();
        }
    },
    checkAircraftString(){
        if(this.aircraft.charAt(0) === this.aircraft.charAt(2)){
            var startRow = parseInt(this.aircraft.charAt(1), 10);
            var endRow = parseInt(this.aircraft.charAt(3), 10);
            if(endRow == 0){
                endRow = 10;
            }
            if(endRow - startRow == 4){
                this.validShips++;
            }
        }
        else{
            var startColumn = parseInt(this.aircraft.charAt(0), 36) - 9;
            var endColumn = parseInt(this.aircraft.charAt(2), 36) - 9;
            if(endColumn - startColumn == 4){
                this.validShips++;
            }

        }

    },
    checkBattleshipString(){
        if(this.battleship.charAt(0) === this.battleship.charAt(2)){
            var startRow = parseInt(this.battleship.charAt(1), 10);
            var endRow = parseInt(this.battleship.charAt(3), 10);
            if(endRow == 0){
                endRow = 10;
            }
            if(endRow - startRow == 3){
                this.validShips++;

            }
        }
        else{
            var startColumn = parseInt(this.battleship.charAt(0), 36) - 9;
            var endColumn = parseInt(this.battleship.charAt(2), 36) - 9;
            if(endColumn - startColumn == 3){
                this.validShips++;
            }

        }

    },
    checkSubmarineString(){
        if(this.submarine.charAt(0) === this.submarine.charAt(2)){
            var startRow = parseInt(this.submarine.charAt(1), 10);
            var endRow = parseInt(this.submarine.charAt(3), 10);
            if(endRow == 0){
                endRow = 10;
            }
            if(endRow - startRow == 2){
                this.validShips++;
            }
        }
        else{
            var startColumn = parseInt(this.submarine.charAt(0), 36) - 9;
            var endColumn = parseInt(this.submarine.charAt(2), 36) - 9;
            if(endColumn - startColumn == 2){
                this.validShips++;
            }
        }
    },
    setAircraftCoordinates(){

        if(this.aircraft.charAt(0) === this.aircraft.charAt(2)){
            var startRow = parseInt(this.aircraft.charAt(1), 10);
            var endRow = parseInt(this.aircraft.charAt(3), 10);
            if(endRow == 0){
                endRow = 10;
            }
            var terminateLoop = false;
            var aircraftPlacement = "";
            for(startRow; startRow <= endRow; startRow++){ 
                if(endRow === 10 && endRow === startRow){
                    startRow = 0;
                    terminateLoop = true;
                }
                aircraftPlacement += this.aircraft.charAt(0) + startRow.toString();
                this.aircraft = aircraftPlacement;
                var shipSize = 5;
                var id = this.aircraft.charAt(0) + startRow.toString();
                //this.determineTurn();
                this.placeVerticalShip(shipSize, id);
                if(terminateLoop === true){
                    break;
                }
            }
        }
        else{
            var startColumn = parseInt(this.aircraft.charAt(0), 36) - 9;
            var endColumn = parseInt(this.aircraft.charAt(2), 36) - 9;
            var aircraftPlacement = "";
            for(startColumn; startColumn <= endColumn; startColumn++){

                var charFromInt = String.fromCharCode(64 + startColumn);
                aircraftPlacement += charFromInt + this.aircraft.charAt(1);
                this.aircraft = aircraftPlacement;
                var shipSize = 5;
                this.placeHorizontalShip(charFromInt, shipSize);
            }
        }
    },
    setBattleshipCoordinates(){
        if(this.battleship.charAt(0) === this.battleship.charAt(2)){
            var startRow = parseInt(this.battleship.charAt(1), 10);
            var endRow = parseInt(this.battleship.charAt(3), 10);
            if(endRow == 0){
                endRow = 10;
            }
            var terminateLoop = false;
            var battleshipPlacement = ""; 
            for(startRow; startRow <= endRow; startRow++){ 
                if(endRow === 10 && endRow === startRow){
                    startRow = 0;
                    terminateLoop = true;
                }
                battleshipPlacement += this.battleship.charAt(0) + startRow.toString();
                this.battleship = battleshipPlacement;
                var shipSize = 4;
                var id = this.battleship.charAt(0) + startRow.toString();
                this.placeVerticalShip(shipSize, id);
                if(terminateLoop === true)
                {
                    break;
                }
            }
        }
        else{
            var startColumn = parseInt(this.battleship.charAt(0), 36) - 9;
            var endColumn = parseInt(this.battleship.charAt(2), 36) - 9;
            var battleshipPlacement = "";
            for(startColumn; startColumn <= endColumn; startColumn++){

                var charFromInt = String.fromCharCode(64 + startColumn);
                battleshipPlacement += charFromInt + this.battleship.charAt(1);
                this.battleship = battleshipPlacement;
                var shipSize = 4;
                this.placeHorizontalShip(charFromInt, shipSize);
            }
        }
    },
    setSubmarineCoordinates(){
        if(this.submarine.charAt(0) === this.submarine.charAt(2)){
            var startRow = parseInt(this.submarine.charAt(1), 10);
            var endRow = parseInt(this.submarine.charAt(3), 10);
            if(endRow == 0){
                endRow = 10;
            }
            var terminateLoop = false;
            var submarinePlacement = ""; 
            for(startRow; startRow <= endRow; startRow++){ 
                if(endRow === 10 && endRow === startRow){
                    startRow = 0;
                    terminateLoop = true;
                }
                submarinePlacement += this.submarine.charAt(0) + startRow.toString();
                this.submarine = submarinePlacement;
                var shipSize = 3;
                var id = this.submarine.charAt(0) + startRow.toString();
                this.placeVerticalShip(shipSize, id);
                if(terminateLoop === true){
                    break;
                }
            }
        }
        else{
            var startColumn = parseInt(this.submarine.charAt(0), 36) - 9;
            var endColumn = parseInt(this.submarine.charAt(2), 36) - 9;
            var submarinePlacement = "";
            for(startColumn; startColumn <= endColumn; startColumn++){
                var charFromInt = String.fromCharCode(64 + startColumn);
                submarinePlacement += charFromInt + this.submarine.charAt(1);
                this.submarine = submarinePlacement;
                var shipSize = 3;
                this.placeHorizontalShip(charFromInt, shipSize);
            }
        }
    },
    placeHorizontalShip(charFromInt, shipSize){
        var id;
        //aircraft
        if(shipSize === 5){
            var shipText = document.createTextNode("A");
            id = charFromInt + this.aircraft.charAt(1);
        } 
        // battleship
        else if(shipSize === 4){
            var shipText = document.createTextNode("B");
            id = charFromInt + this.battleship.charAt(1);
        }
        //submarine
        else if (shipSize === 3){
            var shipText = document.createTextNode("S");
            id = charFromInt + this.submarine.charAt(1);
        }
        var gridElement;
        
        if(this.id === 1){
            gridElement = document.getElementById(id);
        }
        else{
            gridElement = document.getElementById(id.toLowerCase());
        }
        
        gridElement.appendChild(shipText);
    },
    placeVerticalShip(shipSize, id){
        //aircraft
        if(shipSize === 5){
            var shipText = document.createTextNode("A");
        }
        // battleship
        else if(shipSize === 4){
            var shipText = document.createTextNode("B");
        }
        //submarine
        else{
            var shipText = document.createTextNode("S");
        }

        var gridElement;
        if(this.id === 1){
            gridElement = document.getElementById(id);
        }
        else{
            gridElement = document.getElementById(id.toLowerCase());
        }
        gridElement.appendChild(shipText);
    },
    setUpGameboard(){
        this.setAircraftCoordinates();
        this.setBattleshipCoordinates();
        this.setSubmarineCoordinates();
    }
};
//***************************************************************** */
// End of player object

var gameAreaOne = document.getElementById("gameAreaOne");
var gameAreaTwo = document.getElementById("gameAreaTwo");
var gameboardTopOne = document.getElementById('gridTopOne');
var gameboardTopTwo = document.getElementById('gridTopTwo');
var gameboardBottomOne = document.getElementById('gridBottomOne');
var gameboardBottomTwo = document.getElementById('gridBottomTwo');
var verify = "";
var checkGridId = "";
var shotOne;
var shotTwo;
var endGame = false;
var playerOne = Object.create(player);
var playerTwo = Object.create(player);
var firstTurn = true;
playerOne.id = 1;
playerTwo.id = 2;
playerOne.getName();
playerTwo.getName();
playerOne.setUpGameboard();
playerTwo.setUpGameboard();
if(window.localStorage.length === 0)
{
    initializeLocalStorage();
}
fillScoreboard();
var startGame = window.confirm("Click OK to begin " + playerOne.name + "'s turn");
if(startGame === true){
    playerOneTurn();
}
   
function playerOneTurn(){
    if(firstTurn === false){
        document.getElementById("invisible").id = "gameAreaOne";
    }
    firstTurn = false;
    gameAreaTwo.id = "invisible";
    var gridId;
    var playerId = 1;
    gameboardTopOne.querySelectorAll('td').forEach(item => {
        item.addEventListener('click', event => {
            gridId = item.id.substr(1,2);
            if(gridId === checkGridId){
                shotOne = "none";
                flag = "no";
            }
            else{
                shotOne = hitOrMiss(gridId, 1);
                flag = 'addScore';
            }
            checkGridId = gridId;
            // player hit
            if(shotOne === true){
                alert("HIT!");
                item.style.background = "red";
                playerTwoBottomGridHit(gridId);
                var shipIdentifier = checkIfSunk(1);
                if(shipIdentifier === 'aircraft carrier' || shipIdentifier === 'battleship' || shipIdentifier === 'submarine'){
                    alert(playerOne.name + " , you have sank " + playerTwo.name + "'s " + shipIdentifier);
                }
                document.body.style.visibility = "hidden";
                checkForWinner(playerId, flag);
                item.removeEventListener('click', event);
                var startTurn;
                setTimeout(function(){
                    if(endGame === false){
                        startTurn = window.confirm("Click OK to begin " + playerTwo.name + "'s turn");
                    }
                    else{
                        startTurn = true;
                    }
                    if(startTurn === true){
                        document.body.style.visibility = "visible";
                        playerTwoTurn();
                    }
                }, 5);
            }
            //player miss
            else if(shotOne === false){
                alert("MISS!");
                item.style.background = "white";
                document.body.style.visibility = "hidden";
                playerTwoBottomGridMiss(gridId);
                item.removeEventListener('click', event);
                var startTurn;
                setTimeout(function(){
                    if(endGame === false){
                        startTurn = window.confirm("Click OK to begin " + playerTwo.name + "'s turn");
                    }
                    else{
                        startTurn = true;
                    }
                    if(startTurn === true){
                        document.body.style.visibility = "visible";
                        playerTwoTurn();
                    }
                }, 5);
            }
            else{
                checkForWinner(playerId, flag);
                item.removeEventListener('click', event);
            }
        })
    })   
}

function playerTwoTurn(){
    var gridId;
    var playerId = 2;
    document.getElementById("invisible").id = "gameAreaTwo";
    gameAreaOne.id = "invisible";
    gameboardTopTwo.querySelectorAll('td').forEach(item => {
        item.addEventListener('click', event => {
            gridId = item.id.substr(1,2);
            if(gridId === verify){
                shotTwo = "none";
                flag = 'no';
            }
            else{
                shotTwo = hitOrMiss(gridId, 2);
                flag = "addScore";
            }
            verify = gridId;

            // player hit
            if(shotTwo === true){
                alert("HIT!");
                item.style.background = "red";
                playerOneBottomGridHit(gridId);
                var shipIdentifier = checkIfSunk(2);
                if(shipIdentifier === 'aircraft carrier' || shipIdentifier === 'battleship' || shipIdentifier === 'submarine'){
                    alert(playerTwo.name + " , you have sank " + playerOne.name + "'s " + shipIdentifier);
                }
                checkForWinner(playerId, flag);
                item.removeEventListener('click', event);
                document.body.style.visibility = "hidden";
                var startTurn;
                setTimeout(function(){
                    if(endGame === false){
                        startTurn = window.confirm("Click OK to begin " + playerOne.name + "'s turn");
                    }
                    else{
                        startTurn = true;
                    }
                    if(startTurn === true){
                        document.body.style.visibility = "visible";
                        playerOneTurn();
                    }
                }, 5);
            }
            //player miss
            else if(shotTwo === false){
                alert("MISS!");
                item.style.background = "white";
                playerOneBottomGridMiss(gridId);
                item.removeEventListener('click', event);
                document.body.style.visibility = "hidden";
                var startTurn;
                setTimeout(function(){
                    if(endGame === false){
                        startTurn = window.confirm("Click OK to begin " + playerOne.name + "'s turn");
                    }
                    else{
                        startTurn = true;
                    }
                    if(startTurn === true){
                        document.body.style.visibility = "visible";
                        playerOneTurn();
                    }
                }, 5);
            }
            else{
                checkForWinner(playerId, flag);
                item.removeEventListener('click', event);
            }
        })
    })
}

function playerOneBottomGridHit(gridId){
        
    var hit = document.getElementById(gridId);
    hit.style.background = "red";
    
}
function playerOneBottomGridMiss(gridId){
        
    var miss = document.getElementById(gridId);
    miss.style.background = "white";

}

function playerTwoBottomGridHit(gridId){

    gridId = gridId.toLowerCase();
    var hit = document.getElementById(gridId);
    hit.style.background = "red";

}
function playerTwoBottomGridMiss(gridId){
    
    gridId = gridId.toLowerCase();
    var miss = document.getElementById(gridId);
    miss.style.background = "white";

}

function checkIfSunk(playerId){
    var sunkShip = "";
    if(playerId === 1){

        if(playerTwo.aircraft.length === playerOne.aircraftHits.length && playerOne.aircraftSunk === false){
            playerOne.aircraftSunk = true;
            return sunkShip = "aircraft carrier";

        }
        else if(playerTwo.battleship.length === playerOne.battleshipHits.length && playerOne.battleshipSunk === false){
            playerOne.battleshipSunk = true;
            return sunkShip = "battleship";
        }
        else if(playerTwo.submarine.length === playerOne.submarineHits.length && playerOne.submarineSunk === false){
            playerOne.submarineSunk = true;
            return sunkShip = "submarine";
        }
    }
    else{
        if(playerOne.aircraft.length === playerTwo.aircraftHits.length && playerTwo.aircraftSunk === false){
            playerTwo.aircraftSunk = true;
            return sunkShip = "aircraft carrier";
        }
        else if(playerOne.battleship.length === playerTwo.battleshipHits.length && playerTwo.battleshipSunk === false){
            playerTwo.battleshipSunk = true;
            return sunkShip = "battleship";
        }
        else if(playerOne.submarine.length === playerTwo.submarineHits.length && playerTwo.submarineSunk === false){
            playerTwo.submarineSunk = true;
            return sunkShip = "submarine";
        }
    }
}

function hitOrMiss(gridId, playerId){
    var hit = false;
    if(playerId === 1){
        if(playerTwo.aircraft.includes(gridId)){
            playerOne.aircraftHits += gridId;
            playerOne.totalHits++;
            return hit = true;
        }
        else if(playerTwo.battleship.includes(gridId)){
            playerOne.battleshipHits += gridId;
            playerOne.totalHits++;
            return hit = true;
        }
        else if(playerTwo.submarine.includes(gridId)){
            playerOne.submarineHits += gridId;
            playerOne.totalHits++;
            return hit = true;
        }
        else{
            playerOne.misses += gridId;
        }
    }
    else{
        if(playerOne.aircraft.includes(gridId)){
            playerTwo.aircraftHits += gridId;
            playerTwo.totalHits++;
            return hit = true;
        }
        else if(playerOne.battleship.includes(gridId)){
            playerTwo.battleshipHits += gridId;
            playerTwo.totalHits ++;
            return hit = true;
        }
        else if(playerOne.submarine.includes(gridId)){
            playerTwo.submarineHits += gridId;
            playerTwo.totalHits++;
            return hit = true;
        }
        else{
            playerTwo.misses += gridId;
        }

    }
    return hit;

}
function checkForWinner(playerId, flag){
    var winnerScore = 0;
    if(playerId == 1){
        if(playerOne.aircraftSunk === true && playerOne.battleshipSunk === true && playerOne.submarineSunk === true){
            winnerScore = 24 - (2 * playerTwo.totalHits);
            playerOne.totalPoints = winnerScore;
            if(window.localStorage.length === 0)
            {
                initializeLocalStorage();
            }
            if(flag === 'addScore'){
                alert(playerOne.name + ", you have won. Your final score is: " + playerOne.totalPoints);
                storeHighscore(winnerScore, playerOne.name);
                endGame = true;
            }
        }
    }
    else{
        if(playerTwo.aircraftSunk === true && playerTwo.battleshipSunk === true && playerTwo.submarineSunk === true){
            winnerScore = 24 - (2 * playerOne.totalHits);
            playerTwo.totalPoints = winnerScore;
            if(window.localStorage.length === 0)
            {
                initializeLocalStorage();
            }
            if(flag === 'addScore'){
                alert(playerTwo.name + ", you have won. Your final score is: " + playerTwo.totalPoints);
                storeHighscore(winnerScore, playerTwo.name);
                endGame = true;
            }
        }
    }
}
function initializeLocalStorage(){
    for(i = 0; i < 10; i++){
        window.localStorage.setItem(i, '0');
    }
}

function clearLocalStorage(){
    window.localStorage.clear();
}
function storeHighscore(winnerScore, playerName){
    for(i = 0; i < 10; i++){
        var value = window.localStorage.getItem(i);
        var scoreString = parseInt(value, 10);
        if(winnerScore <= scoreString)
        {
            continue;
        }
        else if(winnerScore > scoreString)
        {
            window.localStorage.setItem(i, winnerScore + "," + playerName);
            var tempArray = value.split(',');
            var oldPlayerName = tempArray[1];
            storeHighscore(scoreString, oldPlayerName);
            break;
        }

    }

}

function fillScoreboard(){
    var scoreboardCounter = 0;
    for(i = 0; i < 10; i++){
        var scoreAndName = window.localStorage.getItem(i);
        var tempArray = scoreAndName.split(',');
        var score = tempArray[0];
        if(score === '0')
            score = "";
        var name = tempArray[1];
        if(typeof name == 'undefined'){
            name = "";
        }
        var scoreboard = document.getElementsByClassName('scoreboardData');
        var scoreNode = document.createTextNode(score);
        var nameNode = document.createTextNode(name);
        scoreboard[scoreboardCounter].appendChild(scoreNode);
        scoreboard[scoreboardCounter + 1].appendChild(nameNode);
        scoreboardCounter += 2;
    }
}