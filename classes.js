class Person {
    constructor(name, hp, resistance, moveList) {
        this._name = name;
        this._health = hp;
        this._maxHealth = hp;
        this._resistance = resistance;
        this._alive = true;
        // {move:[elementaryType, damage]} 0 = fighting, 1= water 2 = fire.0 beats 1 beats 2 beats 0.
        this._moves = moveList;
    }
    get resistance() {
        return this._resistance;
    }
    get name() {
        return this._name;
    }
    get health() {
        return this._health;
    }
    get alive() {
        return this._alive;
    }
    get moves() {
        return this._moves;
    }
    get maxHealth() {
        return this._maxHealth;
    }
    setHealth(newHealth) {
        this._health = newHealth;
    }
    setAlive(aliveness) {
        this._alive = aliveness;
    }

    takeHit(damage) {
        this._health -= damage;
        if (this._health <= 0) {
            this._health = 0;
            this._alive = false;
            inBattle = false;
        }
    }
}

//global flag for turns
let playerTurn = true;
//global flag for battle state
let inBattle = true;
//global player image
let playerImg = document.getElementById('playerimg');
//global computer image
let computerImg = document.getElementById('computerimg');

// global enemy images
let enemy1Img = document.getElementById('enemyOne');
let enemy2Img = document.getElementById('enemyTwo');
let enemy3Img = document.getElementById('enemyThree');

//global move types
const moves = {
    "hit": [0, 10],
    "kick": [0, 15],
    "strike": [0, 25],
    "ink": [1, 8],
    "watergun": [1, 11],
    "waterbomb": [1, 15],
    "fireball": [2, 11],
    "firearrow": [2, 17],
    "bullet": [2, 30]
};
// counts level
let level = 0;

//image dictionary
images = {"mario":"img/mario2.png", "yoshi": "img/yoshi.png", "luigi": "img/luigi.png",
    "mario2D": "img/mario.png", "yoshi2D": "yoshipaper.png", "luigi2D": "img/luigipaper.png",
    "dead":"img/death1.png", "goomba": "img/goomba.png", "squid": "img/squid.png", "bowser": "img/bowser.png", 
    "deadgoomba":"img/deadGoomba.png", "deadsquid": "img/deadSquid.png", "deadbowser": "img/deadBowser.png"
};

//playable characters
let playMario = new Person("Mario", 150, [2, 2, 1], ["hit", "ink", "firearrow"]);
let playYoshi = new Person("Yoshi", 100, [0.5, 0.5, 1.5], ["strike", "waterbomb", "fireball"]);
let playLuigi = new Person("Luigi", 200, [3, 3, 2], ["kick", "watergun", "bullet"]);

//computer players
const goomba = new Person("goomba", 75, [1, 1, 1], ["hit", "kick", "watergun"]);
const squid = new Person("squid", 100, [1, 0.2, 0.1], ["strike", "ink", "waterbomb"]);
const bowser = new Person("bowser", 300, [2, 7, 0.7], ["strike", "ink", "bullet"]);

let computerPlayers = [goomba, squid, bowser];

//creates player and computer characters
let player = playMario;
let computer = computerPlayers[0];

// helper function sets html text by id
function setText(id, message) {
    elementText = document.getElementById(id);
    elementText.innerHTML = message;
}

// helper function sets move option text
function setMoveText() {
    playerMoves = player.moves;
    setText("boxoption1", playerMoves[0]);
    setText("boxoption2", playerMoves[1]);
    setText("boxoption3", playerMoves[2]);
    computerMoves = computer.moves;
    setText("box2option1", computerMoves[0]);
    setText("box2option2", computerMoves[1]);
    setText("box2option3", computerMoves[2]);
}

function characterSelect(character) {
    playerImg.src = images[character];
    playerImg.style.display = 'block'
    document.getElementById('selectBox').style.display = 'none';
    if (character == "mario") {
        player = playMario;
    }
    if (character == "yoshi") {
        player = playYoshi;
    }
    if (character == "luigi") {
        player = playLuigi;
    }
    printHealth(player, "healthBar1");
    printHealth(computer, "healthBar2");
    setMoveText();
}

