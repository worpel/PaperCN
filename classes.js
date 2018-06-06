class Person{
    constructor(name, hp, resistance, moveList){
    this._name = name;
    this._health = hp;
    this._maxHealth = hp;
    this._resistance = resistance;
    this._alive = true;
    // {move:[elementaryType, damage]} 0 = fighting, 1= water 2 = fire.0 beats 1 beats 2 beats 0.
    this._moves = moveList;
    }
    get resistance(){
        return this._resistance;
    }
    get name(){
        return this._name;
    }
    get health(){
        return this._health;
    }
    get alive(){
        return this._alive;
    }
    get moves(){
        return this._moves;
    }
    get maxHealth(){
        return this._maxHealth;
    }
    set health(newHealth){
        this._health = newHealth;
    }
    set alive(aliveness){
        this._alive = aliveness;
    }

    takeHit(damage){
        this._health -= damage;
        if (this._health <= 0){
            this._health = 0;
            this._alive = false;
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
//global death image 
const deathImg = src = "./img/death.png";
//global move types
const moves = {"hit":[0,10], "kick":[0,15],"strike":[0,25], "ink":[1,8], "watergun":[1,11], "waterbomb":[1,15], "fireball":[2, 11], "firearrow": [2, 17], "bullet": [2, 30]};
// counts level
let level = 0;

//playable characters
const playMario = new Person("Mario", 150, [2, 2, 1], ["hit","ink", "firearrow"]);
const playYoshi = new Person("Yoshi", 100, [0.5, 0.5, 1.5], ["strike","waterbomb", "fireball"]);
const playLuigi = new Person("Luigi", 200, [3, 3, 2], ["kick","watergun", "bullet"]);

//computer players
const goomba = new Person("Goomba", 75*(1+(level/20)), [1, 1, 1], ["hit","kick", "watergun"]);
const squid = new Person("Squid", 100*(1+(level/20)), [1, 0.2, 0.1], ["strike","ink", "waterbomb"]);
const bowser = new Person("Browser", 300*(1+(level/20)), [2, 7, 0.7], ["strike","ink", "bullet"]);

const computerPlayers = [bowser, goomba, bowser];
//creates player and computer characters
let player = new Person("Harry", 1, [0.5, 1, 2], ["hit","ink", "bullet"]);
const computer = new Person("DrEvil", 150, [1, 2, 1], ["strike","ink", "bullet"]);

// helper function sets html text by id

function setText(id, message){
    elementText = document.getElementById(id);
    elementText.innerHTML = message;
}

// helper function sets move option text
function setMoveText(){
    playerMoves = player.moves;
    setText("boxoption1",playerMoves[0]);
    setText("boxoption2",playerMoves[1]);
    setText("boxoption3",playerMoves[2]);
    computerMoves = computer.moves;
    setText("box2option1",computerMoves[0]);
    setText("box2option2",computerMoves[1]);
    setText("box2option3",computerMoves[2]);
}

function characterSelect(character) {
    document.getElementById('playerimg').src = "img/" + character + ".png";
    playerImg.style.display = 'block'
    document.getElementById('selectBox').style.display = 'none';
    if (character == "mario"){
        player = playMario;
    }
    if (character == "yoshi"){
        player = playYoshi;
    }
    if (character == "luigi"){
        player = playLuigi;
    }
    printHealth(player, "healthBar1");
    printHealth(computer, "healthBar2");
    setMoveText();
}

//helper function health bar 
function healthBarDraw(id, person){
    const bar = document.getElementById(id);
    const relativeSize = 50*person.health/person.maxHealth;
    bar.style.width = relativeSize.toString() +"vw";
}
//helper function for printing health text
function printHealth(person, textId){
    playerHealth = document.getElementById(textId);
    playerHealth.innerHTML = (person.health);
}
//helper function displaying death image
function die(character){
    return character == player ? playerImg.src = deathImg : computerImg.src = deathImg;
}

// helper function reduces defenders health by value corresponding to attackers attackType
function dealDamage (attacker,defender, attackType){
    //base damage
    const attack = moves[attackType];
    //with resistances
    const netDamage = Math.ceil(attack[1]*defender.resistance[attack[0]]*(1+Math.random()/2));
    defender.takeHit(netDamage);
}

//called on button click to make player's turn
function fight(attackNum){
    if (playerTurn && inBattle){
        //players turn
        attackType = player.moves[attackNum];
        dealDamage(player, computer, attackType);
        playerTurn = false;
        if (!computer.alive){
            inBattle = false;
            die(computer);
        }
        printHealth(computer, "healthBar2");
        healthBarDraw("healthBar2", computer);
        setTimeout(function(){comTurn(); }, 700);
    }
}
function comTurn(){
    if (!playerTurn && inBattle){
        //computers turn
        computerMove = computer.moves[Math.floor(Math.random()*3)];
        console.log(computerMove);
        dealDamage(computer, player, computerMove);
        playerTurn = true;
        if (!player.alive){
            inBattle = false;
            die(player);
        }
        printHealth(player, "healthBar1");
        healthBarDraw("healthBar1", player);
        
    }
}