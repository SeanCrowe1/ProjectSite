// Player name
let player1 = "Player 1";
let player2 = "Player 2";
let active = false;
let timerID = null;

// Function to change the player name
function editNames() {
    player1 = prompt("Change Player1 name");
    player2 = prompt("Change player2 name");

    document.getElementById("Player1").innerHTML = player1;
    document.getElementById("Player2").innerHTML = player2;
}

// Function to roll the dice
function rollDice() {
    if (active) {
        document.getElementById("diceButton").textContent = "Start Rolling";
        active = false;
    } else {
        document.getElementById("diceButton").textContent = "Stop Rolling";
        active = true;
    }
    let randomNumber1 = 1;
    let randomNumber2 = 1;

    for (let i = 0; i < 50000; i++) {
        setTimeout(function () {
            randomNumber1 = Math.floor(Math.random() * 6) + 1;
            randomNumber2 = Math.floor(Math.random() * 6) + 1;

            document.getElementById("img1").setAttribute("src",
                "./images/dice" + randomNumber1 + ".png");

            document.getElementById("img2").setAttribute("src",
                "./images/dice" + randomNumber2 + ".png");

        }, 10);
    }
}

function Start() {

}

function Stop() {

}

setTimeout(function () {
    if (randomNumber1 === randosmNumber2) {
        document.getElementById("titleCard").innerHTML = "Draw!";
    }

        else if (randomNumber1 < randomNumber2) {
        document.getElementById("titleCard").innerHTML = (player2 + " WINS!");
    }

    else {
        document.getElementById("titleCard").innerHTML = (player1 + " WINS!");
    }
}, 1000);