//helper function health bar 
function healthBarDraw(id, person) {
    const bar = document.getElementById(id);
    const relativeSize = 50 * person.health / person.maxHealth;
    bar.style.width = relativeSize.toString() + "vw";
}
//helper function for printing health text
function printHealth(person, textId) {
    playerHealth = document.getElementById(textId);
    if (person.health>3){
        playerHealth.innerHTML = (person.health);
    }else{
        playerHealth.innerHTML = ("");
    }
}
//helper function displaying death image
function die(character) {
    return character == player ? playerImg.src = images["dead"] : computerImg.src = images["dead"], killPlayer(character);
}

function killPlayer(character) {
    if(level === 0 && !playerTurn) {
        enemy1Img.src = images["dead"+character._name];
    } else if (level === 1 && !playerTurn) {
        enemy2Img.src= images["dead"+character._name];
    } else if (level === 2 && !playerTurn) {
        enemy3Img.src= images["dead"+character._name];
    }
}
// helper function reduces defenders health by value corresponding to attackers attackType
function dealDamage(attacker, defender, attackType) {
    //base damage
    const attack = moves[attackType];
    //with resistances
    const netDamage = Math.ceil(attack[1] * defender.resistance[attack[0]] * (1 + Math.random() / 2));
    defender.takeHit(netDamage);
}

// draws health bars for computer and player
function drawEverything(){
    printHealth(computer, "healthBar2");
    healthBarDraw("healthBar2", computer);
    printHealth(player, "healthBar1");
    healthBarDraw("healthBar1", player);
}

//called on button click to make player's turn
function fight(attackNum) {
    if (playerTurn && inBattle) {
        //players turn
        attackType = player.moves[attackNum];
        dealDamage(player, computer, attackType);
        playerTurn = false;
        if (!computer.alive) {
            inBattle = false;
            die(computer);
        }
        printHealth(computer, "healthBar2");
        healthBarDraw("healthBar2", computer);
        setTimeout(function () {
            comTurn();
        }, 700);
    }
}

function comTurn() {
    if (!playerTurn && inBattle) {
        //computers turn
        computerMove = computer.moves[Math.floor(Math.random() * 3)];
        dealDamage(computer, player, computerMove);
        playerTurn = true;
        if (!player.alive) {
            inBattle = false;
            die(player);
        }
        printHealth(player, "healthBar1");
        healthBarDraw("healthBar1", player);

    }
}

// resets characters back to choose character screen and level back to 0
function resetGame(){
    level = 0;
    player.setHealth(player.maxHealth);
    player.setAlive(true);
    for (ind = 0; ind<computerPlayers.length; ind++){
        character = computerPlayers[ind];
        character.setHealth(character.maxHealth);
        character.setAlive(true);
    startGame();
    }

    computer = computerPlayers[0];
    document.getElementById('selectBox').style.display = 'flex';
    player = playMario;
    inBattle = true;
    playerTurn = true;
    drawEverything();
}
//progesses onto the next character
function continueGame(){
    level += 1;
    if (level >= computerPlayers.length){
        console.log("you win");
        resetGame()
    }else{
        computer = computerPlayers[level];
        player.setHealth(player.maxHealth);
        computerImg.src = images[computer.name];
        inBattle = true;
        playerTurn = true;
    }
}
//button handler for modal when enemy or character has died
function resetOrContinue(){
    console.log(level);
    if (player.alive && computer.alive == false){
        continueGame();
        drawEverything();
    }
    else {
        resetGame();
    }
}
//sets images at the start of the game
function startGame(){
    playerImg.src = images["mario"];
    computerImg.src = images["goomba"];
    enemy1Img.src = images["goomba"];
    enemy2Img.src =  images["squid"];
    enemy3Img.src = images["bowser"];
}

startGame();